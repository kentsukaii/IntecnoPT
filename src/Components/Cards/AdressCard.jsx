import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { firestore } from "../../firebase"; // import your Firestore instance
import { editUserAddress,  deleteUserAddress, addUserAddress} from '../../REST_API/firebaseAPI';

const AddressCard = ({ userAddress, onRemove }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control the modal


    
  // Function to handle address addition
  const handleAdd = async () => {
    await addUserAddress(userAddress); // Add the address when the user confirms
    onRemove(); // Update the state of the parent component
    setShowModal(false); // Hide the modal
  }
  
  // Function to handle address edit
  const handleEdit = async (newUserAddress) => {
    await editUserAddress(userAddress, newUserAddress); // Edit the address when the user confirms
    onRemove(); // Update the state of the parent component
    setShowModal(false); // Hide the modal
  };
  // Function to handle address removal
  const handleRemove = async () => {
    await deleteUserAddress(userAddress); // Remove the address when the user confirms
    onRemove(); // Update the state of the parent component
    setShowModal(false); // Hide the modal
  }


  return (
    <Container className="p-3 border rounded" style={{ width: "22rem", marginTop: "1rem", position: "relative", backgroundColor: "#f8f9fa" }}>
      <input type="radio" className="position-absolute" style={{ right: "1rem", top: "1rem" }} />
      <Row>
        <Col className="text-left">
          <h5>{userAddress.firstName}</h5>
          <p>{userAddress.address}</p>
          <p>{userAddress.region}, {userAddress.postalCode}</p>
          <p>{userAddress.country}</p>
          <p>{userAddress.phoneNumber}</p>
          <p>{userAddress.nif}</p>
          <hr />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <div className="mb-2">
              <Badge variant="light" className="p-2">Morada de Entrega Pré-definida</Badge>
            </div>
            <div className="mb-2">
              <Badge variant="light" className="p-2">Morada de Faturação Pré-definida</Badge>
            </div>
          </div>
          <Button variant="secondary" className="p-2 position-absolute" style={{ borderRadius: "50%", right: "1rem", bottom: "1rem" }} onClick={handleEdit}>
            <i className="fas fa-pencil-alt"></i>
          </Button>
          <Button variant="danger" className="p-2 position-absolute" style={{ borderRadius: "50%", left: "1rem", bottom: "1rem" }} onClick={handleRemove}>
            <i className="fas fa-trash-alt"></i>
          </Button>
          <Button variant="danger" className="p-2 position-absolute" style={{ borderRadius: "50%", left: "1rem", bottom: "1rem" }} onClick={handleAdd}>
            <i className="fas fa-trash-alt"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddressCard;
