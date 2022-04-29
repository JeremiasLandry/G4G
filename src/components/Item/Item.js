import React from "react";
import { Link } from 'react-router-dom'
import './Item.css'



function Item({id, title, price, pictureURL}){
return(<Link to={`/item/${id}`} className='card-link'>
            <div className="card" style={{width: 12+'rem'}}>
                <img src={pictureURL} className="card-img-top" alt="..."/>
                <div className="card-body d-flex justify-content-between flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">${price} ARS</p>
                </div>
            </div>
        </Link>)
}




export default Item 

