import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();


    try {

      const response = await api.post("/api/users/login", {

        email,
        password,

      });


      console.log("LOGIN SUCCESS:", response.data);


      if (!response.data.token) {

        alert("Token not received");

        return;

      }


      // Save token using AuthContext

      login(response.data.token);


      alert("✅ Login Successful");


      navigate("/dashboard");


    } catch (error) {


      console.log("LOGIN ERROR:", error);


      if (error.response) {

        alert(
          `Status: ${error.response.status}\n\n` +
          JSON.stringify(error.response.data, null, 2)
        );

      } 
      else {

        alert("❌ Server not reachable");

      }

    }

  };


  return (

    <div style={{ padding: "30px" }}>

      <h1>Login</h1>


      <form onSubmit={handleLogin}>


        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          required

        />


        <br/><br/>


        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          required

        />


        <br/><br/>


        <button type="submit">

          Login

        </button>


      </form>


    </div>

  );

}


export default Login;