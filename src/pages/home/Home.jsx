import React from 'react'
import './Home.scss'
import HeroBanner from './herobanner/HeroBanner'
import Tranding from './tranding/Tranding'
import Popular from './popular/Popular'
import TopRated from './toprated/TopRated'
const home = () => {
  return (
    <div className='home-page'>
        <HeroBanner/>
        <Tranding/>
        <Popular/>
        <TopRated/>
    </div>
  )
}

export default home;