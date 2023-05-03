import React, { useEffect, useState } from "react";
import {Navbar,Container,Form,Button,Nav,NavDropdown,FormControl} from "react-bootstrap"
import {Link} from 'react-router-dom'
// import MovieListCard from './MovieListCard'
import '../CSS/Navb.css'
import { useSelector,useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate } from "react-router-dom"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navb = ({navSearch}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const{searchTitleList}=useSelector((state)=>state.movies)
  console.log(searchTitleList)
  const [keyword,setKeyword]=useState('')

 const keywordHandler=(e)=>{
  const key = e.target.value;
  console.log(key)
  setKeyword(key)
 }

const search=async(e)=>{
  e.preventDefault();
  console.log('hello')
  navigate(`/movies/?query=${keyword}`)
  

}



//   useEffect(() => {
//  search()
  
  
//   }, []);



  
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
    <Container fluid>
      <Navbar.Brand href="#"><img width={100} src='https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png'/></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link to='/' href="#action1" className='Navb-Home'>Home</Link>
          <Link to='/movies' href="#action2" className='Navb-Movies'>Movies</Link>
         
        </Nav>
        <Form className={navSearch?"d-flex":"hide"} >
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={keywordHandler}
          />
          <Button variant="outline-danger" onClick={(e)=>search(e)}> <FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navb