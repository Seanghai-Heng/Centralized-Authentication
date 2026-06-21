import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "company-realm",
  clientId: "svelte-app"
});

export default keycloak;
