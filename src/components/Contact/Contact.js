import React from 'react'
import { useState } from 'react'
import { db } from '../../firebase/config'
import { collection, addDoc, Timestamp} from 'firebase/firestore'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import './Contact.css'

const Contact = () => {
    const [messageState, setMessageState] = useState(null)
    const [loader, setLoader] = useState(false)

    const [values, setValues]= useState ({
      nombre:'',
      email:'',
      tel: '',
      apellido:'',
      message:''
    })

    const handleInputChange= (e) => {
      setValues({
          ...values,
          [e.target.name]: e.target.value
      })
    }
   
    const handleSubmit = (e) => {
      e.preventDefault()
        setLoader(true)
        const consulta = {
          usuario: {...values},
          fyh: Timestamp.fromDate(new Date())
        }

        const consultasRef= collection(db, 'consultas')

        addDoc(consultasRef, consulta)
        .then((doc) => {
          setMessageState('sent')
        })
    }

    if (messageState === 'sent') {
      return (<div className="container d-flex justify-content-start flex-column my-5 mx-5 align-items-center mx-auto"  style={{minHeight:100+'vh'}}>
              <h2 className='contact-title'>
                  TU CONSULTA SE ENVIO EXITOSAMENTE!
              </h2>
              <h4 style={{textAlign: 'center'}}>Dentro de un periodo de tres días obtendras una respuesta.</h4>
              <Link to="/" className="link-button text-button my-3" style={{fontWeight:600}}>VOLVER AL INICIO</Link>
             </div>)
    }

  return (
    <div className='checkout-container'>
        <h2 className='text-header'>CONTACTO</h2>
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
                type={'tel'}
                placeholder= 'TELEFONO'
                value={values.tel}
                name='tel'
                onChange={handleInputChange}
                required
                />
            <input
                className="form-checkoutId messageBox my-2"
                type={'text'}
                placeholder= 'DEJANOS UN COMENTARIO'
                value={values.message}
                name='message'
                onChange={handleInputChange}
                required
            />
          
            <button type="submit">ENVIAR</button>
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

export default Contact