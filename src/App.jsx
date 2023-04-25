import './App.css'
import  NavBar  from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer';


function App() {

  return (
    <>
      <NavBar/> 
      <Routes>
        <Route path='' element={<ItemListContainer/>}/>
        <Route path="/category/:id" element={<ItemListContainer/>} />
        <Route path="/detail/:id" element={<ItemDetailContainer />} />
      </Routes>
      
    </>
  )
}

export default App
