
import React,{useState} from 'react'

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useHistory} from "react-router-dom"

function Signup() {
const history = useHistory();
toast.configure();
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const userSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup.string().min(8).max(20).required("Password is required"),
    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  // bind usefrom and yup with yupresolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  
  
  const { firstname, lastname, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { firstname, lastname, email, password };
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parsRes = await response.json();
     if(parsRes.token){
        localStorage.setItem("token", parsRes.token);
        history.push("/dashboard");
       toast.success("You Registered Successfully");
     }else{
       toast.error("Something wrong")
     }
     
     
     
      
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container" style={{width:"50%",paddingTop:"40px"}}>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstname}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="lastname"
          value={lastname}
          placeholder="Last Name"
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          className="form-control y-3"
          onChange={(e) => onChange(e)}
          style={{marginBottom:"20px"}}
        />
        <button className="btn btn-primary btn-block">Register</button>
      </form>
      {/* <Typography
        gutterBottom
        variant="h3"
        align="center"
        style={{ paddingTop: "30px" }}
      >
        Sign Up
      </Typography>
      <Card
        gutterBottom
        style={{ maxWidth: 700, margin: "0 auto", padding: "20px 5px" }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstname"
                  variant="outlined"
                  fullWidth
                  error={errors.firstName?.message ? true : false}
                  {...register("firstname")}
                    helperText={errors.firstName?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastname"
                  variant="outlined"
                  fullWidth
                  error={errors.lastName?.message ? true : false}
                  {...register("lastname")}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  error={errors.email?.message ? true : false}
                  {...register("email")}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  error={errors.password?.message ? true : false}
                  {...register("password")}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card> */}
    </div>
  );
}

export default Signup;
