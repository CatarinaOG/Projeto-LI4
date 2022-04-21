import React , {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Select from 'react-select'

function DeleteReserva(){

    let history = useHistory();

    const [reservas, setReservas] = useState([]);
    const [ids, setIds] = useState([]);
    const [selected,setSelected] = useState('');

    const data1 = { nothing: ''};

    
    const getReservas = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/restaurante/get_reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        });

        const reservass = await response.json();
        setReservas(reservass);

        for( let i =0 ; i<reservass.length ; i++ ){

            const info = {
                label: reservass[i].id,
                value: reservass[i].id,
            }

            setIds(oldIds => [...oldIds, info ]);
        }

    }

    useEffect( () => {
        getReservas();
    },[]);


    function handleChange(e) {
        setSelected(e.value);
    }

    function getPratos(pratos){

        let ret = "";
        let i = 0;

        for( i ; i<pratos.length-1 ; i++){
            ret = ret + pratos[i] + " + "
        }

        ret = ret + pratos[i];
        return ret;
    }

    function Eliminar(){

        const info = {
            id: selected,
        };

        fetch('http://127.0.0.1:8080/api/proprietario/remover_reserva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
        });

        let path = '/FrontpageOwner';
        history.push(path);  

    }


    function Back() {
        let path = '/ChooseDeleteReserva';
        history.push(path);  
    }



    return(
        <div>
            <h1 className='title'>As reservas existentes neste restaurante : </h1>
            <div className = "divGrey">
                <h2>Escolha a reserva a eliminar:</h2>
                <Select options={ids} onChange={handleChange}/>
                {
                    reservas.map((reserva) => (
                        <div className="divAvaliacao">
                            <p style={{color:"black"}}>Id : {reserva.id}</p>
                            <p style={{color:"black"}}>Dia :    {reserva.data}</p>
                            <p style={{color:"black"}}>Hora :   {reserva.hora}</p>
                            <p style={{color:"black"}}>Número de    pessoas : {reserva.num_pessoas}</p>
                            <p style={{color:"black"}}>Representante  : {reserva.nome}</p>
                            <p style={{color:"black"}}>Pratos  :    {getPratos(reserva.pratos)}</p>

                        </div>  
                    ))
                }

            <button onClick={Back}>Back</button>
            <button onClick={Eliminar}>Eliminar</button>
            </div>
        </div>

    );
}

export default DeleteReserva;