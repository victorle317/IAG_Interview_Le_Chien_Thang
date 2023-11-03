import { useState, useEffect, useCallback } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FactoredNavBar from './components/FactoredNavBar.jsx';

const fetchOrders = async () => {
  try {
    const response = await fetch('http://localhost:4000/orders');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);

  }

}
const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:4000/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [orders, setOrders] = useState([]);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetchOrders().then((data) => {
      console.log(data);
      setOrders(data)
    });
    fetchProducts().then((data) => {
      setProduct(data)
    });

  },[])

  return (
    <>
      <FactoredNavBar />
      <div className="container mt-4">
      
      <h2> List of Available Products from Backend</h2>
      
       {
       products ? products.map((
          product
        ) => { 
          return <>
          <div><strong>ID: {product.id}</strong></div>
             <div > Name : {product.productName} </div>
             <div>  {product.price}</div>
             <br />
             <hr />
          </>
         }) : <div> No Products Available</div>
       }
      
      <h2> List of Orders from Backend</h2>
      {
          orders ? orders.map((order,i) => { 
            return <>
                    <div>Number {i}</div>
                    <div >Total Cost: {order.totalCost}</div>
                    <br />
                    <hr />
            </>
          }) : <div> No Orders Available</div>
      } 
    </div>

    </>
  )
}

export default App
