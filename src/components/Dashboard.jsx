import PropTypes from "prop-types";
import { useState } from "react";

export default function Dashboard({
  accessToProfile,
  profileData,
  schedules,
  setSelectedSchedule,
  isPayer,
  setIsPayer,
  handleNewSchedule,
  handleLogout,
}) {
  const [stage, setStage] = useState(0);
  const [isLookingForCourt, setIsLookingForCourt] = useState(false);

  const handleCourtSearch = () => {
    setIsLookingForCourt(true);
    setStage(1);
  };

  const handlePlayerSearch = () => {
    setIsLookingForCourt(false);
    setStage(1);
  };

  const handleBack = () => {
    setStage(0);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      {stage === 0 && (
        <div>
          <button onClick={handleCourtSearch}>Busca pista</button>
          <button onClick={handlePlayerSearch}>
            Ya tiene la pista alquilada y busca jugadores
          </button>
        </div>
      )}

      {stage === 1 && isLookingForCourt && (
        <div>
          <p>Buscando pista</p>
          <button onClick={handleBack}>Volver</button>
        </div>
      )}

      {stage === 1 && !isLookingForCourt && (
        <div>
          <p>logged-in</p>

          <button onClick={accessToProfile}>Profile</button>
          {profileData && (
            <div>
              <h3>Profile Data:</h3>
              <pre>{JSON.stringify(profileData, null, 2)}</pre>
            </div>
          )}

          <h3>Schedules:</h3>
          <form onSubmit={handleNewSchedule}>
            <select onChange={(e) => setSelectedSchedule(e.target.value)}>
              <option value="">Choose a schedule</option>
              {schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {`Date: ${schedule.dateOfReservation}, Court Number: ${schedule.courtNumber}`}
                </option>
              ))}
            </select>
            <label>
              <input
                type="checkbox"
                checked={isPayer}
                onChange={(e) => setIsPayer(e.target.checked)}
              />
              Is Payer
            </label>
            <button type="submit">Create New Schedule</button>
          </form>

          <button onClick={handleBack}>Volver</button>
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  accessToProfile: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  schedules: PropTypes.array.isRequired,
  setSelectedSchedule: PropTypes.func.isRequired,
  isPayer: PropTypes.bool.isRequired,
  setIsPayer: PropTypes.func.isRequired,
  handleNewSchedule: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
