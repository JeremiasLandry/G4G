import React, { useEffect , useState} from "react";
import ItemList from '../ItemList/ItemList.js'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore';
import './ItemListContainer.css'
import MainBanner from './bannerG4G.jpg'
import BannerPS4 from './bannerPS4.jpg'
import BannerPS5 from './bannerPS5.jpg'

function ItemListContainer (){
    const [productos, setProductos] = useState([])
    const { categoryId } = useParams()
    const [banner, setBanner] = useState(MainBanner)
    const [header, setHeader] = useState('')

    const changeBanner = () => {
        if (categoryId === undefined){
            setBanner(MainBanner)
            setHeader('AGREGADOS RECIENTEMENTE')
        }
        else if (categoryId === 'playstation4'){
            setBanner(BannerPS4)
            setHeader('PLAYSTATION 4')
        }
        else if (categoryId === 'playstation5'){
            setBanner(BannerPS5)
            setHeader('PLAYSTATION 5')
        }
        return banner
    }

    useEffect(() => {
       
        const productosRef = collection(db, 'productos')
        const q = categoryId ? query(productosRef, where('category', '==', categoryId)) : productosRef

        getDocs(q)
            .then(resp => {
                const items = resp.docs.map((doc) => ({id:doc.id, ...doc.data()}))
                setProductos(items)
                changeBanner()
            })

    }, [categoryId])
    

    return (<div className='item-list-container'>
            <img src={banner} className='main-banner'/>
            <h1>{header}</h1>
            <ItemList Items={productos}/>
        </div>
    )
}


export default ItemListContainer;