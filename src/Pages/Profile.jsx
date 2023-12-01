import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
  
          if (docSnap.exists()) {
            // Update the state with the user data from Firestore
            setUser({
              ...user,
              additionalData: docSnap.data(),
            });
  
            // Update the state variables for the input fields
            const nameParts = user.displayName.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName((nameParts.slice(1).join(' ') || '').trim());
            setEmail(docSnap.data().Email || '');
            setDateOfBirth(docSnap.data().DateOfBirth || '');
          } else {
            // If the document doesn't exist, set empty values
            setFirstName('');
            setLastName('');
            setEmail('');
            setDateOfBirth('');
          }
        } catch (error) {
          console.error('Error getting user document:', error);
          // Handle errors, e.g., display an error message to the user
        }
      }
    });
  
    // Cleanup subscription when the component is unmounted
    return () => unsubscribe();
  }, [auth]);
  
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="bg-light p-5">
          <h1>Hello! - {user ? user.displayName : 'User'}</h1>
          </div>
        </div>
        <div className="col-md-4 mt-5">
          <div className="bg-light p-5">
            <div className="container">
              <div className="p-5" style={{backgroundColor: 'lightyellow', marginTop: '20px'}}>
                <h2>Sub Container 1</h2>
                <p>This is the first sub-container.</p>
              </div>
              <div className="p-5" style={{backgroundColor: 'lightgray', marginTop: '20px'}}>
                <h2>Sub Container 2</h2>
                <p>This is the second sub-container.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 mt-5">
          <div className="bg-light p-5">
            <div className="container">
              <div className="row mb-4">
              <p>My Account Information</p>
                <div className="col-md-6">
                <MDBInput label='First Name'id='form1'type='text'value={user && user.displayName ? user.displayName.split(' ')[0] : ''}/>

                </div>
                <div className="col-md-6">
                <MDBInput label='First Name'id='form1'type='text'value={user && user.displayName ? user.displayName.split(' ')[1] : ''}/>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                <MDBInput label='Email' id='form3'type='email'value={user ? user.email : ''}/>
                </div>
                <div className="col-md-6">
                <MDBInput label='Date of Birth' id='form4' type='date' value={user ? user.dateOfBirth : ''}/>
                </div>
              </div>
              <MDBBtn className='mt-3'>Save</MDBBtn>
            </div>
            <div className="bg-light p-5">
              <div className="container">
                <div className="row mb-4">
                <p>Change Password</p>
                  <div className="col-md-6">
                    <MDBInput label='Current Password' id='form5' type={showPassword ? 'text' : 'password'} />
                  </div>
                  <div className="col-md-6">
                    <MDBInput label='New Password' id='form6' type={showPassword ? 'text' : 'password'} />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <MDBInput label='Confirm New Password' id='form7' type={showPassword ? 'text' : 'password'} />
                  </div>
                </div>
                <MDBBtn className='mt-3'>Save</MDBBtn>
              </div>
            </div>
            <div className="p-5" style={{backgroundColor: 'lightpink', marginTop: '20px'}}>
              <h2>Sub Container 3</h2>
              <p>This is the third sub-container.</p>
              <MDBBtn onClick={toggleShowModal}>Open Form</MDBBtn>
              <MDBModal tabIndex='-1' show={isOpen} onHide={toggleShowModal}>
                <MDBModalDialog centered>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <h5 className='modal-title'>New Form</h5>
                      <MDBBtn className='btn-close' color='none' onClick={toggleShowModal}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <form>
                        <div className="row">
                          {Array.from({ length: 7 }).map((_, i) => (
                            <div className="col" key={i}>
                              <MDBInput label={`Field ${i + 1}`} id={`form${i + 8}`} type='text' />
                            </div>
                          ))}
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkbox1" />
                              <label className="form-check-label" htmlFor="checkbox1">
                                Checkbox 1
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkbox2" />
                              <label className="form-check-label" htmlFor="checkbox2">
                                Checkbox 2
                              </label>
                            </div>
                          </div>
                        </div>
                        <MDBBtn className='mt-3'>Submit</MDBBtn>
                      </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color='secondary' onClick={toggleShowModal}>Close</MDBBtn>
                      <MDBBtn>Save changes</MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;