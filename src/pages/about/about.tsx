import { useState, useEffect } from "react";
import Home from "../home/home";

const About = () => {
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    setError(true);
  });

  if (error) {
    return <Home />;
  }
  return <div>About</div>;
};

export default About;
