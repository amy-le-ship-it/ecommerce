import React, { use, useContext, useEffect, useState } from 'react'
import { DataContext } from "../context/DataContext"
import FilterSection from '../components/FilterSection'
import ProductCard from '../components/ProductCard'
import Loading from "../assets/Loading4.webm"
import Pagination from "../components/Pagination"
import Lottie from 'lottie-react'
import notfound from "../assets/notfound.json"

const Products = () => {

  const { data, fetchAllProducts } = useContext(DataContext)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [page, setPage] = useState(1)


  useEffect(() => {
    fetchAllProducts()
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
  }

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]
  )

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0, 0)
  }

  const dynamicPage = Math.ceil(filteredData?.length / 8)
  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      {
        data?.length > 0 ? (
          <div className="flex gap-8">
            <FilterSection priceRange={priceRange} setPriceRange={setPriceRange} search={search} setSearch={setSearch} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} />
            {
              filteredData?.length > 0 ? (
                <div className='flex flex-col justify-center items-center'>
                  <div className='grid grid-cols-2 gap-2 md:gap-7 mt-10 md:grid-cols-4'>
                    {
                      filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                        return <ProductCard key={index} product={product} />
                      })
                    }
                  </div>
                  <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                </div>
              ) : (
                <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                  <Lottie animationData={notfound} classID='w-[500px]' />
                </div>
              )}
          </div>
        ) : (
          <div className='flex items-center justify-center h-[400px]'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )
      }
    </div>
    )
  }

export default Products

