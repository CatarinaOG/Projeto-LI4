import React from 'react';
import { useHistory } from "react-router-dom";



function FrontPageUser(){

    const history = useHistory();

    function toMap() {

        navigator.geolocation.getCurrentPosition(
            (position => {

            fetch('http://127.0.0.1:8080/api/cliente/recebe_localizacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }),
            })
        }));
    
        let path = '/ChooseMap';
        history.push(path);     
    }

    function toCodes(){
        let path = '/ChooseCodeCliente';
        history.push(path);    
    }

    function toReservas(){
        let path = '/Reservas';
        history.push(path);        
    }

    function AboutUs() {
        let path = '/AboutUs';
        history.push(path);
    } 

    function Perfil() {
        let path = '/Perfil';
        history.push(path);
    }

    function LogOutUser() {

        var data1 = {nothing: ""}

        fetch('http://127.0.0.1:8080/api/cliente/logout', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
        })

        let path = '/';
        history.push(path);

    }

    return(
        <div className ="float-container">
            <div className="float-child1">
                <div className="center">
                    <img className="iconeFront" src="logo.png" alt=""></img>
                    <br />
                    <br />

                    <button onClick={toMap}>Mapa</button><br/>
                    <button onClick={toCodes}>Códigos Promocionais</button><br/>
                    <button onClick={toReservas}>Reservas</button><br/>
                    <button onClick={AboutUs}>About Us</button><br/>
                    <br/><br/><br/><br/><br/><br/><br/>
                    <div >
                        <button onClick={Perfil}>Perfil</button><br/>
                        <button onClick={LogOutUser}>Log Out</button><br/>
                    </div>
                </div>
            </div>

            <div className ="float-child2">
                <div className="center">
                    <img className = "iconeFront" src="braga.png" alt="" id="braga"></img>
                </div>
            </div>
        </div>
        
    )
};

export default FrontPageUser;