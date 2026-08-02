import { useState } from "react";
import api from "../../services/api";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/api/users/signup", {
        fullName: name,
        email: email,
        password: password
      });

      console.log(response.data);

      alert("Signup Successful");

    } catch (error) {

      console.log("Signup Error:", error.response);

      alert(
        error.response?.data?.message || 
        "Signup Failed"
      );

    }
  };


  return (
    <div>

      <h1>Signup</h1>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;