import React, { useEffect, useState, useRef } from "react";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  

} from "firebase/firestore";
import { Form, Button, Col, Dropdown, Row } from "react-bootstrap";
import { auth, firestore } from "../firebase";
import { getUserData, useFirebaseLogin, ChangePicture} from "./BackendFiles/Backend";
import { InputGroup } from "react-bootstrap";
import { FaUser, FaEnvelope, FaCalendarAlt, FaLock, FaKey } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import AddressCard from '../Components/Cards/AdressCard';



const Profile = () => {
  const authInstance = getAuth();
  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(user ? user.email : "");
  const {handleDeleteAccount } = useFirebaseLogin();
  const {profilePicUrl,
    fileInputRef,
    handleProfilePicChange,
    handleProfilePicClick, } = ChangePicture();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser({
          displayName: "",
          email: "",
          additionalData: {
            dateOfbirth: "",
            firstName: "",
            lastName: "",
          },
        });
        setDateOfBirth("");
        setEmail("");
        return;
      }

      try {
        const additionalData = await getUserData();
        const displayName = additionalData?.displayName || user.displayName;
        const names = displayName.split(" ");
        const [firstName, ...lastNameParts] = names;
        const lastName = lastNameParts.join(" ");
        const email = user.email;

        setUser((prevUser) => ({
          ...prevUser,
          displayName,
          email: user.email,
          additionalData: {
            ...prevUser.additionalData,
            ...additionalData,
            firstName,
            lastName,
          },
        }));

        setDateOfBirth(additionalData?.dateOfBirth || "");
        setEmail(email);

        if (additionalData?.displayName) {
          setFirstName(firstName);
          setLastName(lastName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("No data");
        setUser((prevUser) => ({
          ...prevUser,
          displayName: user.displayName,
          email: user.email,
        }));
        setDateOfBirth("");
        setEmail("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSave = async () => {
    console.log("Saving user data...");

    try {
      const user = getAuth().currentUser;
      const currentEmail = user.email;
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age > 101 || age < 6) {
        console.error("You must be at least alive");
        setError("You must be at least alive");
        return;
      }

      // Update the user's profile in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        email,
      });

      console.log("Firebase Auth profile updated successfully");

      // Query for the user document where the email field matches the user's uid
      const q = query(
        collection(firestore, "Users"),
        where("email", "==", currentEmail)
      );

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Get the first document from the query result (assuming uid is unique)
      const userDocSnap = querySnapshot.docs[0];

      if (userDocSnap) {
        // If the document exists, update it
        await updateDoc(userDocSnap.ref, {
          displayName: `${firstName} ${lastName}`,
          email,
          dateOfBirth: dateOfBirth,
        });

        console.log("Firestore document updated successfully");
      } else {
        console.log("Firestore document does not exist, no changes made");
        setErrorMessage("Firestore document does not exist, no changes made");
      }

      console.log("User profile updated successfully");
      setError("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("Error updating user profile");
    }
  };




  const handlePasswordChange = async () => {
    try {
      const currentPassword = document.getElementById(
        "formCurrentPassword"
      ).value;
      const newPassword = document.getElementById("formNewPassword").value;
      const confirmNewPassword = document.getElementById(
        "formConfirmNewPassword"
      ).value;

      // Check if all fields are filled
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        setError("All fields are required");
        return;
      }

      // Check if the new password meets all requirements
      const passwordRequirements = [
        {
          test: (password) => password.length >= 12,
          message: "Password must be at least 12 characters long",
        },
        {
          test: (password) => /[A-Z]/.test(password),
          message: "Password must contain at least one uppercase letter",
        },
        {
          test: (password) => /[a-z]/.test(password),
          message: "Password must contain at least one lowercase letter",
        },
        {
          test: (password) => /[0-9]/.test(password),
          message: "Password must contain at least one number",
        },
        {
          test: (password) => /[^A-Za-z0-9]/.test(password),
          message: "Password must contain at least one special character",
        },
      ];

      for (let requirement of passwordRequirements) {
        if (!requirement.test(newPassword)) {
          setError(requirement.message);
          return;
        }
      }

      // Check if the new password and confirm new password fields match
      if (newPassword !== confirmNewPassword) {
        setError("New password and confirm new password fields do not match");
        return;
      }

      const user = auth.currentUser;

      // Check if the current password matches the user's password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, newPassword);
      console.log("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error.message);
    }
  };



  return (
    <>
      {/* First Container (My Account Information) */}
      <div className="container p-0 mt-4 h-100 d-flex justify-content-center align-items-center">
        <div className="row w-100 ">
          <div className="col-xs-12 col-md-12 col-lg-12 p-4 bg-light text-dark">
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              <h2>
                <strong>My Account Information</strong>
              </h2>
              <input type="file" ref={fileInputRef} onChange={handleProfilePicChange} style={{ display: 'none' }} />


              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                as="img"
                src={profilePicUrl}  // Use the profile picture URL state
                alt="menu icon"
                width="175"
                height="175"
                style={{ borderRadius: "50%", border: "2px solid #4eadfe" }}
                onClick={handleProfilePicClick}
              ></Dropdown.Toggle>


              <div className="row mb-2">
                <Form className="w-100">
                  <Row className="g-3">
                    <Col>
                      <Form.Group
                        controlId="formFirstName"
                        className="mt-4 position-relative"
                      >
                        <Form.Label>First Name</Form.Label>
                        <FaUser
                          className="position-absolute"
                          style={{
                            color: "#4eadfe",
                            left: "5px",
                            top: "72%",
                            transform: "translateY(-50%)",
                            fontSize: "20px",
                          }}
                        />
                        <Form.Control
                          type="text"
                          placeholder="John"
                          style={{
                            paddingLeft: "30px",
                            backgroundColor: "#e0e0e0",
                            width: "100%",
                            minWidth: "18vw",
                          }}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formLastName" className="mt-4 position-relative">
                        <Form.Label>Last Name</Form.Label>
                        <FaUser
                          className="position-absolute"
                          style={{
                            color: "#808080",
                            left: "5px",
                            top: "72%",
                            transform: "translateY(-50%)",
                            fontSize: "20px",
                          }}
                        />
                        <Form.Control
                          type="text"
                          placeholder="Smith"
                          style={{
                            paddingLeft: "30px",
                            backgroundColor: "#e0e0e0",
                            width: "100%",
                            minWidth: "18vw",
                          }}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-3">
                    <Col>
                      <Form.Group controlId="formEmail" className="mt-4 position-relative">
                        <Form.Label>E-Mail</Form.Label>
                        <FaEnvelope
                          className="position-absolute"
                          style={{
                            color: "#059f83",
                            left: "5px",
                            top: "72%",
                            transform: "translateY(-50%)",
                            fontSize: "20px",
                          }}
                        />
                        <Form.Control
                          type="text"
                          placeholder="jonhsmith123@example.com"
                          style={{
                            paddingLeft: "30px",
                            backgroundColor: "#e0e0e0",
                            width: "100%",
                            minWidth: "18vw",
                          }}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          value={dateOfBirth}
                          onChange={(e) => {
                            const newDateOfBirth = e.target.value;
                            setDateOfBirth(newDateOfBirth);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                  >
                    Save
                  </Button>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </Form>

              </div>
            </div>
            {/* Add Delete Account button here */}
            <div className="d-flex justify-content-end">
              <Button
                variant="danger"
                className="mt-4"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
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
                        controlId="formCurrentPassword"
                        className="mt-4 position-relative"
                      >
                        <Form.Label>Current Password</Form.Label>
                        <FaLock
                          className="position-absolute"
                          style={{
                            color: "#434343",
                            left: "5px",
                            top: "72%",
                            transform: "translateY(-50%)",
                            fontSize: "20px",
                          }}
                        />
                        <Form.Control
                          type="password"
                          placeholder="••••••••••"
                          style={{
                            paddingLeft: "30px",
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
                      <Form.Group controlId="formNewPassword" className="mt-4 position-relative">
                        <Form.Label>New Password</Form.Label>
                        <FaKey
                          className="position-absolute"
                          style={{
                            color: "#dba521",
                            left: "5px",
                            top: "72%",
                            transform: "translateY(-50%)",
                            fontSize: "20px",
                          }}
                        />
                        <Form.Control
                          type="password"
                          placeholder="••••••••••"
                          style={{
                            paddingLeft: "30px",
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
                        className="mt-4 position-relative"
                      >
                        <Form.Label>Confirm New Password</Form.Label>
                        <FaKey
                          className="position-absolute"
                          style={{
                            color: "#dba521",
                            left: "5px",
                            top: "72%",
                            transform: "translateY(-50%)",
                            fontSize: "20px",
                          }}
                        />
                        <Form.Control
                          type="password"
                          placeholder="••••••••••"
                          style={{
                            paddingLeft: "30px",
                            backgroundColor: "#e0e0e0",
                            width: "100%",
                            minWidth: "18vw",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-5"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePasswordChange();
                    }}
                  >
                    Save
                  </Button>
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
