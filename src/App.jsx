import { useState } from "react";
import "./App.css";
import loginService from "./services/login";
import playerService from "./services/player";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const accessToProfile = () => {
    const token = localStorage.getItem("token");
    playerService.getProfile(token);
    if (token) {
      playerService.getProfile(token).then((data) => {
        console.log(data.dataValues);
        setProfileData(data.dataValues);
      });
    } else {
      console.log("no token");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ email, password });
      console.log(user);
      setUser(user);
      setEmail("");
      setPassword("");

      localStorage.setItem("token", user.jwt);
    } catch (e) {
      console.error(e);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );

  const renderUser = () => (
    <div>
      <p>logged-in</p>
      <button onClick={accessToProfile}>Profile</button>
      {profileData && (
        <div>
          <h3>Profile Data:</h3>
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div>
        <h2>Login</h2>
        {user ? renderUser() : renderLoginForm()}
      </div>
    </>
  );
}

export default App;
