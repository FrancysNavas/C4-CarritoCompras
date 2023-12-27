import { useState } from 'react';
import React from 'react'
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };


export const Header = ({allProducts,
		setAllProducts,
		total,
		countProducts,
		setCountProducts,
		setTotal})  => {
			//usar el useState para estado active y setear el estado
		const [active, setActive] = useState(false);
		const [mostrar, setMostrar] = useState(true)
		const [open, setOpen] = React.useState(false);
		const [snackBar, setSnackBar] = React.useState(false);
		const handleOpen = () => setOpen(true);
		const handleClose = () => setOpen(false);
		const [submitted, setSubmitted] = useState(false);
	
		const [userInfo, setUserInfo] = useState({
			nombreTitular: "",
			numTarjeta: "",
			vencimiento: "",
			cvv: ""
			
		  });
		 
		//acción para borrar producto del carrito
		const onDeleteProduct = product => {
			const results = allProducts.filter(
				item => item.id !== product.id
			);
	
			setTotal(total - product.precio * product.quantity);
			setCountProducts(countProducts - product.quantity);
			setAllProducts(results);
		};
			//acción para variar todo el carrito
		const onCleanCart = () => {
			//usamos el estado set para llevar los valores a cero
			setAllProducts([]);
			setTotal(0);
			setCountProducts(0);
			
		};
		
		const handleSubmit = (event) => {
			//event.preventDefault();
	
			setSubmitted(true);
						
		};
		const onConfirm = () => {
		
			handleClose();

			setSnackBar(true);
					
		};		
				
		const handleCloseSnackBar = (event, reason) => {
			if (reason === 'clickaway') {
			  return;
			}
			setSnackBar(false);

		  };
		  const handleChange = (event) => {
			
			const { name, value } = event.target;
			setUserInfo({ ...userInfo, [name]: value });
				
			if (!userInfo.nombreTitular.trim) {
				console.log('esta vacio fruta')
            return 
			};

			
			
			
		  };
		//
	return (
		<header-carrito>
			<h1>Tienda</h1>
			<div className='container-icon'>
				{/**Icono del header carrito, aqui la accion onclick activa lalista */}
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'> {/**se cuenta cantidad de productos con quantify +1*/}
						<span id='contador-productos'>{countProducts}</span>
					</div>
			</div>

				<div
					className={`container-cart-products ${
						
						active ? '' : 'hidden-cart'
					}`}
				>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.quantity}
											</span>
											<p className='titulo-producto-carrito'>
												{product.nombre}
											</p>
											<span className='precio-producto-carrito'>
												${product.precio}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
							<button className='btn-comprar' onClick={() => {setMostrar(!mostrar)}}>
											
							{mostrar ? 'Realizar pago' : 'Seguir comprando'}				
							</button>
							
							{!mostrar ? (
									<div className='1'style={{margin: 30  }}>
										<h3>Datos para realizar el pago</h3><br />
										<FormControl  onSubmit={handleSubmit}>
											<TextField  name="nombreTitular" id="nombreTitular" label="Nombre del Titular" 
											variant="outlined" color="secondary" value={userInfo.nombreTitular} onChange={handleChange } /><br />
											
											<TextField name="numTarjeta" id="numTarjeta" label="Número de Tarjeta" 
											variant="outlined" color="secondary" value={userInfo.numTarjeta} onChange={handleChange}  /><br />
											<TextField name="vencimiento" id="vencimiento" label="Fecha de Vencimiento"  helperText={''}
											variant="outlined" color="secondary" value={userInfo.vencimiento} onChange={handleChange} /><br />
											<TextField name="cvv" id="cvv" label="CVV"  
											variant="outlined" color="secondary" value={userInfo.cvv} onChange={handleChange}/>
											<div className='cart-total'>
												<h3>Total a pagar:</h3>
												<span className='total-pagar'>${total}</span>
											</div>
											<div>
								<Button onClick={handleOpen} onChange={handleChange} type="submit" variant="contained" color="secondary" 
								disableElevation>Finalizar compra</Button> 		
													
								<Modal
									open={open}
									onClose={handleClose}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={style}>
									<Typography id="modal-modal-title" variant="h6" component="h2">
										Confirmación de Pago
									</Typography>
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										¿ Confirma los datos suministrados ?
									</Typography>
									<Button onClick={onConfirm}>Confirmar</Button>
									
									</Box>
								</Modal>
								
								<Stack spacing={2} sx={{ width: '100%' }}>
									<Snackbar open={snackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
										<Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
										Compra exitosa!
										</Alert>
									</Snackbar>
								</Stack>
    						</div>
										</FormControl>
										
									</div>
	
								
								) : (
									null
							)}
							
							
						</>
						

					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
				
			</div>
		</header-carrito>
	)

}


export default Header

