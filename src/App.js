
import React from "react";
import Navbar from "./Pages/Home/Layout/Navbar";
import { IndexRoutes } from "./Routes";
import Footer from "./Pages/Home/Layout/Footer";
import { useRoutes } from "react-router-dom";

function App() {
  const AppRoutes = useRoutes(IndexRoutes);

  return (
    <React.Fragment>
      <Navbar />
      {AppRoutes}
      <Footer />
    </React.Fragment>
  );
}

export default App;
