import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AuthForm(props) {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const fromData = new FormData(e.target);
    const payload = Object.fromEntries(fromData);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify(payload),
      header: {
        "content-type": "application.json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          props.handleSuccessfulLogin();
          props.history.push("/dashboard");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Login Error: ", err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <FontAwesomeIcon icon="envelope" />{" "}
          <input placeholder="email" name="email" type="email" />
        </label>
      </div>
      <div>
        <label>
          <FontAwesomeIcon icon="lock" />{" "}
          <input placeholder="password" name="password" type="password" />
        </label>
      </div>

      <button disabled={isLoading}>Login</button>
    </form>
  );
}
