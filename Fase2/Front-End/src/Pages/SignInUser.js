import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import {useEffect, useRef, useState} from 'react'



function SignInUser(){
    

    const [user, setUser] = useState({nif: '', nome:'', email:'', palavra_passe:'', num_telemovel:'', nome_utilizador:''});
    const [secondPassword, setPassword] = useState('');
    const history = useHistory();



    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]:value});
    }

    function SignInUser(){

        if( secondPassword === user.palavra_passe ){

        fetch('http://127.0.0.1:8080/api/cliente/registar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                })
                .then(response => response.json())
                .then(data => {
                    if(data.registo){
                        let path = '/FrontPageUser';
                        history.push(path);
                    }
                })
                .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    function Back(){

        let path = '/LogInUser';
        history.push(path);

    }



    return(

        <div className="center">
            <img src="logo.png" alt="" id="firstImg"/><br/><br/>

            <form action="">
                <input className = "caixasTextoOrange" type="email"    placeholder="Email"                name='email'          value={user.email}            onChange={handleChange}/><br/>
                
                <input className = "caixasTextoOrange" type="password" placeholder="Password"             name='palavra_passe'  value={user.palavra_passe}    onChange={handleChange}/><br/>
                
                <input className = "caixasTextoOrange" type="password" placeholder="Confirm Password"                           value={secondPassword}        onChange={(e) => setPassword(e.target.value)}/><br/>
                
                <input className = "caixasTextoOrange" type="number"   placeholder="NIF"                  name='nif'            value={user.nif}              onChange={handleChange}/><br/>
                
                <input type="text"  className = "caixasTextoOrange"   placeholder="Nome de utilizador"   name='nome_utilizador'value={user.nome_utilizador}  onChange={handleChange}/><br/>
                
                <input type="text" className = "caixasTextoOrange"    placeholder="Nome"                 name='nome'           value={user.nome}             onChange={handleChange}/><br/>
                
                <input type="number" className = "caixasTextoOrange"   placeholder="Número de telemóvel"  name='num_telemovel'  value={user.num_telemovel}    onChange={handleChange}/><br/>

            </form>

            <button onClick={SignInUser}>Confirmar</button>
            <button onClick={Back}>Back</button>
        </div>

    );

}

export default SignInUser;