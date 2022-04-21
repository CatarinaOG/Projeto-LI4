import React from 'react';
import { useHistory } from "react-router-dom";
import {useState, useEffect} from 'react';


function Restaurante(){

    const history = useHistory();

    const[avaliacoes,setAvaliacoes] = useState([]);
    const[restaurante,setRestaurante] = useState({
            nome:'',
            rua:'',
            localidade:'',
            num_telefone:'',
            horario:'',
            latitude:'',
            longitude:'',
            estrelas:'',
            codigo_postal:'',
        });
    
    const data1 = {
        nothing : ''
    }

    const getRestaurante = async () => {

        fetch('http://127.0.0.1:8080/api/restaurante/info_restaurante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setRestaurante(data);
        });
    }

    const getAvaliacoes = async () => {

        fetch('http://127.0.0.1:8080/api/cliente/get_avaliacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setAvaliacoes(data);
        });
    }

    useEffect(()=>{
        getRestaurante();
        getAvaliacoes();
    },[]);

    const horarioArr = parseHorario(restaurante.horario);

    function parseHorario(horario){
        return horario.split(';');
    }

    function toMenu(){
        let path = '/MenuRestaurante';
        history.push(path);
    }

    function toRestaurant(){
        window.open(`https://www.google.com/maps?saddr=My+Location&daddr=${restaurante.latitude},${restaurante.longitude}`);
    }

    function toChooseCode(){
        let path = '/ChooseCode';
        history.push(path);
    }

    function toReservas(){
        let path = '/Reservar';
        history.push(path);
    }

    function toAval(){
        let path = '/Avaliar';
        history.push(path); 
    }

    function Back(){

        fetch('http://127.0.0.1:8080/api/cliente/get_mapa_atual', { /////url
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nothing: ''}),
        })
        .then(response => response.json())
        .then(data => {

        let path = '';

            switch(data.mapa){
                case "distancia":
                    path = '/MapDistancia';
                    history.push(path);          
                    break;     

                case "classificacao":
                    path = '/MapClassificacao';
                    history.push(path);          
                    break;     
                    
                case "ambos":
                    path = '/MapAmbos';
                    history.push(path);          
                    break;     
            }

        })
    }

    return(
        <div>
            <div className="float-child1">
                <div className="center">

                    <h1 className='colorWhite'>{restaurante.nome}</h1>
                    <h2 className='colorWhite'>Avaliação  : {restaurante.estrelas}</h2>
                    <button className = "button" onClick={toMenu}>Menu</button>
                    <br/><br/>
                    <button className = "button" onClick={toRestaurant}>Direções</button>
                    <br/>
                    <br/>
                    <button className = "button" onClick={toChooseCode}>Códigos Promocionais</button>
                    <br/>
                    <br/>
                    <button className = "button" onClick={toReservas}>Reservar</button>
                    <br/>
                    <br/>
                    <button className = "button" onClick={toAval}>Avaliar</button>
                    <br/>
                    <br/>
                    <button className = "button" onClick={Back}>Voltar</button>
                </div>
            </div>

            <div className="float-child2">
                <div>
                    <h3>Rua : </h3>
                    <p style = {{color : 'black'}}>{restaurante.rua}</p>

                    <h3>Localidade : </h3>
                    <p style = {{color : 'black'}}>{restaurante.localidade}</p>

                    <h3>Código Postal : </h3>
                    <p style = {{color : 'black'}}>{restaurante.codigo_postal}</p>

                    <h3>Horário : </h3>
                    
                    <h4 style = {{color : 'black'}}>Segunda-feira : {horarioArr[0]} </h4>
                    
                    <h4 style = {{color : 'black'}}>Terca-feira : {horarioArr[1]} </h4>

                    <h4 style = {{color : 'black'}}>Quarta-feira : {horarioArr[2]} </h4>

                    <h4 style = {{color : 'black'}}>Quinta-feira : {horarioArr[3]} </h4>

                    <h4 style = {{color : 'black'}}>Sexta-feira : {horarioArr[4]}</h4>

                    <h4 style = {{color : 'black'}}>Sabado : {horarioArr[5]}</h4>

                    <h4 style = {{color : 'black'}}>Domingo : {horarioArr[6]}</h4>

                    <h3>Telefone : </h3>
                    <p style = {{color : 'black'}}>{restaurante.num_telefone}</p>

                    <h3>Avaliações do estabelecimento: </h3>
                    {
                        avaliacoes.map(
                            (avaliacao) => 
                                <div className="divAvaliacao">
                                    <p>User : {avaliacao.nome}</p>
                                    <p>Comentario : {avaliacao.comentario}</p>
                                    <p>Número de estrelas : {avaliacao.estrelas}</p>
                                </div> 
                        )
                    }
                    
                </div>
            </div>

            
        </div>
    );
}

export default Restaurante;