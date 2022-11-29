import React, { FunctionComponent, useState } from "react";
import {Button,Avatar,TextField} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';
import {Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetPasswordReset, sendOtp } from "../../actions/loginActions";
import { useEffect } from "react";
import { createTheme } from '@mui/material/styles';
const theme = createTheme();
const useStyles = makeStyles(({
  
  paper: {
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width:"100%",
    height:"100%"
  },
  loginForm:{
    border: "1px solid gainsboro",
    background:" #fff",
    padding: "2rem",
    borderRadius: "5px",
    position: "absolute",
    top:" 20%",
    right: "5%",
    height:" 30rem",
  },
    
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    padding: "1px",
  },
}));

type FormData = {
  email: string;
  password: string;
}

type LoginFormProps = {
  handleForm: any;
  loading: boolean;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ handleForm, loading }) => {
  const classes = useStyles();
  const { handleSubmit, register, formState: { errors }, } = useForm<FormData>();

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const loginReducer = useSelector((state: any) => state.loginReducer)
  const { otp: otpSent, success, loading: loadingReset } = loginReducer

  const [forgot, setForgot] = useState<any>(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")

  const sendOtpHandler = () => {
    dispatch(sendOtp({ email }))
  }

  const resetPasswordHandler = async () => {
    const body: any = {
      token: otp,
      password
    }
    if (otp && password) {
      dispatch(resetPassword(body))
    }
  }

useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (success) {
      navigate('/')
    }
  }, [navigate, success])

useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(resetPasswordReset())
  }, [dispatch])

  const resetDetails = () => {
    setForgot(false)
    setEmail("")
    setOtp("")
    setPassword("")
    dispatch(resetPasswordReset())
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.loginForm}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} style={{ background: "purple" }}>
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {forgot ? "Reset Password" : "Login"}
        </Typography>
        {!forgot ? (
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleForm)}
            noValidate
          >
            <TextField
              className="input"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              // name="email_id"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "Email is Required",
              })}
              required={errors.email ? true : false}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              className="input"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is Required",
              })}
              required={errors.password ? true : false}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
            />
            <div className={classes.wrapper} style={{marginTop:"1rem"}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                disabled={loading}
                className={classes.submit}
              >
                Sign In
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <div className={classes.wrapper}  style={{marginTop:"1rem"}}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                disabled={loading}
                className={classes.submit}
                onClick={() => setForgot(true)}
              >
                Forgot Password
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </form>
        ) : (
          <>
            <div className={classes.form}>
              <input
                className="input"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", margin: "1rem auto", padding: "14px 14px" }}
              />
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loadingReset || !email}
                  className={classes.submit}
                  onClick={() => sendOtpHandler()}
                >
                  Send OTP
                </Button>
                {loadingReset && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", margin: "1rem auto", padding: "14px 14px" }}
                disabled={!(otpSent && otpSent.status)}
              />
              <input
                className="input"
                name="otp"
                type="password"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ width: "100%", margin: "1rem auto", padding: "14px 14px" }}
                disabled={!(otpSent && otpSent.status)}
              />
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loadingReset || !(otpSent && otpSent.status) || !otp || !password}
                  className={classes.submit}
                  onClick={() => resetPasswordHandler()}
                >
                  Update Password
                </Button>
                {loadingReset && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => resetDetails()}
                >
                  Login
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default LoginForm