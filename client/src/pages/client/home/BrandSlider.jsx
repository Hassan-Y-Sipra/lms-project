  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "../../../assets/css/BrandSlider.css"

  const BrandSlider = () => {
    const [brandSlider, setBrandSlider] = useState([]);
    const URL=import.meta.env.VITE_URL

    useEffect(() => {
      axios
        .get(`${URL}/getbrandslider`)
        .then((res) => {
          setBrandSlider(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
      <div className="brand-slider-container">
        <div className="slider-track">
          {brandSlider.concat(brandSlider).map((item, index) => (
            <div className="slide" key={index}>
              <img src={`/uploads/${item.image}`} alt={`brand-${index}`} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default BrandSlider;
