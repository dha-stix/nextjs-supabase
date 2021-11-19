import React, {useRef} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '../supabaseClient'

export default function Home() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const router = useRouter()

    async function handleSignIn (e) {
      e.preventDefault()
      try{
        const { user, session, error } = await supabase.auth.signIn({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        if(user) {
          router.push("/dashboard")
          alert("Login successful!")
        }
        else {
          alert("Authentication Failed")
        }

      }catch(err) {
        alert("Authentication Failed")
      }
      emailRef.current.value=""
      passwordRef.current.value=""
  }

  return (
    <div className="w-full h-screen bg-gray-700 flex flex-col items-center justify-center">
            <h1 className="text-2xl text-gray-200 mb-4">Log in to your account</h1>
            <form 
            className="w-1/3 border border-gray-400 p-4 shadow-lg flex flex-col"
            onSubmit={handleSignIn}
            >
                <label htmlFor="email" className="text-gray-200"> Email</label>
                <input 
                type="email" 
                name="email" 
                className="border-none outline-none mb-4 h-10 p-3 bg-gray-200 rounded"
                ref={emailRef}
                required
                />

                <label htmlFor="password" className="text-gray-200">Password</label>
                <input 
                type="password" 
                name="password" 
                className="border-none outline-none border mb-5 h-10 p-3 bg-gray-200 rounded"
                ref={passwordRef}
                required
                />

                <button 
                type="submit" 
                className="bg-green-500 mt-7 text-gray-100 p-3 rounded border-none outline-none">LOG IN</button>

                <p className="text-center text-gray-300 my-3"> OR</p>

                
                <p className= "text-center text-gray-300">Create an account {" "} 
                
                   {/* Redirects user to the sign up page */}
                <Link href="/signup">
                    <a className="text-green-500">here</a>
                </Link>
                 </p>

                {/* <button className="text-gray-200 p-4 bg-gray-400 my-4">Sign in with Google</button> */}
            </form>
            
        </div>
  )
}
