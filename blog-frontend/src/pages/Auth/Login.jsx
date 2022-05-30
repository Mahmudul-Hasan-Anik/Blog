import React from 'react'
import { useState } from 'react'
import { Form,Button,Container } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if( !email || !password ){
            toast.error('Please fill all input box')
         }else if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
             toast.error('Email not Valid')
         }else if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
             toast.error('Password not valid')
         }else{
             
            await axios.post('http://localhost:8000/auth/login',{
                email: email,
                password: password
            }).then((data)=>{
                localStorage.setItem('user', JSON.stringify(data.data))
                navigate('/')
                toast.success('Login succes')
            }).catch((err)=>{
                toast.error(err)
            })
         }
    }

  return (
    <Container className='from_design'>
     <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="secondary" type="submit" className='mb-3' onClick={handleSubmit}>
            Login
        </Button>

        <Form.Text className="text-muted">
            Create an account? <Link to='/registration'>Registration</Link>
        </Form.Text>
    </Form>
    </Container>
  )
}

export default Login