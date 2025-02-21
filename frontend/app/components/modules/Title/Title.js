import React from 'react'

export default function Title({title}) {
  return (
    <h1 className='text-2xl md:text-4xl font-bold mb-10'>
        {title}
        <hr className='border-t-2 border-primary mt-2'/>
    </h1>
  )
}
