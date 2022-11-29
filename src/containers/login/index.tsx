import React from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import "./index.sass";
import LoginForm from "../../components/LoginForm";
import { login } from "../../actions/loginActions";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading } = useSelector((state: any) => state.loginReducer);

  const handleForm = async (form: object) => {
    try {
     await dispatch(login(form))
     navigate('/dashboard')
    } catch (error) {
      return error;
    }
    
  };
  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm loading={loading} handleForm={handleForm} />
      </div>
    </div>
  );
}