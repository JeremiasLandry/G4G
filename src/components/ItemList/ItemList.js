import React from "react";
import Item from '../Item/Item.js';

const ulStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    margin: '0',
    flexWrap: 'wrap',
    padding: '0'
}

const itemStyle = {
    listStyleType:'none',
    margin:'0 25px',
    marginBottom: '20px',
}

function ItemList ({Items}) {
    return (<ul style={ulStyle}>{Items.map(j => <li key={j.id} style={itemStyle}><Item id={j.id} title={j.title} price={j.price} pictureURL={j.pictureURL}/></li>)}</ul>)
}




export default ItemList 