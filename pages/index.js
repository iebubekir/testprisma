import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
const prisma = new PrismaClient()
export default function Home({ data }) {
  const [formData, setFormData] = useState({})
  async function saveMovie (e) {
    e.preventDefault()
    console.log(formData)
    const response = await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    return await response.json();
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
   
     {   <ul>
          {data && data.map(item => (
            <li key={ item.id}>{ item.title}</li>
          ))}
        </ul>
}
        <form onSubmit={saveMovie}>
          <input type="text" placeholder='title' name='title' onChange={e => setFormData({...formData,title:e.target.value})}/>
          <input type="text" placeholder='year' name='year' onChange={e => setFormData({...formData,year:+e.target.value})}/>
          <input type="text" placeholder='description' id='' onChange={e => setFormData({...formData,description:e.target.value})}/>
          <input type="text" placeholder='slug' name='slug' onChange={e => setFormData({...formData,slug:e.target.value})}/>
          <button type='submit'>Add movie</button>
        </form>
 
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const movies = await prisma.movie.findMany()
  
 
  return {
    props: {
       data : movies
    }
  }
}
