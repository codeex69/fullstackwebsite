import { useState } from "react";
import Login from "./login";
import Home from "./home";
import  "./index.css"
import Dataanalytics from "./dataanalytics";
import  Dashboardoverview  from "./dashboardoverview";
import Reportinsights from "./reportinsights";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
       <>
       <Home />
       <Dataanalytics/>
       <Dashboardoverview/>
       <Reportinsights/>
        </>
      ) : (
        <Login onSuccess={() => setLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
