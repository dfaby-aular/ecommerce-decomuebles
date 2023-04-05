import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import  NavBar  from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';


function App() {

  return (
    <div className="App">
      <NavBar/> 
      <ItemListContainer greeting="Bienvenidos a nuestra tienda DecoMuebles"/>
    </div>
  )
}

export default App
