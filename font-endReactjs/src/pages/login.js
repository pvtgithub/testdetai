import React, { useState, useEffect } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { postAPI } from "../services/api";
import "./login.css"

const styles = makeStyles({
  containerStyle: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    margin: 10,
    width: 300,
  },
});

const submitLoginAPI = (data) => {
  return postAPI("/login", data);
};

function Login() {
  const classes = styles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [info, setInfo] = useState({ username: "", password: "" });

  useEffect(() => {
    console.log("Account Info: ", info);
  }, [info]);

  const onValueChangeUsername = (event) => {
    setInfo((prev) => ({ ...prev, username: event.target.value }));
  };

  const onValueChangePassword = (event) => {
    setInfo((prev) => ({ ...prev, password: event.target.value }));
  };

  const onSubmit = async () => {
    const data = new FormData();
    data.append("username", info.username);
    data.append("password", info.password);
    try {
      const result = await submitLoginAPI(data);
      console.log(JSON.stringify(result));
      if (result.data === "success") {
        enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });
        history.push("/main");
      } else {
        enqueueSnackbar("Đăng nhập thất bại!", { variant: "error" });
      }
    } catch (e) {
      console.log("Error", e);
      enqueueSnackbar("Đăng nhập thất bại!", { variant: "error" });
    }
  };

  return (
    <div className="container">
    <div className="d-flex justify-content-center h-100" style={{marginTop: 120}}>
      <div className="card">
        <div className="card-header">
          <h3>Sign In</h3>
          <div className="d-flex justify-content-end social_icon">
            <span><i className="fab fa-facebook-square" /></span>
            <span><i className="fab fa-google-plus-square" /></span>
            <span><i className="fab fa-twitter-square" /></span>
          </div>
        </div>
        <div className="card-body">
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-user" /></span>
              </div>
              <input type="text" className="form-control" placeholder="username" onChange={onValueChangeUsername} />
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-key" /></span>
              </div>
              <input type="password" className="form-control" placeholder="password" onChange={onValueChangePassword} />
            </div>
            <div className="row align-items-center remember">
              <input type="checkbox" />Remember Me
            </div>
            <div className="form-group">
              <input type="submit" defaultValue="Login" className="btn float-right login_btn" onClick={onSubmit} />
            </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-center links">
            Don't have an account?<a href="#">Sign Up</a>
          </div>
          <div className="d-flex justify-content-center">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
