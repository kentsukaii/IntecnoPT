import React, { useEffect, useState } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import Footer2 from "../Components/Struct/Footer2";
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getUserData } from './Backend';
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



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Auth state changed:', user);
        try {
          const additionalData = await getUserData();
          console.log('User data from Firestore:', additionalData);

          setUser(prevUser => ({
            ...prevUser,
            ...user,
            additionalData: prevUser ? { ...prevUser.additionalData, ...additionalData } : additionalData,
          }));
          setDateOfBirth(additionalData.dateOfBirth); // Add this line
        } catch (error) {
          console.error('Error fetching user data:', error);
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

    <div className="col-md-4 mt-5">
      <div className="bg-light p-5" style={{ backgroundColor: 'lightgray', marginBottom: '20px' }}>
        <h2>Left Container</h2>
        <p>This is the left container without subcontainers.</p>
      </div>
      <div className="bg-light p-5" style={{ backgroundColor: 'lightgray', marginBottom: '20px' }}>
        <h2>Left Container</h2>
        <p>This is the left container without subcontainers.</p>
      </div>
    </div>
    <div className="col-md-8 mt-5">
      <div className="bg-light p-5" style={{ backgroundColor: 'lightgray', marginBottom: '20px' }}>
        <h2>New Container</h2>
        <p>This is the new container on top of the right container.</p>
      </div>
      <div className="bg-light p-5">
        <div className="container">
          <div className="row mb-4">
            <p>My Account Information</p>
            <div className="col-md-6">
              <MDBInput
                label='First Name'
                id='form1'
                type='text'
                value={user && user.additionalData ? user.additionalData.firstName : ''}
                onChange={(e) => setUser({ ...user, additionalData: { ...user.additionalData, firstName: e.target.value } })}
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label='Last Name'
                id='form1'
                type='text'
                value={user && user.additionalData ? user.additionalData.lastName : ''}
                onChange={(e) => setUser({ ...user, additionalData: { ...user.additionalData, lastName: e.target.value } })}
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
                onChange={async (e) => {
                  const newDateOfBirth = e.target.value;
                  setDateOfBirth(newDateOfBirth);

                  // Update dateOfBirth in Firestore
                  const userDocRef = doc(usersCollection, user.uid);
                  await updateDoc(userDocRef, {
                    dateofbirth: newDateOfBirth
                  });
                }}
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
            <MDBBtn className='mt-3' >Change Password</MDBBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer2 />
</div>





  
  );
};
export default Profile;