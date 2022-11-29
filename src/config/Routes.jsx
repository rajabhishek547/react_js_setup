//Authentication
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";
import { checkUser } from "../actions/loginActions";
import { connect } from "react-redux";
import Dashboard1 from '../containers/dashboard1'


function AppRoutes(props) {

  return (
    <BrowserRouter>
      <SnackBar />
      <Routes>
        <Route
          path="/"
          element={<Dashboard1 />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default connect(null, { checkUser })(AppRoutes);