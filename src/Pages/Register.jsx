import React from "react";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useFirebaseRegister } from "./Backend";

const Register = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleGoogleRegister,
    handleFacebookRegister,
    handleRegister,
  } = useFirebaseRegister();

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mt-5">
          <div className="bg-light p-5">
            <div className="container">
              <h2>Registration is easy and free!</h2>
              <div className="col-md-6">
                <p></p>
<<<<<<< HEAD
                <MDBInput
                  label="E-Mail"
                  id="form1"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p></p>
              <div className="col-md-6">
                <MDBInput
                  label="Password"
                  id="form2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p></p>
              <div className="col-md-6">
                <MDBInput
                  label="Password Confirm"
                  id="form3"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <p></p>
              <p>
                The password must meet 3 of the following requirements:
              </p>
=======
                <MDBInput label="E-Mail" id="form1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <p></p>
              <div className="col-md-6">
              <MDBInput label="Password" id="form2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <p></p>
              <div className="col-md-6">
              <MDBInput label="Password Confirm" id="form3" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <p></p>
              <p>The password must meet 3 of the following requirements:</p>
>>>>>>> c42110f6482c3c548d46c529852932ccaf4b9622
              <p>Lowercase character</p>
              <p>Capital character</p>
              <p>Special character</p>
              <p>Number</p>
<<<<<<< HEAD
              <MDBCheckbox
                label="I would like to receive personalized news and commercial communications from IntecnoPT via email and other means."
              />
              <p></p>
              <MDBCheckbox label="I agree to the Terms and Conditions" />
              <p></p>
              <MDBBtn>Register</MDBBtn>
=======
              <MDBCheckbox label="I would like to receive personalized news and commercial communications from IntecnoPT via email and other means." />
              <p></p>
              <MDBCheckbox label="I agree to the Terms and Conditions" />
              <p></p>
              <MDBBtn onClick={handleRegister}>Register</MDBBtn>
>>>>>>> c42110f6482c3c548d46c529852932ccaf4b9622
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div className="bg-light p-5">
            <div className="container">
              <h2>Or sign in with a social network</h2>
<<<<<<< HEAD
              <MDBBtn>
                Sign In with Facebook
              </MDBBtn>
              <MDBBtn>Sign In with Google</MDBBtn>
              <p></p>
              <p>Only used for authentication.</p>
              <p></p>
              <p>We will never post anything on your profile</p>
              <p></p>
              <h2>Do you already have an IntecnoPT account?</h2>
              <p>Click below to Login!</p>
              <MDBBtn>Login</MDBBtn>
=======
              <MDBBtn onClick={handleFacebookRegister}>Sign In with Facebook</MDBBtn>
              <MDBBtn onClick={handleGoogleRegister}>Sign In with Google</MDBBtn>
              <p></p>
              <h7>Only used for authentication.</h7>
              <p></p>
              <h7>We will never post anything on your profile</h7>
              <p></p>
              <h2>Do you already have an IntecnoPT account?</h2>
              <p>Click below to Login!</p>
              <MDBBtn onClick={''}>Login</MDBBtn>
>>>>>>> c42110f6482c3c548d46c529852932ccaf4b9622
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
