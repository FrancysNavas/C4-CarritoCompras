import React from 'react'
import { data } from './Data';

export const ProductList= ({allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal}) => {
        const onAddProduct = product => {
            if (allProducts.find(item => item.id === product.id)) {
                const products = allProducts.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setTotal(total + product.precio * product.quantity);
                setCountProducts(countProducts + product.quantity);
                return setAllProducts([...products]);
            }
    
            setTotal(total + product.precio * product.quantity);
            setCountProducts(countProducts + product.quantity);
            setAllProducts([...allProducts, product]);
        };
    
        return (
            <div className='container-items'>
                {data.map(product => (
                    <div className='item' key={product.id}>
                        <figure>
                            <img src={product.image} alt={product.nombre} />
                        </figure>
                        <div className='info-product'>
                            <h2>{product.nombre}</h2>
                            <p className='price'>${product.precio}</p>
                            <button onClick={() => onAddProduct(product)}>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
}

export default ProductList