import React, {useEffect, useState} from "react";
import Select from 'react-select'
import { useHistory } from "react-router-dom";



function ChooseDeleteReserva(){

    let history = useHistory();

    const [restaurantes, setRestaurantes] = useState([]);
    const [selected, setSelected] = useState('');
    const [canGo, setCanGo] = useState(false);

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

    function handleChange(e) {
        setSelected(e.value);
    }

    async function ChooseRest() {

        const data1 = {
            nome: selected
        }

        console.log("nomeRestaurante");
        
        fetch('http://127.0.0.1:8080/api/proprietario/nome_restaurante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
        })
        .then(response => console.log(response))
        .catch((error) => {
            console.error('Error:', error);
        });

        setCanGo(true);
    }

    function CanGo(){
        if(canGo){
            return <button onClick={showReservas}>Ver reservas</button>;
        }
        return null
    }

    function showReservas() {
        let path = '/DeleteReserva';
        history.push(path);   
    }

    function Back() {
        let path = '/FrontPageOwner';
        history.push(path);         
    }


    return(
        <div className = "divGrey">
            <h1 className = "center">Selecione o restaurante que pretende eliminar reserva : </h1>
            <Select options={restaurantes} onChange={handleChange}/>
            <div className = "center">
                <button onClick={ChooseRest}>Confirmar</button>
                <CanGo/>
                <button onClick={Back}>Back</button>
            </div>

        </div>

    );
}

export default ChooseDeleteReserva;
