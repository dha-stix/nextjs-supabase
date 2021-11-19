import { useRouter } from 'next/router'
import React, {useEffect} from 'react'
import { supabase } from '../supabaseClient'

const dashboard = () => {

    const router = useRouter()
    async function logOut () {
        try{
            const { error } = await supabase.auth.signOut()
            error ? alert("Error! Couldn't log you out") : router.push("/")
        } catch(err) {
            alert(err)
        }
    }
    useEffect(()=> {
        function redirect() {
            if(!supabase.auth.user()) {
                router.push("/")
            }
        }
        redirect()
    }, [])

    return (
        <div className="w-full h-screen bg-gray-700 flex flex-col items-center justify-center">
        {supabase.auth.user() && (
            <>
                <h2 className="text-gray-200 text-xl">
                Welcome, {" "}
                {supabase.auth.user().user_metadata.first_name}</h2>
                <button 
                type="submit" 
                className="bg-green-500 mt-7 text-gray-100 p-3 rounded border-none outline-none" 
                onClick={() => logOut()}>LOG OUT</button>
            </> 
        )        
        }   
      </div>
    )
}

export default dashboard
