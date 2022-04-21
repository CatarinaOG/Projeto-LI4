import React, {useRef} from 'react';
import { useHistory } from "react-router-dom";


function AddRestaurant(){

    const history = useHistory();

    const nome = useRef(null);
    const rua = useRef(null);
    const localidade = useRef(null);
    const num_telefone = useRef(null);
    const codPostal = useRef(null);
    const lat = useRef(null);
    const lng = useRef(null);
    const aSegunda = useRef(null);
    const fSegunda = useRef(null);
    const aTerca = useRef(null);
    const fTerca = useRef(null);
    const aQuarta = useRef(null);
    const fQuarta = useRef(null);
    const aQuinta = useRef(null);
    const fQuinta = useRef(null);
    const aSexta = useRef(null);
    const fSexta = useRef(null);
    const aSabado = useRef(null);
    const fSabado = useRef(null);
    const aDomingo = useRef(null);
    const fDomingo = useRef(null);



    function handleSubmit(e){
        let horario = createHorario();
        e.preventDefault();

        const data1 = {
            nome: nome.current.value,
            rua: rua.current.value,
            localidade: localidade.current.value,
            num_telefone: num_telefone.current.value,
            horario: horario,
            latitude : lat.current.value,
            longitude : lng.current.value,
            codigo_postal: codPostal.current.value,
        }


        fetch('http://127.0.0.1:8080/api/restaurante/registar', {
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
        });    
    }

    function Back(){
        let path = '/FrontPageOwner';
        history.push(path);
    }
    
    function createHorario(){
        let segundaHorario = aSegunda.current.value + "--" + fSegunda.current.value + ";";
        let tercaHorario = aTerca.current.value + "--" + fTerca.current.value +";";
        let quartaHorario = aQuarta.current.value + "--" + fQuarta.current.value +";";
        let quintaHorario = aQuinta.current.value + "--" + fQuinta.current.value +";";
        let sextaHorario = aSexta.current.value + "--" + fSexta.current.value + ";";
        let sabadoHorario = aSabado.current.value + "--" + fSabado.current.value+ ";";
        let domingoHorario = aDomingo.current.value + "--" + fDomingo.current.value + ";";
    
        return segundaHorario + tercaHorario + quartaHorario + quintaHorario + sextaHorario + sabadoHorario + domingoHorario;
    }

 
    return(
        <div>
            <h1 style={{fontSize: "40px", color: "white", padding: "5px"}}> Adicionar Restaurante</h1>

            <div style={{ background: "rgb(206, 206, 206)", border: "2px white solid" }}>
                <form style = {{padding: "10px"}} className="form1" onSubmit={handleSubmit}>
                    <label for="nome">Nome :</label>
                    <input className='caixasTextoWhite' type="text" name="nome" ref={nome} />
                    <br />
                    <br />

                    <label for="rua">Endereço: </label>
                    <input className='caixasTextoWhite' type="text" name="rua" ref={rua} />
                    <br />
                    <br />

                    <label for="localidade">Localidade: </label>
                    <input className='caixasTextoWhite' type="text" name="localidade" ref={localidade} />
                    <br />
                    <br />
                    <label for="codPostal">Código Postal :  </label>
                    <input className='caixasTextoWhite' type="text" name="codPostal" ref={codPostal} />
                    <br />
                    <br/>
                    <label for="telefone">Contacto Telefónico: </label>
                    <input className='caixasTextoWhite' type="text" name="num_telefone" ref={num_telefone} />
                    <br />



                    <p>Adicione as suas coordenadas: <span><input className='caixasTextoWhite' type="number" placeholder="lat" ref={lat} step="0.000001" /></span> e   <span><input className='caixasTextoWhite' type="number" placeholder="lng" ref={lng} step="0.000001" /></span></p>
                    <div>
                        <h4>Insira o horário no formato indicado :</h4>
                        <label className="horario" for="aSegunda">Segunda-feira: </label>
                        <input className='caixasTextoWhite'  type="text" name="aSegunda" ref={aSegunda} placeholder="--:--" />
                        <label for="fSegunda"> -- </label>
                        <input className='caixasTextoWhite'  type="text" name="fSegunda" ref={fSegunda} placeholder="--:--" />

                        <br />
                        <br />
                        <label className="horario" for="aTerca">Terca-feira: </label>
                        <input className='caixasTextoWhite' type="text" name="aTerca" ref={aTerca} placeholder="--:--" />
                        <label for="fTerca"> -- </label>
                        <input className='caixasTextoWhite' type="text" name="fTerca" ref={fTerca} placeholder="--:--" />

                        <br />
                        <br />
                        <label className="horario" for="aQuarta">Quarta-feira: </label>
                        <input className='caixasTextoWhite'  type="text" name="aQuarta" ref={aQuarta} placeholder="--:--" />
                        <label for="fQuarta"> -- </label>
                        <input className='caixasTextoWhite'  type="text" name="fQuarta" ref={fQuarta} placeholder="--:--" />

                        <br />
                        <br />
                        <label className="horario" for="aQuinta">Quinta-feira: </label>
                        <input className='caixasTextoWhite'  type="text" name="aQuinta" ref={aQuinta} placeholder="--:--" />
                        <label for="fQuinta"> -- </label>
                        <input className='caixasTextoWhite'  type="text" name="fQuinta" ref={fQuinta} placeholder="--:--" />


                        <br />
                        <br />
                        <label className="horario" for="aSexta">Sexta-Feira: </label>
                        <input className='caixasTextoWhite' type="text" name="aSexta" ref={aSexta} placeholder="--:--" />
                        <label for="fSexta"> -- </label>
                        <input className='caixasTextoWhite' type="text" name="fSexta" ref={fSexta} placeholder="--:--" />

                        <br />
                        <br />
                        <label className="horario" for="aSabado">Sábado: </label>
                        <input className='caixasTextoWhite' type="text" name="aSabado" ref={aSabado} placeholder="--:--" />
                        <label for="fSabado"> -- </label>
                        <input className='caixasTextoWhite' type="text" name="fSabado" ref={fSabado} placeholder="--:--" />

                        <br />
                        <br />
                        <label className="horario" for="aDomingo">Domingo: </label>
                        <input className='caixasTextoWhite' type="text" name="aDomingo" ref={aDomingo} placeholder="--:--" />
                        
                        <label for="fDomingo"> -- </label>
                        <input className='caixasTextoWhite' type="text" name="fDomingo" ref={fDomingo} placeholder="--:--" />
                    </div>

                    <button type='submit' className="button">Confirmar</button>
                    <button className="button" onClick={Back}>Cancelar</button>

                </form>
            </div>    
        </div>
    )}

export default AddRestaurant;