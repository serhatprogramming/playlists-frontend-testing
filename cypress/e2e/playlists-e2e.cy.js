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

describe("Logged-In Tests", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/e2e/reset-test-db");
    const user = {
      name: "Emily Johnson",
      username: "jukebox",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.get('input[type="text"]').type("jukebox");
    cy.get('input[type="password"]').type("1234");
    cy.get("form").submit();
  });

  it("should add a new playlist successfully", () => {
    cy.get('[data-testid="playlist-name"]').type("My Playlist");
    cy.get('[data-testid="creator"]').type("John Doe");
    cy.get('[data-testid="songs"]').type("10");
    cy.get('[data-testid="likes"]').type("100");
    cy.get('[data-testid="add-playlist-button"]').click();
    cy.contains("My Playlist by John Doe");
  });
});

describe("Logged-In, Added a Playlist Tests", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/e2e/reset-test-db");
    const user = {
      name: "Emily Johnson",
      username: "jukebox",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.get('input[type="text"]').type("jukebox");
    cy.get('input[type="password"]').type("1234");
    cy.get("form").submit();
    cy.get('[data-testid="playlist-name"]').type("My Playlist");
    cy.get('[data-testid="creator"]').type("John Doe");
    cy.get('[data-testid="songs"]').type("10");
    cy.get('[data-testid="likes"]').type("100");
    cy.get('[data-testid="add-playlist-button"]').click();
  });

  it("should show playlist details when 'Show Details' is clicked", () => {
    cy.contains("Show Details").click();
    cy.contains("100 likes").should("be.visible");
    cy.contains("10 songs").should("be.visible");
  });

  it("should hide playlist details when 'Hide Details' is clicked", () => {
    cy.contains("Show Details").click();
    cy.contains("Hide Details").click();
    cy.contains("100 likes").should("have.length", 0);
    cy.contains("10 songs").should("have.length", 0);
  });

  it("increases the number of likes when 'like' button is clicked", () => {
    cy.contains("Show Details").click();
    cy.contains("100 likes").should("exist");
    cy.contains("like").click();
    cy.contains("101 likes").should("exist");
  });
});
