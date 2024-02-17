import PropTypes from "prop-types";

export default function LoginForm({
  email,
  handleEmailChange,
  password,
  handlePasswordChange,
  handleSubmit,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
