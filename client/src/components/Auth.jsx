import { useState } from "react";
import Cookies from "universal-cookie";
import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

export default function Auth() {
  const [isSignup, setIsSignup] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const { default: axios } = await import("redaxios");

    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData.entries());

    const { username, password, phoneNumber, avatarURL } = form;
    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    location.reload();
  }

  return (
    <main className="auth__form-container">
      <section className="auth__form-container_fields">
        <form
          onSubmit={handleSubmit}
          className="auth__form-container_fields-content"
        >
          <h2>{isSignup ? "Sign up" : "Sign in"}</h2>
          {isSignup && (
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="fullName">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="auth__form-container_fields-content_input">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          {isSignup && (
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                required
              />
            </div>
          )}
          {isSignup && (
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="avatarURL">Avatar URL</label>
              <input
                name="avatarURL"
                type="text"
                placeholder="Avatar URL"
                required
              />
            </div>
          )}
          <div className="auth__form-container_fields-content_input">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              placeholder="Password"
              required
            />
          </div>
          {isSignup && (
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                type="text"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
          <button className="auth__form-container_fields-content_button">
            {isSignup ? "Sign up" : "Sign in"}
          </button>
          <p className="auth__form-container_fields-account">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span onClick={() => setIsSignup((prevIsSignup) => !prevIsSignup)}>
              {isSignup ? " Sign in" : " Sign up"}
            </span>
          </p>
        </form>
      </section>
      <section className="auth__form-container_image">
        <img src={signinImage} alt="Sign in" />
      </section>
    </main>
  );
}
