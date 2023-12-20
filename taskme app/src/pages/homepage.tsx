import React, { useEffect } from "react";
import { useRouter } from "next/router";


const Homepage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {

    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token="),
    );

    if (tokenCookie) {
      // Redirect to tasks page
      router.push("/tasks");
    }
  }, [router]);

  const handleLoginClick = () => {
    // Redirect to the login page
    router.push("/login");
  };

  const handleRegisterClick = () => {
    // Redirect to the registration page
    router.push("/register");
  };

  return (
    <div>
      <h1>Task.Me</h1>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
};

export default Homepage;
