import React from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import Category from '../components/Category'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
        <Carousel/>
        <MidBanner/>
        <Features/>
        <Category/>
    </div>
  )
}

export default Home