package com.grupo4.li4.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    private int nif;

    @Column(name = "nome")
    private String nome;
    @Column(name = "nome_utilizador")
    private String nome_utilizador;
    @Column(name = "palavra_passe")
    private String palavra_passe;
    @Column(name = "num_telemovel")
    private int num_telemovel;
    @Column(name = "email")
    private String email;
    @JsonIgnore
    @Column(name = "filtro_distancia")
    private int filtro_distancia;
    @JsonIgnore
    @Column(name = "filtro_estrelas")
    private int filtro_estrelas;

    @JsonIgnore
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Avaliacao> avaliacoes;

    @JsonIgnore
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;

    public Cliente() {
    }

    public int getNif() {
        return this.nif;
    }

    public String getNome() {
        return this.nome;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPalavra_passe() {
        return this.palavra_passe;
    }

    public int getNum_telemovel() {
        return this.num_telemovel;
    }

    public String getNome_utilizador() {
        return this.nome_utilizador;
    }

    public int getFiltro_distancia(){
        return this.filtro_distancia;
    }

    public void setFiltro_distancia(int filtro_distancia){
        this.filtro_distancia = filtro_distancia;
    }

    public int getFiltro_estrelas(){
        return this.filtro_estrelas;
    }

    public void setFiltro_estrelas(int filtro_estrelas){
        this.filtro_estrelas = filtro_estrelas;
    }

    public void setNif(int nif) {
        this.nif = nif;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPalavra_passe(String palavra_passe) {
        this.palavra_passe = palavra_passe;
    }

    public void setNum_telemovel(int num_telemovel) {
        this.num_telemovel = num_telemovel;
    }

    public void setNome_utilizador(String nome_utilizador) {
        this.nome_utilizador = nome_utilizador;
    }

    public List<Avaliacao> getAvaliacoes(){
        return this.avaliacoes;
    }

    public List<Reserva> getReservas(){
        return this.reservas;
    }

    public void addReserva(Reserva r ){
        this.reservas.add(r);
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "nif=" + nif +
                ", nome='" + nome + '\'' +
                ", nome_utilizador='" + nome_utilizador + '\'' +
                ", palavra_passe='" + palavra_passe + '\'' +
                ", num_telemovel=" + num_telemovel +
                ", email='" + email + '\'' +
                ", filtro_distancia=" + filtro_distancia +
                ", filtro_estrelas=" + filtro_estrelas +
                '}';
    }
}
