import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/Test";

const PublicRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default PublicRoutes;