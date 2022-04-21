import React from "react";
import {useEffect, useRef, useState} from 'react'
import Select from 'react-select'
import { useHistory } from "react-router-dom";






function RemoveRestaurant(){

    const [restaurantes, setRestaurantes] = useState([]);
    const [selected, setSelected] = useState('');
    let history = useHistory();


    const data1 = { nothing: ''};

    const getRestaurants = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/proprietario/obter_restaurantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        });
        const restaurants = await response.json();
        setRestaurantes(restaurants);

    } 

    useEffect( () => {
        getRestaurants();
    },[]);

    function handleChange(e){
        setSelected(e.value);
    }

    function Delete(){

        console.log(selected);

        const data1 = {
            nome: selected
        }

        fetch('http://127.0.0.1:8080/api/proprietario/remover_restaurante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
            })
            .then((data) => {
                
                let path = '/FrontPageOwner';
                history.push(path);

            })
            .catch((error) => {
            console.error('Error:', error);
        })

        
    }

    function Back(){
        let path = '/FrontPageOwner';
        history.push(path);       
    }
    

    return (
        <div className = "divGrey">
            <h1>Selecione o restaurante que pretende remover : </h1>
            <Select options={restaurantes} onChange={handleChange} />
            <div className = "center">
                <button onClick={Delete}>Eliminar</button>
                <button onClick={Back}>Back</button>

            </div>
        </div>
    )
    


    

}

export default RemoveRestaurant