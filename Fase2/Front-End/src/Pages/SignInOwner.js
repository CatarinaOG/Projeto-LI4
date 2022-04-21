import React from "react";
import {useEffect, useRef, useState} from 'react'
import { useHistory } from "react-router-dom";





function SignInOwner() {

    const history = useHistory();

    const [owner,setOwner] = useState({nif:'', nome:'', email:'', password:''});
    const [secondPassword,setPassword] = useState('');

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        setOwner({...owner,[name]: value});
    }

    function SignIn(){

        if( secondPassword === owner.password ){
            fetch('http://127.0.0.1:8080/api/proprietario/registar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(owner),
                })
                .then(response => response.json())
                .then((data) => {
                    if(data.registo){
                        let path = '/FrontPageOwner';
                        history.push(path);
                    }
                })
                .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    function Back(){
        let path = '/LoginOwner';
        history.push(path);
    }

    return(

    <div className="center">
        <img src="logo.png" alt="" id="firstImg"/><br/><br/>

            <form action="">
                <input type="email"  className = "caixasTextoOrange"   placeholder="Email"             name="email"    value={owner.email}     onChange={handleChange}/><br/>
                
                <input type="text"   className = "caixasTextoOrange"   placeholder="Nome"              name="nome"     value={owner.nome}      onChange={handleChange}/><br/>
                
                <input type="password" className = "caixasTextoOrange"  placeholder="Password"          name="password" value={owner.password}  onChange={handleChange}/><br/>
                
                <input type="password" className = "caixasTextoOrange"  placeholder="Confirm Password"       onChange={(e) => setPassword(e.target.value)}/><br/>
                
                <input type="number"  className = "caixasTextoOrange"   placeholder="NIF"               name="nif"      value={owner.nif}       onChange={handleChange}/><br/>
                <p id="error"></p>
            </form>

            <button onClick={SignIn}>Confirmar</button>
        <button onClick={Back}>Back</button>
    </div>

    );

}

export default SignInOwner;