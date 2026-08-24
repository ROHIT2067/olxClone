import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";

const context=createContext(null)
export const ItemsContext=()=>useContext(context)     

export const ItemsContextProvider=({children})=>{
    const [items,setItems]=useState(null)

    useEffect(()=>{
        const fetchItemsFromFireStore=async ()=>{
            try {
                const productsCollection=collection(fireStore,'products')
                const productSnapshot=await getDocs(productsCollection)
                const productsList=productSnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setItems(productsList)
            } catch (error) {
                console.log(error,"Error fetching product items")
            }
        }
        fetchItemsFromFireStore()
    },[])

    return (<>
            <context.Provider value={{items,setItems}}>
                {children}
            </context.Provider>
            </>)
}
