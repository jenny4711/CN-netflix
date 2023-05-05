import React, { useState,useEffect } from "react";
import { Navbar, Container, Form, Button, Nav ,NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../CSS/Navb.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navb = ({ navSearch,setLang,lang}) => {
 
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const changeLang=(e)=> setLang((lang)=>lang===`ko-KR`? `en-US`:`ko-KR`)
  
  useEffect(()=>{
changeLang()
  },[setLang])
 
  const keywordHandler = (e) => {
    const key = e.target.value;

    setKeyword(key);
  };

  const search = async (e) => {
    e.preventDefault();
    console.log("hello");
    navigate(`/movies/?query=${keyword}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
     
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            width={100}
            src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png"
          />
        </Navbar.Brand>
      
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
        <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li" className='Navb-langbtn'>
    
        <Nav.Link onClick={(e)=>changeLang(e)} href="#action1" className="Navb-lang">
        {lang === `ko-KR`?'KO':'US'}
        </Nav.Link>
         
            </Nav.Item>
            <Nav.Item as="li">
            <Link to="/" href="#action2" className="Navb-Home">
              Home
            </Link>
            </Nav.Item>
            <Nav.Item as="li">
            <Link to="/movies" href="#action3" className="Navb-Movies">
              Movies
            </Link>
            </Nav.Item>
           
          
          </Nav>
        
          <Form className={navSearch ? "d-flex" : "hide"}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 Navb-input"
              aria-label="Search"
              onChange={keywordHandler}
            />
            <Button variant="outline-danger" onClick={(e) => search(e)}>
              {" "}
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
           
          </Form>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navb;
