import { useState } from 'react'
import './App.css'
import MyAppBar from './Componentes/MyAppBar'
import MyFooter from './Componentes/MyFooter'
import ProductList from './Componentes/ProductList'
import Header from './Componentes/Header'

function App() {
  
  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

  return (
    <>
    <MyAppBar />
      <div>
        <h1 style={{textAlign: 'center', fontSize: '3em', margin:20}}>Productos Destacados</h1>
      </div>  
    
    <Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
    <ProductList
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
       
    <MyFooter></MyFooter>
    </>
  )
}

export default App
