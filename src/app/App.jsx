import  NavBar  from './layout/NavBar';
import ItemListContainer from './pages/ItemListContainer';
import { Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './pages/ItemDetailContainer';
import { CartProvider } from '../contexts/CartContext';
import Error from '../app/pages/Error'
import SignIn from './pages/outh/SignIn';
import MyShopping from './pages/MyShopping';
import CreateNewProduct from './pages/CreateNewProduct';
import Cart from './pages/Cart';


function App() {

  return (
    <>
    <CartProvider>
      <NavBar/> 
      <Routes>
        <Route path='' element={<ItemListContainer/>}/>
        <Route path="/create_product" element={<CreateNewProduct />} />
        <Route path="/category/:id" element={<ItemListContainer/>} />
        <Route path="/myShopping/:id" element={<MyShopping />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<ItemDetailContainer />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignIn register={true} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      
    </CartProvider>
    </>
  )
}

export default App
