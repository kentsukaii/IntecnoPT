import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpar a assinatura quando o componente é desmontado
    return () => unsubscribe();
  }, [auth]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="bg-light p-5">
            <h1>Hello! - User</h1>
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
                  <MDBInput label='Username' id='form1' type='text' />
                </div>
                <div className="col-md-6">
                  <MDBInput label='Password' id='form2' type={showPassword ? 'text' : 'password'} togglePassword={() => <MDBIcon icon={showPassword ? 'eye-slash' : 'eye'} onClick={toggleShowPassword} />} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <MDBInput label='Email' id='form3' type='email' />
                </div>
                <div className="col-md-6">
                  <MDBInput label='Date of Birth' id='form4' type='date' />
                </div>
              </div>
              <MDBBtn className='mt-3'>Save</MDBBtn>
            </div>
            <div className="bg-light p-5">
              <div className="container">
                <div className="row mb-4">
                <p>Change Password</p>
                  <div className="col-md-6">
                    <MDBInput label='Current Password' id='form5' type={showPassword ? 'text' : 'password'} togglePassword={() => <MDBIcon icon={showPassword ? 'eye-slash' : 'eye'} onClick={toggleShowPassword} />} />
                  </div>
                  <div className="col-md-6">
                    <MDBInput label='New Password' id='form6' type={showPassword ? 'text' : 'password'} togglePassword={() => <MDBIcon icon={showPassword ? 'eye-slash' : 'eye'} onClick={toggleShowPassword} />} />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <MDBInput label='Confirm New Password' id='form7' type={showPassword ? 'text' : 'password'} togglePassword={() => <MDBIcon icon={showPassword ? 'eye-slash' : 'eye'} onClick={toggleShowPassword} />} />
                  </div>
                </div>
                <MDBBtn className='mt-3'>Save</MDBBtn>
              </div>
            </div>
            <div className="p-5" style={{backgroundColor: 'lightpink', marginTop: '20px'}}>
              <h2>Sub Container 3</h2>
              <p>This is the third sub-container.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;