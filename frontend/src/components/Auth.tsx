import { SignupInput } from '@krishna_rati/medium-common'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'Axios'
import { BACKEND_URL } from '../config'

export const Auth = ({type}: {type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
    })

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem('token', jwt);
            navigate('/blogs');
        } catch (e) {
            
        }
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        <div>
            <div className='px-18'>
                <h1 className='text-3xl font-extrabold'>Create an account</h1>
                <p className='text-slate-400 font-medium mt-2'>{type === "signin" ? "Don't have an account?" : "Already have an account?"} 
                    <Link to={type === "signin" ? "/signin": "/signup"} className='underline pl-2'>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link> 
                </p>
            </div>
            <div>
                {type === "signup" ? 
                    <LabelledInput label='Name' placeholder='Rati Krishna...' onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value,
                        })
                    }} /> : null
                }

                <LabelledInput label='Username' placeholder='mratikrishna@gmail.com' onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        username: e.target.value,
                    })
                }} />

                <LabelledInput label='Password' type={'password'} placeholder='!12@789QA' onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value,
                    })
                }} />

                <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    </div>
  )
}

interface LabelledInputProps {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputProps): React.ReactElement {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-black pt-4">{label}</label>
            <input 
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold" 
                placeholder={placeholder} 
                required 
            />
        </div>
    )
}