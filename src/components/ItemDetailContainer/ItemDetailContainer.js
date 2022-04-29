import React, {useState,useEffect} from 'react' 
import ItemDetail from '../ItemDetail/ItemDetail'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import './ItemDetailContainer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faCheck} from '@fortawesome/free-solid-svg-icons';


const ItemDetailContainer = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(-1)
    }

    const [productDetail, setProductDetail] = useState([])
    const { itemId } = useParams();

    useEffect(() => {
    
      const docRef= doc(db,'productos', itemId)
      getDoc(docRef)
      .then(doc => {
        setProductDetail({id:doc.id, ...doc.data()})
      })
  
    },[itemId])

  return (
    <div className='itemDetailContainer'>
      <button  className="getBack-btn" onClick={handleNavigate} type="button"><span className="text-button"><FontAwesomeIcon icon={faArrowLeft}/> VOLVER ATRAS</span></button>
      <hr style={{marginTop:'0'}}/>
      <ItemDetail productDetail = {productDetail}/>
    </div>
  )
}

export default ItemDetailContainer

