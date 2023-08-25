describe("Playlists App E2E", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/e2e/reset-test-db");
    const user = {
      name: "Emily Johnson",
      username: "jukebox",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("should open the application and display Playlist Application", () => {
    cy.contains("Log in to playlist application");
  });
  it("should be able to login successfully", () => {
    cy.get('input[type="text"]').type("jukebox");
    cy.get('input[type="password"]').type("1234");
    cy.get("form").submit();
    cy.contains("Howdy, jukebox!");
  });

  it("should display an error message for invalid login", () => {
    cy.get('input[type="text"]').type("invalidUsername");
    cy.get('input[type="password"]').type("invalidPassword");
    cy.get("form").submit();
    cy.contains("Login failed");
  });
});
