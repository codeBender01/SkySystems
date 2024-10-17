import Router from "./routes/routes";
import Loading from "./pages/Loading";

import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Router />
    </>
  );
}

export default App;
