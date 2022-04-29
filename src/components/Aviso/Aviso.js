import React from 'react'
import './Aviso.css'

const Aviso = ({titulo,mensaje}) => {
    return (
      <div className="aviso-container">
        <h3 className='aviso-title' style={{fontSize:1.5+'em'}}>{titulo}: </h3>
        <span style={{color:'#fff'}}> {mensaje}</span>
      </div>
    )
  }

export default Aviso