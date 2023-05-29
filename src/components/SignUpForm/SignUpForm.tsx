import React, { FC, useState } from "react";
import "../Shared/SignForm.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignUpForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const handleUserNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUserName(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        fetch("https://localhost:7199/Auth/AddClaim", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            name: userName,
          }),
        }).then(() => {
          signInWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
              const user = userCredential.user;
              console.log("new ", user);
              if (user !== null) {
                navigate("/");
              }
            }
          );
        });
        if (user !== null) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(`Wrong password or login ${error as string}`);
      });
  };

  return (
    <form
      className="sign-form"
      onSubmit={async (e) => {
        await handleSubmit(e);
      }}>
      <p className="form-title">Sign Up</p>
      <div className="form-group">
        <input
          className="form-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
        <label className="form-label">User Name</label>
      </div>
      <div className="form-group">
        <input
          className="form-input"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label className="form-label">Email</label>
      </div>
      <div className="form-group">
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label className="form-label">Password</label>
      </div>
      <button className="form-button" type="submit">
        Submit
      </button>
      <Link to="/sign-in">
        <button className="form-button">Sign In</button>
      </Link>
    </form>
  );
};

export default SignUpForm;
