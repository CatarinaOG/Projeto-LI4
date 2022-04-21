package com.grupo4.li4.services;

import com.google.zxing.WriterException;
import com.grupo4.li4.model.*;
import com.grupo4.li4.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Array;
import java.sql.Date;
import java.sql.Time;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppService {

    @Autowired
    private ClienteRepo clienteRepo;

    @Autowired
    private RestauranteRepo restauranteRepo;

    @Autowired
    private ProprietarioRepo proprietarioRepo;

    @Autowired
    private AvaliacaoRepo avaliacaoRepo;

    @Autowired
    private PratoRepo pratoRepo;

    @Autowired
    private ReservaRepo reservaRepo;

    @Autowired
    private CodigoQRRepo codigoQRRepo;

    private String nome_utilizador;
    private String email_proprietario;
    private String restaurante_atual;
    private double lat_utilizador;
    private double lng_utilizador;
    private double lat_restaurante;
    private double lng_restaurante;
    private String mapaAtual; //distancia, classificação, ambos
    private String codigo_atual;


    public boolean loginCliente(LoginForm lf) {
        if (clienteRepo.encontraPorNomeUtilizador(lf.getNome_utilizador()) == null) return false;
        else {
            this.nome_utilizador = lf.getNome_utilizador();
            return clienteRepo.encontraPorNomeUtilizador(lf.getNome_utilizador()).
                    getPalavra_passe().
                    equals(lf.getPalavra_passe());
        }
    }

    public void logoutCliente() {
        this.nome_utilizador = null;
    }

    public String registar(Cliente cliente) {
        boolean registado = true;
        List<Cliente> c = this.clienteRepo.findAll();
        for(Cliente cli : c){
            if(cli.getEmail().equals(cliente.getEmail())) registado = false;
            if(cli.getNif() == cliente.getNif()) registado = false;
        }
        if(this.clienteRepo.encontraPorNomeUtilizador(cliente.getNome_utilizador()) != null) registado = false;
        else{
            this.nome_utilizador = cliente.getNome_utilizador();
            clienteRepo.save(cliente);
        }
        return "{ \"registo\": " + registado + "}";
    }

    public void atualizarDados(AtualizarDadosForm form) {
        System.out.println("atualizar dados");
        String nome = form.getNome();
        String nome_utilizador = form.getNome_utilizador();
        String palavra_passe = form.getPalavra_passe();
        String num_telemovel = form.getNum_telemovel();
        String palavra_passe_antiga = form.getPalavra_passe_antiga();


        Cliente c = clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        if (palavra_passe_antiga.equals(c.getPalavra_passe())) {
            if (!nome.equals("")) c.setNome(nome);
            if (!nome_utilizador.equals("")) {
                this.nome_utilizador = nome_utilizador;
                c.setNome_utilizador(nome_utilizador);
            }
            if (!palavra_passe.equals("")) c.setPalavra_passe(palavra_passe);
            if (!num_telemovel.equals("")) c.setNum_telemovel(Integer.parseInt(num_telemovel));
            clienteRepo.save(c);
        }
    }

    public void alterarFiltro(Map<String, Object> input) {
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        c.setFiltro_distancia(Integer.parseInt((String) input.get("filtro")));
        System.out.println("Filtro:"+c.getFiltro_distancia());
        System.out.println("Input:"+input.get("filtro"));
        this.clienteRepo.save(c);
    }

    public String registarProprietario(Proprietario proprietario) {
        boolean registado = true;
        List<Proprietario> p = this.proprietarioRepo.findAll();
        for(Proprietario pro : p){
            if(pro.getNif() == proprietario.getNif()) {
                registado = false;
                break;
            }
        }
        if(this.proprietarioRepo.encontraPorEmail(proprietario.getEmail()) != null) registado = false;
        else{
            this.email_proprietario = proprietario.getEmail();
            this.proprietarioRepo.save(proprietario);
        }
        return "{ \"registo\": " + registado + " }";
    }

    public void registarRestaurante(Restaurante restaurante) {
        Proprietario p = proprietarioRepo.encontraPorEmail(this.email_proprietario);
        restaurante.setProprietario(p);
        restauranteRepo.save(restaurante);
    }

    public boolean loginProprietario(Map<String,Object> loginForm) {
        if (proprietarioRepo.encontraPorEmail( (String) loginForm.get("email")) == null) return false;
        else {
            this.email_proprietario = (String) loginForm.get("email");
            return (proprietarioRepo.encontraPorEmail((String) loginForm.get("email"))
                    .getPassword()
                    .equals(loginForm.get("palavra_passe")));
        }
    }

    public Restaurante obtemInfoRestaurante(String nome) {
        Restaurante r = this.restauranteRepo.getById(nome);
        return new Restaurante(r.getNome(), r.getRua(), r.getLocalidade(), r.getNum_telefone(), r.getHorario(), r.getLatitude(), r.getLongitude(), r.getCodigo_postal());
    }

    public Cliente obtemInfoCliente() {
        System.out.println("info:"+this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador));
        return this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
    }

    public Restaurante obtemRestaurante() {
        return this.proprietarioRepo.encontraPorEmail(this.email_proprietario).getRestauranteNome(this.restaurante_atual);
    }

    public void avaliacao(AvaliacaoForm form) {
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        Avaliacao a = new Avaliacao(Integer.parseInt(form.getEstrelas()), form.getComentario(), r, c);
        this.avaliacaoRepo.save(a);
    }

    public List<Restaurante> obterRestaurantesProprietario() {
        Proprietario p = this.proprietarioRepo.encontraPorEmail(this.email_proprietario);
        return p.getRestaurantes();
    }

    public void inserirPrato(String nome, Float preco) {
        Prato p = new Prato(nome, preco);
        this.pratoRepo.save(p);
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        r.addPrato(p);
        this.restauranteRepo.save(r);
    }

    public void teste() {
    }

    public void removerRestaurante(String nome) {
        this.restauranteRepo.deleteById(nome);
    }

    public void criarReserva(Date data, Time time, int num_pessoal, String nome, List<String> pratos) {
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        List<Prato> pratos_reserva = new ArrayList<>();
        List<Prato> aux = r.getPratos();
        for (int i = 0; i < pratos.size(); i++) {
            for (Prato p : aux) {
                if (p.getNome().equals(pratos.get(i))) {
                    pratos_reserva.add(p);
                    break;
                }
            }
        }

        Reserva reserva = new Reserva(data, time, num_pessoal, nome, c, r, pratos_reserva);
        this.reservaRepo.save(reserva);
    }

    public static double distance(double lat1, double lat2, double lon1,
                                  double lon2, double el1, double el2) {

        final int R = 6371; // Radius of the earth

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        double height = el1 - el2;

        distance = Math.pow(distance, 2) + Math.pow(height, 2);

        return Math.sqrt(distance);
    }

    public List<Map<String, Object>> filtra_restaurantes() {
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        List<Restaurante> r = this.restauranteRepo.findAll();
        List<Map<String, Object>> restaurantes = new ArrayList<>();
        for (Restaurante rest : r) {
            double dist = distance(this.lat_utilizador, rest.getLatitude(), this.lng_utilizador, rest.getLongitude(), 0.0, 0.0);
            System.out.println("Distance from " + rest.getNome() + ": " + dist);
            if (dist < c.getFiltro_distancia() * 1000) {
                Map<String, Object> aux = new HashMap<>();
                aux.put("nome", rest.getNome());
                aux.put("lat", rest.getLatitude());
                aux.put("lng", rest.getLongitude());
                restaurantes.add(aux);
            }
        }
        return restaurantes;
    }

    public List<Map<String, Object>> filtra_restaurantes_estrelas() {
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        List<Restaurante> r = this.restauranteRepo.findAll();
        double estrelas = c.getFiltro_estrelas();
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Restaurante res : r) {
            if (res.mediaAvaliacao() >= estrelas) {
                Map<String, Object> aux = new HashMap<>();
                aux.put("nome", res.getNome());
                aux.put("lat", res.getLatitude());
                aux.put("lng", res.getLongitude());
                resultado.add(aux);
            }
        }
        return resultado;
    }

    public List<Map<String, Object>> filtra_restaurantes_ambos() {
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        List<Restaurante> r = this.restauranteRepo.findAll();
        double estrelas = c.getFiltro_estrelas();
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Restaurante res : r) {
            double dist = distance(this.lat_utilizador, res.getLatitude(), this.lng_utilizador, res.getLongitude(), 0.0, 0.0);
            if (dist < c.getFiltro_distancia() * 1000 && res.mediaAvaliacao() >= estrelas) {
                Map<String, Object> aux = new HashMap<>();
                aux.put("nome", res.getNome());
                aux.put("lat", res.getLatitude());
                aux.put("lng", res.getLongitude());
                resultado.add(aux);
            }
        }
        return resultado;
    }


    public void alterar_numero_restaurante(Map<String, Object> input) {
        //num_telefone
        //horario
        String num_telefone = (String) input.get("num_telefone");

        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        r.setNum_telefone(Integer.parseInt(num_telefone));

        this.restauranteRepo.save(r);
    }

    public void alterar_horario_restaurante(Map<String, Object> input) {
        //num_telefone
        //horario
        String horario = (String) input.get("horario");

        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        r.setHorario(horario);

        this.restauranteRepo.save(r);
    }

    public Map<String, Object> infoRestauranteCoordenadas() {
        List<Restaurante> res = this.restauranteRepo.findAll();
        Restaurante r = null;
        for (Restaurante restaurante : res) {
            if (restaurante.getLatitude() == this.lat_restaurante && restaurante.getLongitude() == this.lng_restaurante) {
                r = restaurante;
                break;
            }
        }
        Map<String, Object> map = new HashMap<>();
        map.put("nome", r.getNome());
        map.put("rua", r.getRua());
        map.put("localidade", r.getLocalidade());
        map.put("codigo_postal", r.getCodigo_postal());
        map.put("num_telefone", r.getNum_telefone());
        map.put("horario", r.getHorario());
        map.put("latitude", r.getLatitude());
        map.put("longitude", r.getLongitude());
        map.put("estrelas", r.mediaAvaliacao());
        return map;
    }

    public List<Map<String, Object>> infoPratos() {
        Map<String, Object> res = infoRestauranteCoordenadas();
        Restaurante restaurante = this.restauranteRepo.getById((String) res.get("nome"));
        List<Map<String, Object>> out = new ArrayList<>();
        int i = 0;
        for (Prato p : restaurante.getPratos()) {
            Map<String, Object> pout = new HashMap<>();
            pout.put("value", i);
            pout.put("label", p.getNome());
            out.add(pout);
            i++;
        }
        return out;
    }

    public void logoutProprietario() {
        this.email_proprietario = null;
    }

    public void setRestauranteAtualCoord(double lat, double lng) {

        List<Restaurante> rests = this.restauranteRepo.findAll();
        for (Restaurante r : rests) {
            if (r.getLatitude() == lat && r.getLongitude() == lng) {
                this.restaurante_atual = r.getNome();
                break;
            }

        }

    }

    public void alterarFiltroEstrelas(String filtro) {
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        c.setFiltro_estrelas(Integer.parseInt(filtro));
        this.clienteRepo.save(c);
    }


    public List<Prato> menu() {
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        return r.getPratos();
    }

    public List<Map<String, Object>> getReservas() {
        Cliente c = this.clienteRepo.encontraPorNomeUtilizador(this.nome_utilizador);
        List<Reserva> reservas = c.getReservas();
        List<Map<String, Object>> res = new ArrayList<>();

        for (Reserva r : reservas) {
            Map<String, Object> aux = new HashMap<>();
            aux.put("nome_restaurante", r.getRestaurante().getNome());
            aux.put("data", r.getData());
            aux.put("hora", r.getHora());
            aux.put("num_pessoas", r.getNum_pessoas());
            aux.put("nome", r.getNome());
            List<Prato> pratos = r.getPratos();
            List<String> nomes = new ArrayList<>();
            for (Prato p : pratos) {
                nomes.add(p.getNome());
            }
            aux.put("pratos", nomes);
            res.add(aux);
        }

        return res;
    }

    public void generateQRCode(CodigoQR codigoQR) {
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        CodigoQR res = new CodigoQR(r.getNome()+": "+codigoQR.getDescricao(), r);
        this.codigoQRRepo.save(res);
    }

    public byte[] getQRCode(String descricao) {
        byte[] image = new byte[0];
        try {

            // Generate and Return Qr Code in Byte Array
            image = QRCodeGenerator.getQRCodeImage(descricao, 250, 250);

        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }
        return image;
    }

    public List<Map<String,String>> getDescricoes() {
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        List<CodigoQR> cds = r.getCodigos_promocionais();

        List<Map<String, String>> res = new ArrayList<>();

        for(CodigoQR c : cds){
            Map<String, String> aux = new HashMap<>();
            aux.put("label", c.getDescricao());
            aux.put("value", c.getDescricao());
            res.add(aux);
        }
        return res;
    }


//    public List<Map<String, String>> getAllCodigos(){
//        List<CodigoQR> codigos =  this.codigoQRRepo.findAll();
//
//        List<Map<String, String>> resultado = new ArrayList<>();
//
//        for(CodigoQR c : codigos){
//            Map<String, String> res = new HashMap<>();
//            res.put("nome_restaurante", c.getRestaurante().getNome());
//            res.put("descricao", c.getDescricao());
//            resultado.add(res);
//        }
//
//        return resultado;
//    }

    public List<Map<String, String>> getAllCodigos(){
        List<CodigoQR> codigos =  this.codigoQRRepo.findAll();

        List<Map<String, String>> resultado = new ArrayList<>();

        for(CodigoQR c : codigos){
            Map<String, String> res = new HashMap<>();
            String descricao = c.getDescricao();
            res.put("value", descricao);
            res.put("label", descricao);
            resultado.add(res);
        }
        Map<String, String> res = new HashMap<>();
        res.put("value", "codigo promocional 10%");
        res.put("label", "codigo promocional 10%");
        resultado.add(res);
        return resultado;
    }

    public void removerReserva(int id){
        this.reservaRepo.deleteById(id);
    }

    public List<Map<String, Object>> getAvaliacoes(){
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        List<Map<String, Object>> res = new ArrayList<>();
        Map<String, Object> avaliacao;
        List<Avaliacao> avaliacoes = r.getAvaliacoes();
        for(Avaliacao a : avaliacoes){
            avaliacao = new HashMap<>();
            avaliacao.put("nome", a.getCliente().getNome());
            avaliacao.put("estrelas", a.getEstrelas());
            avaliacao.put("comentario", a.getComentario());
            res.add(avaliacao);
        }
        return res;
    }

    public List<Map<String, Object>> getReservasRestaurante(){
        Restaurante r = this.restauranteRepo.getById(this.restaurante_atual);
        List<Map<String,Object>> res = new ArrayList<>();
        for(Reserva reserva : r.getReservas()){
            Map<String,Object> aux = new HashMap<>();
            aux.put("id", reserva.getId_reserva());
            aux.put("data",reserva.getData());
            aux.put("hora", reserva.getHora());
            aux.put("nome",reserva.getNome());
            aux.put("num_pessoas", reserva.getNum_pessoas());
            List<String> nomes = new ArrayList<>();
            for(Prato p : reserva.getPratos()){
                nomes.add(p.getNome());
            }
            aux.put("pratos", nomes);
            res.add(aux);
        }
        return res;
    }

    public String getCodigo_atual() {
        return codigo_atual;
    }

    public void setCodigo_atual(String codigo_atual) {
        this.codigo_atual = codigo_atual;
    }


    public String getNome_utilizador() {
        return this.nome_utilizador;
    }

    public void setNome_utilizaor(String nome_utilizador) {
        this.nome_utilizador = nome_utilizador;
    }

    public String getEmail_proprietario() {
        return email_proprietario;
    }

    public void setEmail_proprietario(String email_proprietario) {
        this.email_proprietario = email_proprietario;
    }

    public String getRestaurante_atual() {
        return restaurante_atual;
    }

    public void setRestaurante_atual(String restaurante_atual) {
        this.restaurante_atual = restaurante_atual;
    }

    public double getLat_utilizador() {
        return lat_utilizador;
    }

    public void setLat_utilizador(double lat_utilizador) {
        this.lat_utilizador = lat_utilizador;
    }

    public double getLng_utilizador() {
        return lng_utilizador;
    }

    public void setLng_utilizador(double lng_utilizador) {
        this.lng_utilizador = lng_utilizador;
    }

    public double getLat_restaurante() {
        return lat_restaurante;
    }

    public void setLat_restaurante(double lat_restaurante) {
        this.lat_restaurante = lat_restaurante;
    }

    public double getLng_restaurante() {
        return lng_restaurante;
    }

    public void setLng_restaurante(double lng_restaurante) {
        this.lng_restaurante = lng_restaurante;
    }

    public String getMapaAtual() {
        return mapaAtual;
    }

    public void setMapaAtual(String mapaAtual) {
        this.mapaAtual = mapaAtual;
    }
}
