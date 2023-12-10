import React, { useEffect, useState } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, reauthenticateWithCredential } from 'firebase/auth';
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import Footer2 from "../Components/Struct/Footer2";
import { auth, firestore } from '../firebase';
import { getUserData } from './BackendFiles/Backend';




const Profile = () => {

  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser({
          displayName: '',
          email: '',
          additionalData: {
            dateOfbirth: '',
            firstName: '',
            lastName: '',
          },
        });
        setDateOfBirth('');
        return;
      }

      try {
        const additionalData = await getUserData();
        const displayName = additionalData?.displayName || user.displayName;
        const names = displayName.split(' ');
        const [firstName, ...lastNameParts] = names;
        const lastName = lastNameParts.join(' ');
        const email = user.email;



        setUser(prevUser => ({
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

        setDateOfBirth(additionalData?.dateOfBirth || '');

        if (additionalData?.displayName) {
          setFirstName(firstName);
          setLastName(lastName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError("No data");
        setUser(prevUser => ({
          ...prevUser,
          displayName: user.displayName,
          email: user.email,
        }));
        setDateOfBirth('');
      }
    });

    return () => unsubscribe();
  }, [auth]);



  const handleSave = async () => {

    console.log('Saving user data...');

    try {

      const user = getAuth().currentUser;
      const email = user.email;
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age > 101 || age < 6) {
        console.error('You must be at least be alive');
        setError("You must be at least be alive");
        return;
      }

      // Update the user's profile in Firebase Auth
      await updateEmail(user, email);
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        email: email,
      });

      console.log('Firebase Auth profile updated successfully');

      // Query for the user document where the email field matches the user's uid
      const q = query(collection(firestore, "Users"), where("email", "==", email));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Get the first document from the query result (assuming uid is unique)
      const userDocSnap = querySnapshot.docs[0];

      if (userDocSnap) {
        // If the document exists, update it
        await updateDoc(userDocSnap.ref, {
          displayName: `${firstName} ${lastName}`,
          email: email,
          dateOfBirth: dateOfBirth,
        });

        console.log('Firestore document updated successfully');
      } else {
        console.log('Firestore document does not exist, no changes made');
        setErrorMessage(error.message);
      }

      console.log('User profile updated successfully');
      setError("User profile updated successfully");
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError("Error updating user profile");
    }
  };

  const handlePasswordChange = async (currentPassword, newPassword) => {

    // Re-authenticate the user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update the user's password
    await updatePassword(user, newPassword);
  };



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
              <div className="p-5" style={{ backgroundColor: 'lightyellow', marginTop: '20px' }}>
                <h2>Sub Container 1</h2>
                <p>This is the first sub-container.</p>
              </div>
              <div className="p-5" style={{ backgroundColor: 'lightgray', marginTop: '20px' }}>
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
                  <MDBInput
                    label='First Name'
                    id='form1'
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <MDBInput
                    label='Last Name'
                    id='form2'
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <MDBInput
                    label='Email'
                    id='form3'
                    type='email'
                    value={user ? user.email : ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <MDBInput
                    label='Date of Birth'
                    id='form4'
                    type='date'
                    value={dateOfBirth}
                    onChange={(e) => {
                      const newDateOfBirth = e.target.value;
                      setDateOfBirth(newDateOfBirth);
                    }}
                  />

                </div>
              </div>
              <div>

                <MDBBtn className='mt-3' onClick={handleSave}>Save</MDBBtn>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <MDBBtn className='mt-3' onClick={() => handlePasswordChange(currentPassword, newPassword)}>Save</MDBBtn>
              </div>

            </div>
            <div className="p-5" style={{ backgroundColor: 'lightpink', marginTop: '20px' }}>
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
      <Footer2 />
    </div>
  );
};
export default Profile;