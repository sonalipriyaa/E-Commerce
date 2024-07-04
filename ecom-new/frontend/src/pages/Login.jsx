import React, { useState } from 'react'

const Login = () => {
  const [state,setState] = useState('Login')
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })
  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  const login = async ()=> {
    console.log("login button clicked",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers: {
        Accept: 'application/formData',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=> responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }
  const signup = async ()=>{
    console.log("signup button clicked",formData)
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers: {
        Accept: 'application/formData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=> responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }
  return (
    <section className='max-padd-container flexCenter flec-col pt-32 bg-primary'>
      <div className='w-full max-w-[666px] h-[600px] bg-primary m-auto px-14 py-10 rounded-md'>
        <h3 className='h3'>{state}</h3>
        <div className='flex flex-col gap-4 mt-7'>
        { state === "Sign Up" ? <input name='username' value={FormData.username} onChange={changeHandler} type='text' placeholder='Your Name' className='h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm' /> : ""}
          <input name='email' value={FormData.email} onChange={changeHandler} type='email' placeholder='Your Email Address' className='h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm' />
          <input name='password' value={FormData.password} onChange={changeHandler} type='password' placeholder='Your Password' className='h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm' />
        </div>
        <button onClick={()=> {state === "Login"?login():signup()}} className='btn-dark rounded-xl my-5 !py-1'>
          Continue
        </button>

        {state === "Sign Up" ? <p className='text-tertiary font-bold'>Already have an account?<span onClick={() => { setState("Login")}} className='text-secondary underline cursor-pointer'>Login</span></p> : <p className='text-tertiary font-bold'>Create an account? <span onClick={()=> {setState("Sign Up")}} className='text-secondary underline cursor-pointer'>Click here</span></p>}
      <div className='flesStart mt-6 gap-3'>
        <input type="checkbox" name='' id='' />
        <p>By continuing, i agree to the terms of use and privacy pilicy.</p>
      </div>
      </div>
    </section>
  )
}

export default Login
