import React, { useContext, useState } from 'react'
import Navbar from "./Navbar";
import { Link, NavLink } from 'react-router-dom';
import log from "../assets/log.svg.png";
import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import {MdMenu, MdClose} from "react-icons/md";
import {FaOpencart} from "react-icons/fa";
import { ShopContext } from '../context/ShopContext';
const Header = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const toggleMenu = ()=> setmenuOpened(!menuOpened);
  const {getTotalCartItems} = useContext(ShopContext);

  return (
    <header className='max-padd-container w-full z-50'>
      <div className='flexBetween py-2'>
        {/* navbar dekstop */}
        <div className='hidden xl:flex flex-1 z-50'>
        <Navbar containerStyles={"hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 ring-1 ring-slate-900/10 rounded-full px-2 py-1"}/>
        </div>
      {/* navbar mobile */}
      <div>
        <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-8 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50" : "flex items-start flex-col gap-y-8 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"}`}/>
      </div>
       {/* logo */}
       <div className='flex flex-1'>
            <div className=' bg-white flexCenter h-24 w-44 px-2 absolute top-0 rounded-full'>
               <Link to={'/'}><img src={log} alt='' height={166} width={188}/></Link>
            </div>
       </div>
       {/* buttons */}
       <div className='flexBetween sm:gap-x-2 bold-16'>
        {!menuOpened ? (
        <MdMenu className='xl-hidden cursor-pointer ring-1 ring-slate-900/10 hover:text-secondary mr-2 p-2 h-10 w-10 rounded-full' onClick={toggleMenu}
        />
        ) : (
        <MdClose className='xl-hidden cursor-pointer ring-1 ring-slate-900/10 hover:text-secondary mr-2 p-2 h-10 w-10 rounded-full' onClick={toggleMenu} 
        />)}
        <div className='flexBetween sm:gap-x-6'>
            <NavLink to={"cart-page"} className={"flex"}>
              <FaOpencart className='p-2 h-10 w-10 ring-1 ring-slate-900/10 rounded-full hover:text-secondary'/>
              <span className='relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2'>{getTotalCartItems()}</span>
            </NavLink>
         {localStorage.getItem('auth-token') ?  <NavLink onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}} to={'logout'} className={"btn-secondary flexCenter gap-x-2 medium-16 rounded-full"}><img src={logout} alt='logoutIcon' height={19} width={19} />Logout</NavLink>:
            <NavLink to={'login'} className={"btn-secondary flexCenter gap-x-2 medium-16 rounded-full"}><img src={user} alt='logoutIcon' height={19} width={19} />Login</NavLink>}
        </div>
       </div>

</div>
    </header>
  )
}

export default Header
