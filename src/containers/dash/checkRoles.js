import React from "react";
import { Navigate } from "react-router-dom";
import { arr } from "./userRole";
import { logout } from "../../actions/loginActions";
import { connect } from "react-redux";
function CheckRoles({ role, path,query }) {


  console.log(role,"role",path,"path",query,"query")
  const n = arr.filter((item) => item.role === role);
  let lo = path.split("/").length === 2 ? `/dashboard/${n[0].url}` : path;
  if (lo !== "/dashboard/") {
    return <Navigate to={`${lo}${query}`} />;
  } else {
    logout();
    window.location.replace("/");
    return <Navigate to="/" />;
  }
}

export default connect(null, { logout })(CheckRoles);
