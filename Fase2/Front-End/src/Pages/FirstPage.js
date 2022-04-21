import React from 'react'
import { useHistory } from "react-router-dom";



function FirstPage(){
    const history = useHistory();
    

    function toCliente() {
        let path = '/LoginUser';
        history.push(path);
    }

    function toOwner() {
        let path = '/LoginOwner';
        history.push(path);
    }

    return(
        <div className = "center">
            <img src="../logo.png" alt="" id="firstImg"/>
            <br /><br /><br /><br /><br />
            <div>
                <button id="Sou Cliente" onClick={toCliente} className='firstButtons'>Sou Cliente</button>
                <button id="Sou proprietario" onClick={toOwner} className='firstButtons'>Sou Proprietário</button>
            </div>
        </div>
    );


}

export default FirstPage;