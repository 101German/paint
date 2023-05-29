import React, { FC, useEffect, useState } from "react";
import "./DrawList.css";
import { collection, getDocs } from "firebase/firestore";
import database from "../../config";

interface DrawListProps {
}

class Draw {
  id: string
  drawUrl: string
  authorName: string
}

const DrawList: FC<DrawListProps> = () => {
  const [draws, setDraws] = useState<Draw[]>([]);
  const drawsCollectionRef = collection(database, "draws")
  const getDraws = async () => {
    const data = await getDocs(drawsCollectionRef);
    const draws = data.docs.map((doc) => ({ id: doc.id, drawUrl: doc.data().drawURL, authorName: doc.data().authorName }));
    return draws;
  }

  useEffect(() => {
    getDraws().then((res: Draw[]) => {
      setDraws(res)
    })
  }, [])
  return (<div className="draw-list-container">
    {draws.map((draw) => (<div className="draw-item" key={draw.id}>
        <img className="draw-img" src={draw.drawUrl}/>
        <h1>{draw.authorName}</h1>
    </div>))}
 </div>)
}

export default DrawList;
