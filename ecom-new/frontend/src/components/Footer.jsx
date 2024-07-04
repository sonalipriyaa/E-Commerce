import React from 'react'
import footer from '../assets/footer.jpg'
import { Link } from 'react-router-dom'
import FOOTER_LINKS from "../assets/footer_links"
import FOOTER_CONTACT_INFO from "../assets/footer_contact"
import SOCIALS from "../assets/socials"
const Footer = () => {
  return (
   <footer className='flexCenter pb-24 pt-20'>
    <div className='max-padd-container flex w-full flex-col gap-14'>
      <div className='flex flex-col items-start justify-center gap-[10%] md:flex-row'>
        <div className='max-w-72'>
        <Link to={"/"} className='mb-10 bold-20 text-gre'><span className='bold-28 text-gre'>E</span>comm</Link>
        <div className='mb-8'>
          <p className='mt-3'>"Stay connected with us for exclusive offers, sustainable updates, and fashion inspiration. Elevate your style while making a positive impact on the planet. Thank you for choosing eco-friendly shopping with us!"</p>
          <img src={footer} alt="" className='rounded-md mt-6 w-44 shadow-md'/>
        </div>
        </div>
       <div className='flex flex-wrap gap-8 sm:justify-between md:flex-1'>{FOOTER_LINKS.map((col)=>(
        <FooterColumn title={col.title} key={col.title}>
          <ul className='flex flex-col gap-4 regular-14 text-gray-20'>
            {col.links.map((link)=>(
              <Link to={'/'} key={link}>{link}</Link>
            ))}
          </ul>
        </FooterColumn>
       ))} 
       <div className='flex flex-col gap-5'>
        <FooterColumn title={FOOTER_CONTACT_INFO.title}>
          {FOOTER_CONTACT_INFO.links.map((link)=>(
            <Link to={'/'} key={link.value} className='flex gap-4 md:flex:col lg:flex-row'>
              <p>{link.label}:</p><p className='medium-14'>{link.value}</p>
            </Link>
          ))}
        </FooterColumn>
       </div>
       <div className='flex'>
        <FooterColumn>
          <ul className='flex gap-4'>
            {SOCIALS.links.map((link)=>(
              <Link to={'/'} key={link}>
                <img src={link} alt='socialIcon' height={22} width={22} />
              </Link>
            ))}
          </ul>
        </FooterColumn>
       </div>
       </div>
      </div>
      <div className='border bg-gray-20'></div>
      <p className='text-center regular-14 text-gray-30'>2024 Ecomm | All rights reserved</p>
    </div>
   </footer>
  )
}

const FooterColumn = ({ title, children}) =>{
  return (
    <div className='flex flex-col gap-5'>
      <h4 className='bold-18 whitespace-nowrap'>{title}</h4>
      {children}
    </div>
  )
}

export default Footer
