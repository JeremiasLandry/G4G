import React from 'react'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate(-1)
  }


  const { cart, clearCart, removeItem, cartTotal} = useContext(CartContext);

  if (cart.length === 0) {
    return <div className="cart-container my-5 d-flex justify-content-start flex-column align-items-center" style={{height:100+'vh'}}>
                <h2 style={{marginBottom:0}}>TU CARRITO ESTA VACÍO</h2>
                <hr/>
                <h5>VUELVE AL SHOP PARA COMPRAR</h5>
                <Link to={"/"} className="text-button my-4" style={{fontWeight: "bold",color:'#ad08c0'}}><FontAwesomeIcon icon={faArrowLeft}/> VOLVER</Link>
            </div>
  }

  return (
      <div className="cart-container">
          <button  className="getBack-btn" onClick={handleNavigate} type="button"><span className="text-button"><FontAwesomeIcon icon={faArrowLeft}/> VOLVER ATRAS</span></button>
          <hr style={{marginTop:'0'}}/>
          <h2>CARRITO</h2>
          <div className='d-flex justify-content-between responsive-cart'>
              <div className='d-flex flex-column'>
                {
                    cart.map((item) => (
                        <div key={item.id} className='cart-card'>
                            <img className='cart-item-img' src={item.pictureURL !== undefined? item.pictureURL : console.log('error')} alt={item.title}/>
                            <div className='card-info'>
                                <div className='d-flex justify-content-between responsive-card-info'>
                                    <h4 style={{fontWeight:'200'}}>{item.title}</h4>
                                    <div>
                                        <h5> ${item.price * item.count} ARS</h5>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between responsive-card-info'>
                                    <p>Cantidad x{item.count}</p>
                                    <button 
                                        className="delete-cart-item"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
              </div>
                <div>
                    <p style={{fontWeight:500,paddingBottom:5+'px',borderBottom:2+'px solid #000'}}>TOTAL DEL CARRITO:</p>
                    <div className="d-flex justify-content-between">
                        <span>TOTAL</span>
                        <span><b>${cartTotal()} ARS </b></span>
                    </div>
                    <hr/>
                    <div className='d-flex'>
                        <button className="add-item-btn2" onClick={clearCart}><span className="text-button">VACIAR CARRITO</span></button>
                        <Link to="/checkout" className="add-item-btn link-with-button">TERMINAR MI COMPRA</Link>
                    </div>
                </div>
          </div>
      </div>
  )
}

export default Cart