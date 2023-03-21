import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext, LoginContext } from '../../../App';
import Cookies from 'js-cookie'
import './login.css'
import { useNavigate } from "react-router-dom"



const Login = () => {

  const navigate = useNavigate();

  const { state, dispatch } = useContext(LoginContext)
  const BaseURL = useContext(BaseURLContext)
  const [Right, setRight] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [FGPW, setFGPW] = useState(false);
  const [EmailFG, setEmailFG] = useState("");
  const [Emailsent, setEmailsent] = useState(false);
  const [EmailRegistration, setEmailRegistration] = useState("");
  const [EmailMessage, setEmailMessage] = useState({});
  const [DisplayRegistrationMessage, setDisplayRegistrationMessage] = useState(false);
  const [Password1, setPassword1] = useState("");
  const [Password2, setPassword2] = useState("");
  const [passworderror, setpassworderror] = useState("")
  const [ok, setok] = useState("");

  const handleregister = () => {
    fetch(`${BaseURL}dj-rest-auth/registration/`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest"
      },

      body: JSON.stringify({
        "email": EmailRegistration,
        "username": Username,
        "password1": Password1,
        "password2": Password1,


      })
    }).then(data => data.json()).then(data => {
      setEmailMessage(data);
      setDisplayRegistrationMessage(true);
      console.log(data)
    })

  }



  const handleLogin = () => {
    fetch(`${BaseURL}dj-rest-auth/login/`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest"
      },

      body: JSON.stringify({
        "username": Username,
        "password": Password,
        "email": ""
      })
    }).then(data => data.json()).then(data => {
      dispatch({ "type": "login", payload: data.key });
      Cookies.set("token", data.key);
      Cookies.set("login", true);
      console.log(state)

      return data.key
    }).then((key) => {
      console.log(key);
      fetch(`${BaseURL}api/users/`, {
        method: 'POST',

        headers: {

          'Content-Type': 'application/json',
          "Authorization": `Token ${key}`
        }

      }).then(username => username.json()).then(username => {
        dispatch({ "type": "setusername", payload: username.username });
        dispatch({ "type": "avatar", payload: username.image });
        Cookies.set("avatar", username.imageurl)
        Cookies.set("username", username.username);
        Cookies.set("userid", username.id);
        Cookies.set("usertype", username.usertype)
        return username;
      }).then(data => {
        navigate("/app")
      })


    })
  }


  const handleresetpassword = () => {
    fetch(`${BaseURL}dj-rest-auth/password/reset/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',


      },
      body: JSON.stringify({ "email": EmailFG })
    }).then(data => data.json()).then((data) => {
      setEmailsent(true)
    })

  }


  return (
    <div>




      <div className={Right ? "container right-panel-active" : "container"} id="container">
        <div className="form-container sign-up-container">
          {!DisplayRegistrationMessage ? <div className='signup__form'>
            <h1>Create Account</h1>
            <input type="text" placeholder="username" onChange={(e) => {
              setUsername(e.target.value)
            }} />
            <input type="email" placeholder="Email" onChange={(e) => {
              setEmailRegistration(e.target.value)
            }}></input>
            <input type="password" placeholder="Password" onChange={async (e) => {

              if (e.target.value.match(/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g)) {
                setpassworderror("The password is OK!")

              }
              else {
                setpassworderror("At least 8 character with at least 1 Uppercase, 1 lowercase, 1 number")
              }
              setPassword1(e.target.value);
            }} />
            <p className='p_toleft' style={{ marginTop: "5px", marginBottom: "5px" }}>
              {
                passworderror
              }
            </p>
            <input type="password" placeholder="Password" onChange={(e) => {
              if (Password1 === e.target.value) {
                setok("ok")
              }
              else {
                setok("Password2 doesn't match Password1")
              }
            }} />
            <p className='p_toleft' style={{ marginTop: "5px", marginBottom: "5px" }}>
              {ok}
            </p>


            <button onClick={() => {
              handleregister()
            }} >Sign Up</button>
          </div> : <div className='register_message'>

            {EmailMessage.detail && <div>

              <p className='p_toleft' style={{ marginTop: "5px", marginBottom: "5px", textAlign: "center" }}>
                <span>
                  Detail: </span> {EmailMessage.detail}
                <br />
                <br />
                --- Please check your email <br />
                --- to verify the account
              </p>

              <button onClick={() => {
                setRight(false);
              }} style={{ marginTop: "10px" }}>
                Sign In
              </button>
            </div>}


            {EmailMessage.username && <p className='p_toleft' style={{ marginTop: "5px", marginBottom: "5px" }}>
              <span>
                Username Error: </span> {EmailMessage.username}
            </p>}

            {EmailMessage.email && <p className='p_toleft' style={{ marginTop: "5px", marginBottom: "5px" }}>
              <span>
                Email Error: </span> {EmailMessage.email}
            </p>}

            {EmailMessage.password1 && <p className='p_toleft' style={{ marginTop: "5px", marginBottom: "5px" }}>
              <span>
                Password1 Error: </span> {EmailMessage.password1}
            </p>}


            {EmailMessage.password2 && <p className='p_toleft' style={{ marginTop: "5px", marginBottom: "5px" }}>
              <span>
                Password2 Error: </span> {EmailMessage.password2}
            </p>}


            <button onClick={() => {
              setDisplayRegistrationMessage(false)
            }} style={{ marginTop: "10px" }}>
              Sign Up Again
            </button>
          </div>}

        </div>
        <div className="form-container sign-in-container">
          {
            !FGPW ? <div >
              <h1>Sign in</h1>

              <input type="text" placeholder="Username" onChange={(e) => {
                setUsername(e.target.value);
              }} />
              <input type="password" placeholder="Password" onChange={(e) => {
                setPassword(e.target.value);
              }} />
              <p className='forgotpw hoverEffect'
                onClick={() => {
                  setFGPW(!FGPW)
                }}
              >Forgot your password?</p >
              <button onClick={() => {
                handleLogin()
              }}>Sign In</button>
            </div>


              : <div className='resetpwdiv'>
                {!Emailsent ? <div >
                  <h1>Reset Password</h1>
                  <input type="email" placeholder="Enter your email" onChange={(e) => {
                    setEmailFG(e.target.value);

                  }} />

                  <button onClick={() => {
                    handleresetpassword()
                  }}>Reset Password</button>

                  <p onClick={() => {
                    setFGPW(false)
                  }} className="hoverEffect">Back to Sign In?</p>
                </div> : <div>
                  <p>
                    Please check your email to reset the password.
                  </p>
                  <button onClick={() => {
                    setFGPW(false)
                  }}>Back to Sign In?</button>

                </div>} </div>
          }
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => {
                setRight(!Right)
              }}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => {
                setRight(!Right)
              }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
