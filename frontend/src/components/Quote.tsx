import React from 'react'

const Quote = () => {
  return (
    <div className='bg-slate-200 h-screen flex items-center justify-center'>
      <div className='max-w-lg'>
        <div className='text-3xl font-bold'>
          "The customer support I received was exceptional, the support team went above and beyond to address my concerns"
        </div>
        <div className='max-w-md text-xl font-semibold mt-4'>
          Julies Winfield
        </div>
        <div className='max-w-md text-sm text-slate-400 font-light'>
          CEO | Acme corp
        </div>
      </div>
    </div>
  )
}

export default Quote