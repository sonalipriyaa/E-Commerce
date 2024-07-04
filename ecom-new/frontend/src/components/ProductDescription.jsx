import React from 'react'

const ProductDescription = () => {
  return (
    <div className='mt-12'>
      <div className='flex gap-3 mb-4'>
        <button className='btn-dark rounded-full !text-xs !py-[6px] w-36'>Description</button>
        <button className='btn-white rounded-full !text-xs !py-[6px] w-36'>Care Guide</button>
        <button className='btn-white rounded-full !text-xs !py-[6px] w-36'>Size Guide</button>
      </div>
      <div>
        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae aliquid quis amet sint tenetur repellat magni cupiditate eum voluptatem! Nisi aperiam, suscipit labore praesentium optio molestias ut corporis enim vero?</p>
        <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore quaerat a laborum voluptates dignissimos in, totam eos quae aliquid maxime velit. Dignissimos, molestiae! Recusandae temporibus veritatis nesciunt consequuntur itaque non.</p>
      </div>
    </div>
  )
}

export default ProductDescription
