import React from 'react'
import { useState } from 'react'
import { Form,Button,Container } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

const Registration = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confrom, setConfrom] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(!name || !email || !password || !confrom){
           toast.error('Please fill all input box')
        }else if(!name.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)){
            toast.error('Name not valid')
        }else if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            toast.error('Email not Valid')
        }else if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            toast.error('Password not valid')
        }else if(password !== confrom){
            toast.error('Password not matched')
        }else{
            toast.success('Registration succes')

            axios.post('http://localhost:8000/auth/registration',{
                name,
                email,
                password
            })
        }
    }

  return (
    <Container className='from_design'>
     <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Confrom Password</Form.Label>
            <Form.Control type="password" placeholder="Confrom Password" onChange={(e)=>setConfrom(e.target.value)} value={confrom}/>
        </Form.Group>
        <Button variant="secondary" type="submit" className='mb-3' onClick={handleSubmit}>
            Registration
        </Button>

        <Form.Text className="text-muted">
            Create an account? <Link to='/login'>Login</Link>
        </Form.Text>
    </Form>
    </Container>
  )
}

export default Registration