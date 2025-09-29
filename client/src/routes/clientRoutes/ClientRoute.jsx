import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../pages/client/home";
import Layout from "../../components/clientComponent/Layout";
import TractorParts from "../../pages/client/tarctor/TractorParts";
import TruckPart from "../../pages/client/truck/TruckPart";
import Parts from "../../pages/client/parts/Parts";
import PartsDetail from "../../pages/client/parts/PartsDetail";
import Course from "../../pages/client/courses/course";
import Module from "../../pages/client/courses/Module";
import Checkout from "../../pages/client/courses/Checkout";

const ClientRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tractor-part" element={<TractorParts />} />
          <Route path="/truck-part" element={<TruckPart />} />
          <Route path="/parts/:id" element={<Parts />} />
          <Route path="/partdetail/:id" element={<PartsDetail />} />

        </Route>
          {/* **************courses************ */}
          <Route path="/course"element={<Course/>}/>

          <Route path="/module/:id"element={<Module/>}/>
          <Route path="/checkout/:id"element={<Checkout/>}/>
          

      </Routes>
    </>
  );
};

export default ClientRoute;
