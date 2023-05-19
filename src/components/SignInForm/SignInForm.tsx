import React, { FC, useState } from "react";
import "../Shared/SignForm.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";

interface SignFormProps {

}

const SignInForm: FC<SignFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const handleSubmit: any = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user !== null) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(`Wrong password or login ${error as string}`);
      });
  }

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <p className="form-title">Sign In</p>
      <div className="form-group">
        <input className="form-input" type="text" placeholder=" " value={email} onChange={handleEmailChange}/>
        <label className="form-label">Email</label>
      </div>
      <div className="form-group">
        <input className="form-input" type="password" placeholder=" " value={password} onChange={handlePasswordChange} />
        <label className="form-label">Password</label>
      </div>
      <button className="form-button" type="submit">
        Submit
      </button>
      <Link to="/sign-up">
          <button className="form-button">Sign Up</button>
      </Link>
    </form>
  );
}

export default SignInForm;
