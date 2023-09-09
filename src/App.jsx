import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Home from './pages/Home'
import UserState from "./components/UserState";

function App() {
 
  return (
    <>
      <UserState>
        <Home />
      </UserState>
    </>
  );
}

export default App;
