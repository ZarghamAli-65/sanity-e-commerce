import React from 'react'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export default async function page () {

  const products = await client.fetch(groq`*[_type == "product"]`)
  console.log(products)
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}


