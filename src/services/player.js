import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getProfile = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.get("http://localhost:3000/profile", config);
  return request.then((response) => response.data);
};

const getSchedules = () => {
  const request = axios.get("http://localhost:3000/schedules");
  return request.then((response) => response.data);
};

const createNewSchedule = (userId, scheduleData) => {
  const request = axios.post(
    `http://localhost:3000/player/${userId}/schedules`,
    scheduleData
  );
  return request.then((response) => response.data);
};

const getSchedulesAvailables = () => {
  const request = axios.get("http://localhost:3000/schedulesAvailables");
  return request.then((response) => response.data);
};

export default {
  getProfile,
  getSchedules,
  createNewSchedule,
  getSchedulesAvailables,
  setToken,
};
