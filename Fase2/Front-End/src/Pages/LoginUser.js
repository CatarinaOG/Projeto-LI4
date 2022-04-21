import React , {useState} from 'react';
import { useHistory } from "react-router-dom";



function LoginUser(){

    const history = useHistory();

    const [ username , setUsername] = useState('');
    const [ password , setPassword] = useState('');


    function logInUser() {

        var data1 = {
            nome_utilizador : username,
            palavra_passe : password
        };

        fetch('http://127.0.0.1:8080/api/cliente/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
        })

        .then(response => response.json())
        .then((data) => {
            if(data.login){
                let path = '/FrontPageUser';
                history.push(path);
            }
            else{
                console.log(data.login)
            }
        })
        .catch(error => console.log(error));
    }

    function signInUser() {
        let path = '/SignInUser';
        history.push(path);
    }

    function Back() {
        let path = '/';
        history.push(path);
    }

    return(
    <div className = "center">
        
        <img src="logo.png" alt="" id="firstImg"/>

        <div >
            <form>
                <input className = "caixasTextoOrange" 
                    id="email" 
                    type="text" 
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}                
                    placeholder="username" /><br/>

                <input className = "caixasTextoOrange"
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"/>
            </form>
            <button onClick={logInUser}>Login</button>
            <button onClick={signInUser}>Sign In</button>
        </div>
        <br/>
        <br/>
        <button id="back" onClick={Back}>Back</button>

    </div>
    )
}

export default LoginUser;