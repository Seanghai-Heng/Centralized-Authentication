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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "32px",
          borderRadius: "16px",
          background: "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "50px", color: "#1f2937" }}>React App</h1>

        {loggedIn ? (
          <>
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "#ecfdf5",
                color: "#065f46",
                marginBottom: "20px",
              }}
            >
              <strong>Authenticated</strong>
              <p style={{ margin: "8px 0 0" }}>
                Logged in as:{" "}
                <strong>{keycloak.tokenParsed?.preferred_username}</strong>
              </p>
            </div>

            <button
              onClick={logout}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "#dc2626",
                color: "#ffffff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={login}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#ffffff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Login with Keycloak
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
