import { link } from 'fs'
import Link from 'next/link'
import React from 'react'



export default function Nav() {

    const nav = [
        {
            Title : "Home",
            Route : '/'
        },
        {
            Title : "Tags",
            Route : '/recipes/tags'
        },
    ]


  return (
    <div className='w-screen py-4 border-b flex justify-around'>
        <h1 className='text-xl'>My Recipes</h1>
        <ul className='flex gap-2 h-full items-center'>
            {nav.map((item,index) => (
                <li key={index}><Link className='text-black hover:bg-gray-600 hover:text-white p-2' href={item.Route}>{item.Title}</Link></li>
            ))}
        </ul>
    </div>
  )
}
