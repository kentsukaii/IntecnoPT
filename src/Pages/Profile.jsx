import React, { useEffect, useState } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useProfileFirebase } from './Backend'; //Import profile
import { firestore } from '../firebase';
import { auth } from '../firebase';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const usersCollection = collection(firestore, 'Users');
  const { loadProfileInfo } = useProfileFirebase();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profileInfo = await loadProfileInfo();
        if (profileInfo) {
          const userDocRef = doc(usersCollection, user.uid);
          try {
            await setDoc(userDocRef, profileInfo);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
              const additionalData = docSnap.data();
              console.log('User data from Firestore:', additionalData);
  
              setFirstName(additionalData.Name.split(' ')[0] || '');
              setLastName((additionalData.Name.split(' ').slice(1).join(' ') || '').trim());
              setEmail(additionalData.Email || '');
              setDateOfBirth(additionalData.DateOfBirth || '');
  
              setUser({
                ...user,
                additionalData: additionalData,
              });
            } else {
              setFirstName('');
              setLastName('');
              setEmail('');
              setDateOfBirth('');
              setUser(user);
            }
          } catch (error) {
            console.error('Error getting user document:', error);
          }
  
          setFirstName(profileInfo.firstName);
          setLastName(profileInfo.lastName);
          setEmail(profileInfo.email);
          setDateOfBirth(profileInfo.dateOfBirth);
  
          setUser({
            ...user,
            additionalData: profileInfo,
          });
        } else {
          setFirstName('');
          setLastName('');
          setEmail('');
          setDateOfBirth('');
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, [auth]);
  


  const handleSave = async () => {
    console.log('Saving user data...');
    try {
      // Update the user's profile in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        email: email,
      });

      console.log('Firebase Auth profile updated successfully');

      // Update the user's document in Firestore
      const userDocRef = doc(firestore, 'Users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // If the document exists, update it
        await updateDoc(userDocRef, {
          Name: `${firstName} ${lastName}`,
          Email: email,
          DateOfBirth: dateOfBirth,
        });

        console.log('Firestore document updated successfully');
      } else {
        // If the document does not exist, create it
        await setDoc(userDocRef, {
          Name: `${firstName} ${lastName}`,
          Email: email,
          DateOfBirth: dateOfBirth,
        });

        console.log('Firestore document created successfully');
      }

      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
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
                    id='form1'
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>
                <div className="col-md-6">
                  <MDBInput
                    label='Date of Birth'
                    id='form4'
                    type='date'
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>

              </div>
              <MDBBtn className='mt-3' onClick={handleSave}>Save</MDBBtn>
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
    </div>
  );
};
export default Profile;