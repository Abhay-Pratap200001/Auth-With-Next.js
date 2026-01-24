'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


const LoginPage = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    email:'', password:'',
  })

  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLoginup =  async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      toast.success('User login successfully')
      console.log('login success', response.data);
      setLoading(false)
      router.push('/profile')
    } catch (error:any) {
      console.log('error', error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (user.email.length > 0 && user.password.length > 0  ) {
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'login'}</h1>
       <label htmlFor="username">email</label>
      <input type="text" id="email" value={user.email}
      onChange={(e) => setUser({...user, email:e.target.value})}
      placeholder='email'
      className='p-2 border bg-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-400 text-black'/>

       <label htmlFor="username">password</label>
      <input type="text" id="password" value={user.password}
      onChange={(e) => setUser({...user, password:e.target.value})}
      placeholder='password'
      className='p-2 border bg-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-400 text-black'/>

      <button onClick={onLoginup} className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'>
        {buttonDisable ? 'please wait' : 'Submit'}
      </button>
      <Link href='/signup'>Visit signup</Link>
    </div>
  )
}

export default LoginPage