import React from 'react'
import { Link } from 'react-router-dom'
import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount.js'
import { useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { useContext, useEffect } from 'react'

const ItemDetail = ({productDetail}) => {
    const {id, title, price, pictureURL, description, stock, online, size} = productDetail;
    const [count, setCount] = useState(0);

    const { addItem, isInCart } = useContext(CartContext)

    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);    

    
    const agregarAlCarrito = () => {
      const itemToAdd = {
        id,
        title,
        price,
        pictureURL,
        count
      }
      count > 0 && addItem(itemToAdd)
    }
    

  return (
    <div style={{maxWidth: 600+'px'}}>
        <div className='d-flex detailCard'> 
          <img src={pictureURL !== undefined? pictureURL : console.log('error')} style={{maxWidth:400+'px'}} className="card-img-top" alt="{title}"/>
          <div className="d-flex flex-column infoContainer" >
              <div>
                <h1 className="card-title">{title}</h1>
                <p className="card-text" style={{color:'#000', fontWeight:'bold'}}>${price}</p>
                <p>{description}</p>
                <p>¿Contiene modo multijugador? {online}</p>
                <p>Peso: {size}</p>
              </div>
              <br/>
              {
                !isInCart(id)
                ? <ItemCount
                    stock={stock} 
                    initial={0} 
                    onAdd={agregarAlCarrito}
                    setCount={setCount}
                    count={count}
                  />
                : <Link to='/cart' className="add-item-btn link-with-button my-3">TERMINAR COMPRA</Link>
              }
              
          </div>
        </div>
    </div>
  )
}

export default ItemDetail