import { useEffect, useState } from "react";
import keycloak from "./keycloak";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256"
    }).then((authenticated: boolean) => {
      setLoggedIn(authenticated);
    });
  }, []);

  const login = () => {
    keycloak.login({
      redirectUri: window.location.origin
    });
  };

  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin
    });
  };

  return (
    <div>
      <h1>React App (App1)</h1>

      {loggedIn ? (
        <>
          <p>
            Logged in as: {keycloak.tokenParsed?.preferred_username}
          </p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with Keycloak</button>
      )}
    </div>
  );
}

export default App;
