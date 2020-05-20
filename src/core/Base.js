import React , {useState} from "react";
import Menu from "./Menu";
import {Modal,Button,Row,Col} from 'react-bootstrap'
const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto pt-5">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you have any questions feel free to react Out</h4>
          <button className="btn btn-warning btn-lg" onClick={handleShow}>Contact US</button>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col md={6}>
             <a href="https://github.com/singhbir?tab=repositories" className="text-dark btn"  target="blank"><i class="fa fa-github fa-5x"><h3>Github</h3></i></a>
            
            </Col>
            <Col md={6}>
            <a href="https://www.linkedin.com/in/birvarindersingh" className="text-dark btn"  target="blank"><i class="fa fa-linkedin fa-5x"><h3>Linked In</h3></i></a>
            </Col>
        </Row> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


        <div className="container">
          <span className="text-muted">
            An Amazing <span className="text-white">TSHIRTS</span> Store
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
