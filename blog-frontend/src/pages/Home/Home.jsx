import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Modal ,Button,Form,Container,Row,Col,Card} from 'react-bootstrap'

const Home = () => {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState('')
  const [para,setPara] = useState('')
  const [items, setItems] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const formData = new FormData()
    formData.append('image-file', file)
    formData.append('title', title)
    formData.append('para', para)

     await axios.post('http://localhost:8000/blogPost', formData)
    .then(()=>{
      setTitle('')
      setFile('')
      setPara('')
      setShow(false)
    })
  }

  useEffect(()=>{
    async function fatchData(){
      const {data} = await axios.get('/blog/data')
      setItems(data)
      console.log(data)
    }
    fatchData()
  },[])

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className='m-3'>
        POST A BLOG
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}> 
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)} name='title'/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={(e)=>setFile(e.target.files[0])} name='image-file'/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Content</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder='Your Content' onChange={(e)=>setPara(e.target.value)} name='para'/>
          </Form.Group>
          <Button variant="primary" type="submit" style={{width: '100%'}} onClick={handleSubmit}>
            Post
          </Button>
        </Form>
        </Modal.Body>
      </Modal>

    <Container>
      <Row md={3}>
      {items.map((item)=>(
        
        <Col md={3} className='blog_home-style'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
            <Card.Img variant="top" src={item.file} />
              <Card.Text>
              {item.para}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
      </Row>
    </Container>
      
    </div>
  )
}

export default Home




{/* <h2>{item.title}</h2>
          <img src= {item.file} alt="img" />
          <p>{item.para}</p> */}