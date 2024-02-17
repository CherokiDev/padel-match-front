import { useEffect, useState } from "react";
import "./App.css";
import loginService from "./services/login";
import playerService from "./services/player";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [isPayer, setIsPayer] = useState(false);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      playerService.setToken(user.jwt);
    }
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      const data = await playerService.getSchedules();
      setSchedules(data.data);
    };
    fetchSchedules();
  }, []);

  const accessToProfile = () => {
    playerService.getProfile().then((data) => {
      setProfileData(data);
    });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    setProfileData(null);
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ email, password });
      console.log(user);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      playerService.setToken(user.jwt);
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleNewSchedule = async (e) => {
    e.preventDefault();

    try {
      const newSchedule = await playerService.createNewSchedule(user.id, {
        scheduleId: selectedSchedule,
        payer: isPayer,
      });
      console.log(newSchedule);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div>
        {user ? (
          <Dashboard
            accessToProfile={accessToProfile}
            profileData={profileData}
            schedules={schedules}
            setSelectedSchedule={setSelectedSchedule}
            isPayer={isPayer}
            setIsPayer={setIsPayer}
            handleNewSchedule={handleNewSchedule}
            handleLogout={handleLogout}
          />
        ) : (
          <LoginForm
            email={email}
            handleEmailChange={(e) => setEmail(e.target.value)}
            password={password}
            handlePasswordChange={(e) => setPassword(e.target.value)}
            handleSubmit={handleLogin}
          />
        )}
      </div>
    </>
  );
}

export default App;
