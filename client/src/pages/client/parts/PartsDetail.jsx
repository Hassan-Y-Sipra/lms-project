import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../../assets/css/Partdetail.css"

const PartsDetail = () => {
    const { id } = useParams();
  const [partdetail, setPartdetail] = useState([]);
  

  const URL = import.meta.env.VITE_URL;

  const getPartdetail = () => {
    axios
      .get(`${URL}/getpartdetail/${id}`)
      .then((res) => {
        setPartdetail(res.data);
        console.log(res.data, "detail");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPartdetail();
  }, [id]);

  return (
    <>
      <div className="partdetail-container">
        {partdetail.map((item) => (
          <div key={item.id} className="partdetail-main">
            <div className="partdetail-image">
                <img src={`/uploads/${item.image}`}/>
            </div>
            <div className="partdetail-text">
                <h1>{item.title}</h1>
                <h3>{item.brand}</h3>
              <p className="partdetail-des">{item.description}</p>
             

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PartsDetail;
