import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";



const mapContainerStyle = {
    width: "99vw",
    height: "90vh",
};



export default function MapClassificacao(){

    const [location, setLocation] = useState('');
    const [restaurantes, setRestaurantes] = useState([]);
    const data1 = { nothing: ''};
    const [seeButton, setSeeButton] = useState(false);
    const history = useHistory();


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyCOXU77xurnU89_bztrY90azlwyQuwK8Q8",
        libraries: ["places"],
    }); 


    const getLocation = async () => {
            navigator.geolocation.getCurrentPosition(
            (position => 
                setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                })
        ));
    } 


    const getRestaurants = async () => {

        const response = await fetch('http://127.0.0.1:8080/api/cliente/filtra_restaurantes_ambos', {
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
        getLocation();
        getRestaurants();
    },[]);

    
    const goToRestaurant = (e) => {

        const data1 = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }

        fetch('http://127.0.0.1:8080/api/restaurante/recebe_coordenadas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        }); 

        setSeeButton(true);

    }

    function seeRest() {
        let path = '/Restaurante';
        history.push(path); 
    }

    function SeeButton(){
        if(seeButton){
            return <button className = "buttonLong" onClick={seeRest}>Aceder a informação do restaurante</button>
        }
        else return null
    }
    

    function Back() {
        let path = '/FrontPageUser';
        history.push(path); 
    }

    if(loadError) return "Error Loading";
    if(!isLoaded) return "Loading";


    return(
        <div>
            <button onClick={Back}>Voltar</button>
            <SeeButton/>
            <p></p>
            <div className="center">
                <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={location}
                >
                {
                    restaurantes.map( (marker) => (
                        <Marker 
                            key={marker.id} 
                            position={ {lat: marker.lat, lng:   marker.lng} }
                            onClick={goToRestaurant}
                        />
                    ))
                }    
                </GoogleMap>
            </div>

        </div> 
    );
}