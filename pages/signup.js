import React, { useRef} from 'react'
import Link from "next/link"
import { supabase} from "../supabaseClient"
import { useRouter } from 'next/router'

const signup = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const router = useRouter()

    async function handleSubmit (e) {
        e.preventDefault()
        try{
            const { user, session, error } = await supabase.auth.signUp(
                {
                  email: emailRef.current.value,
                  password: passwordRef.current.value,
                },{
                  data: { first_name: nameRef.current.value}
                }
              )
            if (user) {
                alert("You've successfully created an account!")
                router.push("/")
            }
            
        } catch(err) {
            alert(err)     
        } 
        emailRef.current.value=""
        nameRef.current.value=""
        passwordRef.current.value=""
    }
    return (
        <div className="w-full h-screen bg-gray-700 flex flex-col items-center justify-center">

            <h1 className="text-2xl text-gray-200 mb-4">Welcome</h1>
            <form 
            className="w-1/3 border border-gray-400 p-4 shadow-lg flex flex-col" 
            method="POST"
            onSubmit={handleSubmit}
            >
                <label htmlFor="name" className="text-gray-200"> Name</label>
                <input 
                type="text" 
                name="name" 
                className="border-none outline-none mb-4 h-10 p-3 bg-gray-200 rounded"
                ref={nameRef}
                required
                />

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
                className="bg-gray-500 p-3 text-gray-50 mb-3 rounded border-none outline-none"> SIGN UP</button>

                <p className="text-center text-gray-300 my-3"> OR</p>
                <p className="text-gray-400 text-center">Do you have an existing account? <Link href="/">
                    <a  className=" text-gray-100 p-3 rounded border-none outline-none text-center"> click here </a>
                </Link></p>
                
                
            </form>
            
        </div>
    )
}

export default signup;
