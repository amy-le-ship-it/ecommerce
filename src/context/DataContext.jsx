import { createContext, useState } from "react";
import axios from "axios"

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [data, setData] = useState([])


    const fetchAllProducts = async () => {
        try {
            const res = await axios.get('https://fakestoreapi.com/products?limit=150')
            setData(res.data)
        } catch (error){
            console.log(error)
        }
    }
    const getUniqueCategory = (data, property) =>{
        let newVal = data?.map((curElem) =>{
            return curElem[property]
        })
        newVal = ["All",...new Set(newVal)]
        return newVal
      }
    
    const categoryOnlyData = getUniqueCategory(data, "category")

    return <DataContext.Provider value={{data, fetchAllProducts, categoryOnlyData}}>
        {children}
    </DataContext.Provider>
}