import React from "react";
import { render, screen } from "@testing-library/react";
import Playlist from "./Playlist";
import "@testing-library/jest-dom";

test("renders playlist details correctly", () => {
  const playlist = {
    id: 1,
    name: "80s Hits",
    creator: "John Doe",
    numOfSongs: 15,
    likes: 42,
    user: {
      username: "user123",
    },
  };
  const username = "user123";

  render(
    <Playlist
      playlist={playlist}
      handleLike={() => {}}
      username={username}
      handleRemove={() => {}}
    />
  );

  const nameAndCreator = screen.getByText("80s Hits by John Doe");
  const numOfSongs = screen.getByText("15 songs");
  const likes = screen.getByText("42 likes");
  const likeButton = screen.getByText("like");
  const addedBy = screen.getByText("Added by");
  const displayedUsername = screen.getByTestId("username-id");

  expect(nameAndCreator).toBeDefined();
  expect(numOfSongs).toBeDefined();
  expect(likes).toBeDefined();
  expect(likeButton).toBeDefined();
  expect(addedBy).toBeDefined();
  expect(displayedUsername).toHaveTextContent("user123");
});
