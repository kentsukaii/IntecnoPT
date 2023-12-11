import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Form, Button, Col, Row } from "react-bootstrap";
import { auth, firestore } from "../firebase";
import { getUserData } from "./BackendFiles/Backend";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const usersCollection = collection(firestore, "Users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Auth state changed:", user);
        try {
          const additionalData = await getUserData();
          console.log("User data from Firestore:", additionalData);

          setUser((prevUser) => ({
            ...prevUser,
            ...user,
            additionalData: prevUser
              ? { ...prevUser.additionalData, ...additionalData }
              : additionalData,
          }));
          setDateOfBirth(additionalData.dateOfBirth); // Add this line
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSave = async () => {
    console.log("Saving user data...");
    try {
      // Update the user's profile in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        email: email,
      });

      console.log("Firebase Auth profile updated successfully");

      // Update the user's document in Firestore
      const userDocRef = doc(firestore, "Users", auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // If the document exists, update it
        await updateDoc(userDocRef, {
          Name: `${firstName} ${lastName}`,
          Email: email,
          DateOfBirth: dateOfBirth,
        });

        console.log("Firestore document updated successfully");
      } else {
        // If the document does not exist, create it
        await setDoc(userDocRef, {
          Name: `${firstName} ${lastName}`,
          Email: email,
          DateOfBirth: dateOfBirth,
        });

        console.log("Firestore document created successfully");
      }

      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowModal = () => {
    setIsOpen(!isOpen);
  };


return (
  <>
    {/* First Container (My Account Information) */}
    <div className="container p-0 mt-4 h-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 ">
        <div className="col-xs-12 col-md-12 col-lg-12 p-4 bg-light text-dark">
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <h2><strong>My Account Information</strong></h2>
            <div className="row mb-2">
              <Form className="w-100">
                <Row className="g-3">
                  <Col>
                    <Form.Group controlId="formFirstName" className="mt-4">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Jonh"
                        style={{
                          backgroundColor: "#e0e0e0",
                          width: "100%",
                          minWidth: "18vw",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formLastName" className="mt-4">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Smith"
                        style={{
                          backgroundColor: "#e0e0e0",
                          width: "100%",
                          minWidth: "18vw",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col>
                    <Form.Group controlId="formEmail" className="mt-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="jonhsmith123@example.com"
                        style={{
                          backgroundColor: "#e0e0e0",
                          width: "100%",
                          minWidth: "18vw",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formDOB" className="mt-4">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="dd/mm/yyyy"
                        style={{
                          backgroundColor: "#e0e0e0",
                          width: "100%",
                          minWidth: "18vw",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-3 justify-content-center">
                  <Col md={6}>
                    <Form.Group controlId="formCurrentPassword" className="mt-5 mb-1">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="••••••••••"
                        style={{
                          backgroundColor: "#e0e0e0",
                          width: "100%",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-4">
                  Save
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="container p-0 mt-4 mb-4 h-100 d-flex justify-content-center align-items-center">
        <div className="row w-100 ">
          <div className="col-xs-12 col-md-12 col-lg-12 p-4 bg-light text-dark">
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              <h2>
                <strong>Change Password</strong>
              </h2>
              <div className="row mb-2">
                <Form className="w-100">
                  <Row className="g-3">
                    <Col>
                      <Form.Group
                        controlId="formCurrentPassword2"
                        className="mt-4"
                      >
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="••••••••••"
                          style={{
                            backgroundColor: "#e0e0e0",
                            width: "100%",
                            minWidth: "18vw",
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row className="g-3">
                    <Col>
                      <Form.Group controlId="formNewPassword" className="mt-4">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="••••••••••"
                          style={{
                            backgroundColor: "#e0e0e0",
                            width: "100%",
                            minWidth: "18vw",
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId="formConfirmNewPassword"
                        className="mt-4"
                      >
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="••••••••••"
                          style={{
                            backgroundColor: "#e0e0e0",
                            width: "100%",
                            minWidth: "18vw",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-5">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-0 mt-4 mb-4 h-100 d-flex justify-content-center align-items-center">
        <div className="row w-100 ">
          <div className="col-xs-12 col-md-12 col-lg-12 p-4 bg-light text-dark">
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              <h2>
                <strong>Delivery and Billing Addresses</strong>
              </h2>
              <div className="row mb-2">
                <Form className="w-100">
                  <Row className="g-3">
                    <Col>{/*Ponham o AdressCard aqui*/}</Col>
                    <Col></Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
