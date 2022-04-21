import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import {useEffect, useRef, useState} from 'react'



function Perfil(){

    const [user,setUser] = useState({nif: '', nome:'', email:'', palavra_passe:'', num_telemovel:'', nome_utilizador:''});
    const [userChanged, setUserChanged] = useState({nome:'', palavra_passe:'', num_telemovel:'', nome_utilizador:'', palavra_passe_antiga: ''});
    const [secondPassword, setPassword] = useState('');
    const [kms, setKms] = useState("5");
    const [estrelas, setEstrelas] = useState("5");
    const data1 = {nothing: ""};
    const history = useHistory();


    useEffect( ()=>{
    
        fetch('http://127.0.0.1:8080/api/cliente/dados_cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
        })

        .then(response => response.json())
        .then((data) => {
            setUser(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    },[userChanged]);

    function Back(){
        let path = '/FrontPageUser';
        history.push(path);
    }

    function HandleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setUserChanged({...userChanged, [name]:value});
    }

    function SavePerfil(){

        if( secondPassword == userChanged.palavra_passe ){

            fetch('http://127.0.0.1:8080/api/cliente/alterar_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userChanged),
                })
                .then((data) => {
                    console.log(data);
                });
        }
    }

    function SaveDistancia(){

        const data1 = {
            filtro: kms,
        }

        fetch('http://127.0.0.1:8080/api/cliente/filtro_distancia', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
            })
            .then((data) => {
                console.log(data);
            });

    }

    function SaveEstrelas(){

        const data1 = {
            filtro: estrelas,
        }

        fetch('http://127.0.0.1:8080/api/cliente/filtro_estrelas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
            })
            .then((data) => {
                console.log(data);
            });
    }


    return (
    <div>
        <div className="float-child1">
            <div className="center">



                <h1 className = "colorWhite">Meu perfil</h1><br/>
                <h3 className = "colorWhite">Nome de utilizador: {user.nome_utilizador}</h3>
                <h3 className = "colorWhite">Nome: {user.nome}</h3>
                <h3 className = "colorWhite">Numero de telemóvel: {user.num_telemovel}</h3>
                <h3 className = "colorWhite">Email: {user.email}</h3>
                <button className="goBack" onClick={Back}>Go Back</button>

            </div>
        </div>

        <div className="float-child2">
            <h1>Editar Perfil</h1>
                <div  >
                    <form action="">


                        <input className =  "caixasTextoWhiteLong" type="text"       name="nome_utilizador"           placeholder="novo username"          value={userChanged.nome_utilizador}          onChange={HandleChange}/><br/><br/>

                        <input className =  "caixasTextoWhiteLong" type="text"       name="nome"                      placeholder="novo nome"              value={userChanged.nome}                     onChange={HandleChange}/><br/><br/>

                        <input className =  "caixasTextoWhiteLong" type="number"     name="num_telemovel"             placeholder="número de telemóvel"    value={userChanged.num_telemovel}            onChange={HandleChange}/><br/><br/>

                        <input className =  "caixasTextoWhiteLong" type="password"   name="palavra_passe_antiga"      placeholder="password antiga"        value={userChanged.palavra_passe_antiga}     onChange={HandleChange}/><br/><br/>

                        <input className =  "caixasTextoWhiteLong" type="password"   name="palavra_passe"             placeholder="password nova"          value={userChanged.palavra_passe}            onChange={HandleChange}/><br/><br/>

                        <input className =  "caixasTextoWhiteLong"   type="password"                                   placeholder="password nova"                                                    onChange={(e) => setPassword(e.target.value)}/>
                        <br/>

                        <button onClick={SavePerfil}>Guardar</  button>

                        <h1>Alterar distância no filtro</h1>

                        <p>Procuro locais perto de mim em   <span><input className =  "caixasTextoWhite " type="text"  id="kilometers" value={kms} onChange={   (e) => setKms(e.target.value) }/></span>  km <button onClick={SaveDistancia}     >Guardar</button></p>
                        

                        <p>Procuro estabelecimentos com mais de     <span><input className =    "caixasTextoWhite " type="text" value= {estrelas} onChange={ (e) => setEstrelas (e.target.value) }/></span> estrelas   <button onClick={SaveEstrelas} >Guardar</   button> </p>
                        
                    </form>
                </div>
        </div>
    </div>

    );

}

export default Perfil;
