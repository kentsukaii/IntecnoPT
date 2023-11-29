import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBadge } from 'mdbreact';

const AddressCard = () => {
  return (
    <MDBContainer className="p-3 border rounded" style={{ width: "22rem", marginTop: "1rem", position: "relative", backgroundColor: "#f8f9fa" }}>
      <input type="radio" className="position-absolute" style={{ right: "1rem", top: "1rem" }} />
      <MDBRow>
        <MDBCol className="text-left">
          <h5>First Name</h5>
          <p>Address</p>
          <p>Region, Postal Code</p>
          <p>PT</p>
          <p>Phone Number</p>
          <p>NIF</p>
          <hr />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <div className="mb-2">
              <MDBBadge color="light" className="p-2">Morada de Entrega Pré-definida</MDBBadge>
            </div>
            <div className="mb-2">
              <MDBBadge color="light" className="p-2">Morada de Faturação Pré-definida</MDBBadge>
            </div>
          </div>
          <MDBBtn color="secondary" className="p-2 position-absolute" style={{ borderRadius: "50%", right: "1rem", bottom: "1rem" }}>
            <i className="fas fa-pencil-alt"></i>
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddressCard;
