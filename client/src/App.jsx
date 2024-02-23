import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { UserContext, LoginContext } from "./Context";
import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import "./App.css";
import NewContact from "./components/NewContact";

function App() {
  const [userData, setUserData] = useState([]);
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    axios
      .get("https://contactapp-hjak.onrender.com/api/contact/findAllUsers")
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return (
    <>
      <Theme>
        <UserContext.Provider value={{ userData, setUserData }}>
          <LoginContext.Provider value={{ loginData, setLoginData }}>
            <Routes>
              <Route
                path="mainPage"
                element={<MainPage loginData={loginData} />}
              />
              <Route
                path="/"
                element={
                  <Login userData={userData} setLoginData={setLoginData} />
                }
              />
              <Route
                path="/signUp"
                element={
                  <Register userData={userData} setUserData={setUserData} />
                }
              />
              <Route
                path="newContact"
                element={
                  <NewContact
                    loginData={loginData}
                    setUserData={setLoginData}
                  />
                }
              />
            </Routes>
          </LoginContext.Provider>
        </UserContext.Provider>
      </Theme>
    </>
  );
}

export default App;
