import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import {useEffect, useRef, useState} from 'react'


import '../CSS/AboutUs.css';

function AboutUs(){
    
    const history = useHistory();


    const Back = () => {
        let path = '/FrontPageUser';
        history.push(path);
    }

    return(
        <div>
            <h1 className="title">About Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolor tenetur odit! Quidem a velit vitae consectetur, corporis perspiciatis nesciunt animi. Quos facere totam sint, blanditiis neque velit molestiae eius corporis odit non aliquam exercitationem ratione omnis repellendus, inventore laboriosam nemo. Distinctio unde repellendus cumque explicabo sapiente porro fuga saepe adipisci neque. Dignissimos rerum voluptatibus sint fugiat temporibus explicabo odit accusamus, unde corrupti illum vitae impedit repellendus libero fugit nisi, molestiae tenetur neque quae asperiores nobis. Voluptatem, et esse sed totam laboriosam, aspernatur voluptates sequi adipisci maxime minus delectus reprehenderit harum, modi beatae magnam nostrum odit quo architecto. Dicta fuga harum facere optio necessitatibus est nemo soluta id voluptas quaerat, quas nisi fugit ad ipsum vero aliquid maxime quia at impedit consectetur expedita, quos minus dolorem. Obcaecati sequi architecto, expedita rerum error sapiente aliquam impedit quibusdam eum pariatur itaque. Ut fuga iusto a quo necessitatibus impedit, repellendus quas reiciendis facere odio. Minima repellendus fugiat iure error deserunt? Ab in quisquam magni, quaerat reprehenderit saepe, a cum incidunt, debitis molestias velit nisi harum quidem quis numquam commodi soluta amet voluptatum vitae. Fugit sint obcaecati itaque iusto ullam, a, culpa blanditiis quidem recusandae omnis officiis dignissimos. Quasi magni pariatur modi officia perspiciatis ab non sit corporis illum, cupiditate nihil reprehenderit impedit dolore aspernatur asperiores dolorem quod corrupti ducimus officiis optio, quaerat, illo natus temporibus. Corrupti dolore harum ad cumque quis, mollitia non suscipit error molestias, iure impedit, ipsam fugiat sunt est nam veritatis dicta nisi? Atque a ipsum, consequuntur ratione assumenda cum minus repudiandae ipsam eligendi omnis. Delectus voluptatibus doloremque et, quae deserunt qui reiciendis ad! Nostrum quos reprehenderit assumenda placeat aspernatur earum voluptatibus, ea officiis quae mollitia sunt modi sapiente dignissimos libero architecto ut numquam eius et illo tempora sed quibusdam repellendus animi quas? Fugiat quisquam impedit reiciendis, nemo eos non.</p>
            
            
            <div>
                <img src="francesinha.png" alt=""/>
                <img src="braga mapa.png" alt=""/>
            </div>

            <div className="goBack">
                <button onClick={Back}>Go Back</button>
            </div>
        </div>
    );
}

export default AboutUs;