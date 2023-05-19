import React, { FC, useEffect } from "react";
import "./Paint.css";
import Header from "../Header/Header";
import PaintPanel from "../PaintPanel/PaintPanel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import DrawList from "../DrawList/DrawList";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";

interface PaintProps {}

const Paint: FC<PaintProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("USER ", user);
      if (user == null) {
        navigate("/sign-in")
      }
    })
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="paint-container">
            <Header />
            <DrawList />
          </div>
        }
      />
      <Route path="/draw" element={<PaintPanel />} />
      <Route path="/sign-up" element={<SignUpForm />} />
      <Route path="/sign-in" element={<SignInForm />} />
    </Routes>
  );
};

export default Paint;
