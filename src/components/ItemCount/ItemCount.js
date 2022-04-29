import './itemCount.css'

let countStyles={

    padding:'6px 25px',
    width:'100%',
    backgroundColor:'#d1d1d1'
}

function ItemCount({stock, initial, onAdd, setCount, count}){

    function restar(){
        if (count !== parseInt(initial)){
            setCount(count - 1)
        }
    }
    function sumar(){
        if (count !== parseInt(stock)){
            setCount(count + 1)
        }
    }
    

    return (<div className="itemCount">
    <div className="card-body d-flex justify-content-start flex-column align-items-start">
      <h5 className="card-title">Stock: {stock}</h5>
      <div className='counter-buttons my-3'>
        <button onClick={()=>restar()} type='button' href="#" className="counter-button" disabled={count === 0}>-</button>
        <span className='counter-info'>{count}</span>
        <button onClick={()=>sumar()} type='button' href="#" className="counter-button" disabled={count === stock}>+</button>
      </div>
      <button type='button' onClick={onAdd} href="#" className="add-item-btn" disabled={count === 0}>AGREGAR AL CARRITO</button>
    </div>
  </div>)
}


export default ItemCount;