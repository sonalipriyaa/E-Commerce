import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {TbTable, TbTrash} from "react-icons/tb"
const CartItems = () => {
    const {all_products,cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);
  return (
    <section className='max-padd-container'>
        <div className='pt-24 bg-primary rounded-3xl'>
            <table className='w-full mx-auto'>
                <thead className=''>
                    <tr className='bg-tertiary/90 text-white regular-16 sm:regular-18 text-start py-12'>
                        <th className='p-1 py-2'>Products</th>
                        <th className='p-1 py-2'>title</th>
                        <th className='p-1 py-2'>Price</th>
                        <th className='p-1 py-2'>Quantity</th>
                        <th className='p-1 py-2'>Total</th>
                        <th className='p-1 py-2'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {all_products.map((e)=>{
                        if (cartItems[e.id]>0){
                            return <tr key={e.id} className='border-b border-slate-900/20 text-gray-30 p-6 medium-14 text-center'>
                                <td className='flexCenter'><img src={e.image} alt="prdctImg" height={43} width={43} className='rounded-lg ring-1 ring-slate-900/5 my-1' /></td>
                                <td><div className='line-clamp-3'>{e.name}</div></td>
                                <td>Rs {e.new_price}</td>
                                <td className='h-16 w-16 bg-white'>{cartItems[e.id]}</td>
                                <td>Rs {e.new_price * cartItems[e.id]}</td>
                                <td><div className='bold-22 relative lef-1/2'><TbTrash onClick={()=>removeFromCart(e.id)} /></div></td>
                            </tr>
                        }
                        return null;
                    })}
                </tbody>

            </table>
            {/* cart details */}
            <div className='flex flex-col justify-between gap-y-16 my-16 p-8 md:flex-row rounded-md w-full max-w-[777px]'>
                <div className='flex flex-col gap-8'>
                    <h4 className='bold-20'>Summary</h4>
                    <div>
                        <div className='flexBetween py-4'>
                            <h4 className='medium-16'>Subtotal:</h4>
                            <h4 className='text-gray-30 font-semibold'>Rs {getTotalCartAmount()}</h4>
                        </div>
                        <hr />
                        <div className='flexBetween py-4'>
                            <h4 className='medium-16'>Shipping Fee:</h4>
                            <h4 className='text-gray-30 font-semibold'>Free</h4>
                        </div>
                        <hr />
                        <div className='flexBetween py-4'>
                            <h4 className='bold-18'>Total:</h4>
                            <h4 className='text-gray-30 font-semibold'>Rs {getTotalCartAmount()}</h4>
                        </div>
                    </div>
                    <button className='btn-dark w-44 rounded-full'>Checkout</button>
                </div>
                <div className='flex flex-col gap-10'>
                    <h4 className='bold-20 capitalize'>Your coupon code enter here:</h4>
                    <div className='flexBetween pl-5 h-12 bg-white rounded-full ring-1 ring-slate-900/10 w-full max-w-[366px]'>
                        <input type='text' placeholder='Coupon code' className='bg-transparent'/>
                        <button className='btn-dark rounded-full relative right-1'>Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default CartItems
