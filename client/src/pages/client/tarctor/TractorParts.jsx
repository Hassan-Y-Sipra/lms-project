import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/css/TractorParts.css";
import { NavLink, useParams } from "react-router-dom";

const TractorParts = () => {
  // const { id } = useParams();
    const category_id=1

  const [brand, setBrand] = useState([]);
  const [brandModel, setBrandModel] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const URL = import.meta.env.VITE_URL;

  
  const getBrand = () => {
    axios
      .get(`${URL}/getbrand`)
      .then((res) => {
        setBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrandmodel = () => {
    axios
      .get(`${URL}/getbrandmodel/${category_id}`)
      .then((res) => {
        setBrandModel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBrand();
    getBrandmodel();
  }, []);

  const handleCheckboxChange = (brandmodelname) => {
    setSelectedBrands((prev) =>
      prev.includes(brandmodelname) ? [] : [brandmodelname]
    );
  };

  const filteredModels =
    selectedBrands.length === 0
      ? brandModel
      : brandModel.filter((model) => selectedBrands.includes(model.logo));

  return (
    <>
      <div className="tractor-parts-container">
        {/* FILTER SECTION */}
        <div className="filter-section">
          <div className="filter">
            <h2>Select Tractor Parts</h2>
          </div>

          <div>
            <div className="filter-box">
              <input
                type="checkbox"
                checked={selectedBrands.length === 0}
                onChange={() => setSelectedBrands([])}
              />
              <label>ALL</label>
            </div>

            {brand.map((item) => (
              <div className="filter-box" key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(item.logo)}
                  onChange={() => handleCheckboxChange(item.logo)}
                />
                <label>{item.brandname}</label>

                <img src={`/uploads/${item.logo}`} alt="brand-logo" />
              </div>
            ))}
          </div>
        </div>

        {/* ****************** brand models************* */}

        <div className="brandmodel-container">
          {filteredModels.map((item) => (
            <div key={item.id}>
              <NavLink to={`/parts/${item.id}`}>
                <div className="brandmodel-image">
                  <img src={`/uploads/${item.image}`} alt="brandmodel-image" />
                  <div className="modelname-logo">
                    <span>{item.modelname}</span>
                    <img src={`/uploads/${item.logo}`} />
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TractorParts;
