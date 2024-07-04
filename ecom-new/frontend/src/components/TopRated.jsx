import React from 'react'
import ctgBanner from "../assets/ctg-banner.jpg"
import men from '../assets/men.png'
import women from '../assets/women.png'
import kid from '../assets/kid.png'
import { Link } from 'react-router-dom'

const TopRated = () => {
  return (
    <section className='max-padd-container py-14 xl:py-24'>
        <div className='grid gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            <div className='ring-1 ring-slate-900/5 rounded-3xl overflow-hidden shadow-sm'>
                <div><img src={ctgBanner} alt="ctg Banner" /></div>
            </div>
            <div>
                <div className='ring-1 ring-slate-900/5 rounded-3xl bg-secondaryBlue text-white'><img src={men} alt='' className='rounded-3xl'/></div>
                <div className='px-5'>
                    <h4 className='medium-18 mt-4'>Top Rated Men Collection</h4>
                    <p className='my-2'>Discover sophistication and style with our top-rated men's collection. From tailored suits to casual essentials, each piece is crafted with precision and designed to elevate your wardrobe. Embrace timeless classics and contemporary trends while supporting sustainable practices. Explore our curated selection of eco-friendly materials and ethical brands, and redefine your sense of style with confidence</p>
                    <Link to={'/mens'} className='bold-15 text-secondary'>View more</Link>
                </div>
            </div>
            <div>
            <div className='ring-1 ring-slate-900/5 rounded-3xl bg-secondaryRed text-white'><img src={women} alt='' className='rounded-3xl'/></div>
                <div className='px-5'>
                    <h4 className='medium-18 mt-4'>Top Rated Women Collection</h4>
                    <p className='my-2'>Indulge in elegance and versatility with our top-rated women's collection. From chic dresses to effortless athleisure wear, each garment is thoughtfully designed to empower your everyday look. Dive into a world of fashion-forward designs and sustainable fabrics, curated to celebrate every body type and style preference. Explore our range of sizes and colors.</p>
                    <Link to={'/mens'} className='bold-15 text-secondary'>View more</Link>
                </div>
            </div>
            <div>
            <div className='ring-1 ring-slate-900/5 rounded-3xl bg-secondaryGreen text-white'><img src={kid} alt='' className='rounded-3xl'/></div>
                <div className='px-5'>
                    <h4 className='medium-18 mt-4'>Top Rated Kid's Collection</h4><p>Playtime meets practicality with our top-rated kids' collection. From adorable onesies to durable outerwear, each piece is crafted with comfort and safety in mind. Let your little ones explore in style with our playful designs and eco-friendly materials. Discover a world of imagination and creativity, where every garment is designed to withstand the adventures of childhood while nurturing a sustainable future.</p>
                    <Link to={'/mens'} className='bold-15 text-secondary'>View more</Link>
                </div>
            </div>
            </div>
            
        
    </section>
  )
}

export default TopRated
