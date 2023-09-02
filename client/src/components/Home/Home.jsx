import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/Actions/actionsProducts';


export default function Home() {
	const dispatch = useDispatch()
	const products = useSelector((state) => state.products)
	useEffect(() => {
		dispatch(getProducts())
	}, [])
	return (
		<div className={styles.container}>

			<Nav className={styles.side_bar}>
				<Nav.Item>
					<div>Categories</div>
				</Nav.Item>
				<Nav.Item>
					<div>Price</div>
					<select>
						<option value="Min-Max">Min-Max</option>
						<option value="Max-Min">Max-Min</option>
					</select>
				</Nav.Item>
				<Nav.Item>
					<div>Price Range</div>
					<input type="number" placeholder='Min' style={{ width: '30%' }} />
					<span> - </span>
					<input type="number" placeholder='Max' style={{ width: '30%' }} />
				</Nav.Item>
			</Nav>

			<div className={styles.card_container}>
				{products.map(p => (
					<CardProducto
						id={p.id}
						name={p.name}
						image={p.image}
						description={p.description}
						price={p.price}
						rating='5'
					>
					</CardProducto>
				))}
			</div>

		</div >
	)
}