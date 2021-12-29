import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Sidebar from "./pages/Sidebar/Sidebar";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home";
import useWindowSize from "./hooks/useWindowSize";
import useAuthUser from "./hooks/useAuthUser";
// import useAlgolia from "./hooks/useAlgolia";
import { Route,  Switch } from "react-router-dom";

export default function App() {


  const page = useWindowSize();
  const user = useAuthUser();

  if (!user) {
    return <Login />;
  }

  return (
   
    <div className="app" style={{ ...page }}>
      <p className="app__mobileview">View for only web</p>
     
      <div className="app__body">
        <Sidebar user={user} page={page} />
        <Switch>
        <Route path="/room/:roomId">
          <Chat user={user} page={page} />
        </Route>
						{/* <Route path="/chat/:id" component={Chat} /> */}
						<Route component={Home} />
					</Switch>
      
      </div>
    
    </div>
  );
}
