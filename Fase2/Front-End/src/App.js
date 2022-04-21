import React from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';


import FirstPage from './Pages/FirstPage';
import LoginUser from './Pages/LoginUser';
import LoginOwner from './Pages/LoginOwner';
import FrontPageUser from './Pages/FrontPageUser';
import ChooseMap from './Pages/ChooseMap';
import MapDistancia from './Pages/MapDistancia';
import MapClassificacao from './Pages/MapClassificacao';
import MapAmbos from './Pages/MapAmbos';
import Reservas from './Pages/Reservas';
import FrontPageOwner from './Pages/FrontPageOwner';
import AddRestaurant from './Pages/AddRestaurant';
import RemoveRestaurant from './Pages/RemoveRestaurant';
import ChooseEditRestaurant from './Pages/ChooseEditRestaurant';
import EditRestaurant from './Pages/EditRestaurant';
import ChooseDeleteReserva from './Pages/ChooseDeleteReserva';
import DeleteReserva from './Pages/DeleteReserva';
import MenuRestaurante from './Pages/MenuRestaurante';
import ChooseCode from './Pages/ChooseCode';
import ChooseCodeCliente from './Pages/ChooseCodeCliente';
import Code from './Pages/Code';
import CodeClient from './Pages/CodeClient';
import Reservar from './Pages/Reservar';
import Avaliar from './Pages/Avaliar';
import Restaurante from './Pages/Restaurante';
import SignInUser from './Pages/SignInUser';
import SignInOwner from './Pages/SignInOwner';
import AboutUs from './Pages/AboutUs';
import Perfil from './Pages/Perfil';


function App() {
  return (
      
    <Router>
      <div>
        <Switch>
          <Route path="/Perfil" component={Perfil}></Route> 
          <Route path="/AboutUs" component={AboutUs}></Route> 
          <Route path="/SignInUser" component={SignInUser}></Route> 
          <Route path="/SignInOwner" component={SignInOwner}></Route> 
          <Route path="/FrontPageUser" component={FrontPageUser}></Route> 
          <Route path="/ChooseMap" component={ChooseMap}></Route> 
          <Route path="/MapDistancia" component={MapDistancia}></Route> 
          <Route path="/MapClassificacao" component={MapClassificacao}></Route> 
          <Route path="/MapAmbos" component={MapAmbos}></Route> 
          <Route path="/Reservas" component={Reservas}></Route> 
          <Route path="/FrontPageOwner" component={FrontPageOwner}></Route> 
          <Route path="/AddRestaurant" component={AddRestaurant}></Route> 
          <Route path="/RemoveRestaurant" component={RemoveRestaurant}></Route> 
          <Route path="/ChooseEditRestaurant" component={ChooseEditRestaurant}></Route> 
          <Route path="/EditRestaurant" component={EditRestaurant}></Route> 
          <Route path="/ChooseDeleteReserva" component={ChooseDeleteReserva}></Route> 
          <Route path="/DeleteReserva" component={DeleteReserva}></Route> 
          <Route path="/MenuRestaurante" component={MenuRestaurante}></Route> 
          <Route path="/ChooseCode" component={ChooseCode}></Route> 
          <Route path="/ChooseCodeCliente" component={ChooseCodeCliente}></Route> 
          <Route path="/Code" component={Code}></Route> 
          <Route path="/CodeClient" component={CodeClient}></Route> 
          <Route path="/Reservar" component={Reservar}></Route> 
          <Route path="/Avaliar" component={Avaliar}></Route> 
          <Route path="/Restaurante" component={Restaurante}></Route> 
          <Route path="/LoginOwner" component={LoginOwner}></Route>
          <Route path="/LoginUser" component={LoginUser}></Route>
          <Route path="/" exact component={FirstPage}></Route>
        </Switch>
      </div>
    </Router>

  );
  
}

export default App;
