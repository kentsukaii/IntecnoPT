import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';

const App = () => {
  return (
<MDBCard className="p-3 border rounded" style={{ width: "22rem", marginTop: "1rem", backgroundColor: "#f8f9fa" }}>
      <MDBCardImage className="img-fluid" src="https://via.placeholder.com/400" waves />
      <MDBCardBody>
        <MDBCardTitle>Product Title</MDBCardTitle>
        <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
        <MDBBtn href="#">MDBBtn</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

export default App;
