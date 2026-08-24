import { useMemo, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Login from "../components/modal/login";
import Sell from "../components/modal/sell";
import Card from '../components/card/card'
import { ItemsContext } from "../components/context/item";

function Home(){
    const [openModal,setModal]=useState(false)
    const [openModalSell,setModalSell]=useState(false)
    const [searchTerm,setSearchTerm]=useState('')
    const toggleModal=()=>{
        setModal(!openModal)
    }
    const toggleModalSell=()=>{
        setModalSell(!openModalSell)
    }

    const itemsCtx=ItemsContext()
    const filteredItems=useMemo(()=>{
        const query=searchTerm.trim().toLowerCase()
        const products=itemsCtx.items || []

        if(!query) return products

        return products.filter((item)=>
            item.title?.trim().toLowerCase().startsWith(query)
        )
    },[itemsCtx.items,searchTerm])

    return <>
           <div>
            <Navbar
                toggleModal={toggleModal}
                toggleModalSell={toggleModalSell}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <Login toggleModal={toggleModal} status={openModal}/>
            <Sell setItems={(itemsCtx).setItems} toggleModalSell={toggleModalSell} status={openModalSell}/>
            <Card
                items={filteredItems}
                emptyMessage={searchTerm ? `No products start with “${searchTerm}”.` : "No products found."}
            />
           </div>
           </>
}

export default Home
