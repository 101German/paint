import React, { FC, useEffect, useRef, useState } from "react";
import "./PaintPanel.css";
import DrawTools from "../DrawTools/DrawTools";
import DrawBoard from "../DrawBoard/DrawBoard";
import { Option } from "../../Models/Option";
import { addDoc, collection } from "firebase/firestore";
import database, { auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

const PaintPanel: FC = () => {
  const drawsCollectionRef = collection(database, "draws");
  const [options, setOptions] = useState({
    color: "green",
    size: 1,
    shape: "",
  });
  const [userName, setUserName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user?.getIdTokenResult().then((token) => {
        setUserName(token.claims.name)
      });
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvasRef.current?.getContext("2d");
    if (canvas !== null) {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleOptionChange = (option: Option) => {
    setOptions(option);
    console.log("options: ", option);
  };

  const publishDraw = () => {
    const url = canvasRef.current?.toDataURL() ?? "";
    addDoc(drawsCollectionRef, {
      drawURL: url,
      authorName: userName
    });
    navigate('/')
  };

  return (
    <div className="paint-panel-container">
      <div className="paint-panel">
        <DrawTools
          handleOptionChange={handleOptionChange}
          publishDraw={publishDraw}
          options={options}
          clearCanvas={clearCanvas}
        />
        <DrawBoard options={options} canvasRef={canvasRef} />
      </div>
    </div>
  );
};

export default PaintPanel;
