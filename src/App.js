import { Route, Routes } from "react-router-dom";
import WebHeader from "./components/Header/WebHeader";
import Products from "./pages/Products";
import Layout from "./pages/Layout";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { CartItems } from "./libs/context/CartItems";
import { geCartItems } from "./libs/api";


function App() {

  const [cart,setCart] = useState([])

  useEffect(()=>{
    const carts = async () => {
      // const data = await geCartItems()
      let data = localStorage['cart_items'] ? JSON.parse(localStorage['cart_items']) : null
      if(data){
        setCart(data)
      }else{
        setCart([])
      }
    }

    carts()
  },[])
  return (
    <>
    <CartItems.Provider value={{cart,setCart}}>
      <WebHeader />
      <Routes>
        <Route path="/" element={<Products />} />
        {/* <Route path="/" element={<Layout />} /> */}
        {/* <Route index element={<Home />} /> */}
        <Route path="products" element={<Products />} />
        <Route path="login" element={<Login />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Routes>
    </CartItems.Provider>

    </>
  );
}

export default App;
