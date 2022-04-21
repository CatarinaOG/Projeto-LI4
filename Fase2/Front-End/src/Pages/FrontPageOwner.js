import React from 'react';
import { useHistory } from "react-router-dom";


function FrontPageOwner(){

    const history = useHistory();

    function AddRestaurant() {
        let path = '/AddRestaurant';
        history.push(path);
    }

    function RemoveRestaurant() {
        let path = '/RemoveRestaurant';
        history.push(path);
    }

    function EditRestaurant() {
        let path = '/ChooseEditRestaurant';
        history.push(path);        
    }

    function DeleteRestaurant() {
        let path = '/ChooseDeleteReserva';
        history.push(path);
    }

    function Back() {
        let path = '/';
        history.push(path);
    }

    return( 

    <div>
        <div className="float-child1">
            <div className="center">

                <img className = "iconeFront" id="logo" src="logo.png" alt=""/>
                <br/>
                <br/>

                <button onClick={AddRestaurant}>Adicionar Restaurante</button><br/>
                <button onClick={RemoveRestaurant}>Remover Restaurante</button><br/>
                <button onClick={EditRestaurant}>Editar Restaurante</button><br/>
                <button onClick={DeleteRestaurant}>Eliminar Reserva</button><br/>
                
                <div className="bottom">
                <button onClick={Back}>Log Out</button>
                </div>

            </div>
        </div>

        <div className="float-child2">
            <div className="center">

                <h1></h1>
                <img className = "iconeFront" src="braga.png" alt="" id="braga"/>

            </div>
        </div>
    </div>


    );

}

export default FrontPageOwner;