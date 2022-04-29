import React from 'react'
import {useContext} from 'react'
import { CartContext } from '../../context/CartContext'
import { useState } from 'react'
import { db } from '../../firebase/config'
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc} from 'firebase/firestore'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Aviso from '../Aviso/Aviso'
import Loader from '../Loader/Loader'
import './Checkout.css'

const Checkout = () => {

    const{cart, cartTotal, clearCart} = useContext(CartContext)

    const [orderId, setOrderId] = useState(null)
    const [loader, setLoader] = useState(false)
    const [aviso, setAviso] = useState(false)
    const [aviso2, setAviso2] = useState(false) //componente 'aviso' pero con otro mensaje
    const [values, setValues]= useState ({
      nombre:'',
      email:'',
      tel: '',
      apellido:'',
      confirmEmail:''
    })

    const handleInputChange= (e) => {
      setValues({
          ...values,
          [e.target.name]: e.target.value
      })
    }
   
    const handleSubmit = (e) => {
      e.preventDefault()
      if(values.email === values.confirmEmail){
        setAviso(false);
        setLoader(true)
        const orden = {
          items: cart,
          total: cartTotal(),
          comprador: {...values},
          fyh: Timestamp.fromDate(new Date())
        }
  
  
        const ordersRef= collection(db, 'orders')
  
        cart.forEach((item)=> {
          const docRef= doc(db, 'productos', item.id)
  
          getDoc(docRef)
                .then((doc)=> {
                  if(doc.data().stock >= item.count){
                    updateDoc(docRef, {
                      stock: doc.data().stock - item.count
                    })
                    addDoc(ordersRef, orden)
                    .then((doc) => {
                      setOrderId(doc.id)
                      clearCart()
                  })
  
                  } else {
                    setAviso2(true)
                    setLoader(false)
                     //reemplazar por componente modal.
                  }
                })
        })
      }else {
        setAviso(true);
      }
    }
    if (orderId) {
      return (<div className="container d-flex justify-content-start flex-column my-5 mx-5 align-items-center mx-auto"  style={{minHeight:100+'vh'}}>
              <h2 className='contact-title'>TU ORDEN SE REGISTRÓ EXITOSAMENTE!</h2>
              <h4 style={{textAlign: 'center'}}> Guarda tu número de orden: {orderId}</h4>
              <Link to="/" className="link-button text-button my-3" style={{fontWeight:600}}>VOLVER AL INICIO</Link>
             </div>)
    }
    
    if (cart.length === 0){
        return <Navigate to='/'/>
    }

  return (
    <div className='checkout-container'>
        <h2 className='text-header'>CHECKOUT</h2>
        <hr/>
        <div className='checkout-input-group'>
          <form onSubmit={handleSubmit}>
            <div className='input-nombreApellido'>
              <input
                  className="form-checkoutId my-2"
                  type={'text'}
                  placeholder= 'NOMBRE'
                  value={values.nombre}
                  name='nombre'
                  onChange={handleInputChange}
                  style={{marginRight:25+'px'}}
                  required
              />
              <input
                  className="form-checkoutId my-2"
                  type={'text'}
                  placeholder= 'APELLIDO'
                  value={values.apellido}
                  name='apellido'
                  onChange={handleInputChange}
                  required

              />
            </div>
            <input
                className="form-checkoutId my-2"
                type={'email'}
                placeholder= 'EMAIL'
                value={values.email}
                name='email'
                onChange={handleInputChange}
                required
            />
            <input
                className="form-checkoutId my-2"
                type={'email'}
                placeholder= 'CONFIRMA EL EMAIL'
                value={values.confirmEmail}
                name='confirmEmail'
                onChange={handleInputChange}
                required
            />
            <input
                className="form-checkoutId my-2"
                type={'tel'}
                placeholder= 'TELEFONO'
                value={values.tel}
                name='tel'
                onChange={handleInputChange}
                required
            />
          
            <button type="submit">ENVIAR</button>
            {
                aviso
                ? <Aviso titulo='ERROR' mensaje='LAS DIRECCIONES EMAIL NO COINCIDEN' boton='ENTENDIDO'/>
                : ''
            }
            {
                aviso2
                ? <Aviso titulo='LO SENTIMOS' mensaje='NO HAY STOCK. VUELVE MAS TARDE O ELIGE OTRO PRODUCTO' boton='ENTENDIDO'/>
                : ''
            }
            {
                loader
                ? <div className='d-flex justify-content-center my-3'><Loader/></div>
                : ''
            }
         </form>
        </div>
    </div>
  )
}

export default Checkout