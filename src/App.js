import { useState, useEffect } from "react";
import Playlist from "./components/Playlist";
import playlistService from "./services/playlistService";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import Section from "./components/Section";
import "./App.css";

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [userObject, setUserObject] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  const [creator, setCreator] = useState("");
  const [numOfSongs, setNumOfSongs] = useState("");
  const [likes, setLikes] = useState("");

  useEffect(() => {
    playlistService.getPlaylists().then((playlists) => setPlaylists(playlists));
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserObject(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const user = await loginService.initiateLogin({
        username,
        password,
      });
      setUserObject(user);
      localStorage.setItem("userData", JSON.stringify(user));
    } catch (exception) {
      notify({ message: "Login failed", type: "warning" });
    }
    setUsername("");
    setPassword("");
  };

  const notify = ({ message, type }) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  const userLoginForm = () => (
    <form onSubmit={handleLogin}>
      <h3>Log in to playlist application</h3>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogout = () => {
    setUserObject(null);
    localStorage.removeItem("userData");
  };

  const displayPlaylists = () => (
    <>
      <h2>Playlist Application</h2>
      <em>Howdy, {userObject.username}! </em>
      <button onClick={handleLogout}>Log Out</button>
      <h3>Playlists</h3>
      {playlists.map((playlist) => (
        <Section
          componentTitle={playlist.name + " by " + playlist.creator}
          key={playlist.id}
        >
          <Playlist
            playlist={playlist}
            handleLike={handleLike}
            handleRemove={handleRemove}
            username={userObject.username}
          />
        </Section>
      ))}
    </>
  );

  const handleAddPlaylist = async (event) => {
    event.preventDefault();
    try {
      playlistService.setAuthorization(userObject.token);
      const newPlaylist = await playlistService.addNewPlaylist({
        name: playlistName,
        creator,
        numOfSongs: numOfSongs === "" || numOfSongs < 0 ? 0 : numOfSongs,
        likes: likes === "" || likes < 0 ? 0 : likes,
      });
      setPlaylists([...playlists, newPlaylist]);
      notify({
        message: `${playlistName} by ${creator} added to playlists.`,
        type: "info",
      });
    } catch (error) {
      notify({
        message: error.response.data.error,
        type: "warning",
      });
    }

    setPlaylistName("");
    setCreator("");
    setNumOfSongs("");
    setLikes("");
  };

  const addPlaylistForm = () => (
    <form onSubmit={handleAddPlaylist}>
      <h3>Add Playlists</h3>
      <div>
        Playlist Name:
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>
      <div>
        Creator:
        <input
          type="text"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        />
      </div>
      <div>
        Number of Songs:
        <input
          type="number"
          value={numOfSongs}
          onChange={(e) => setNumOfSongs(e.target.value)}
        />
      </div>
      <div>
        Likes:
        <input
          type="number"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />
      </div>
      <button type="submit">Add Playlist</button>
    </form>
  );

  const handleLike = async (id, likes) => {
    await playlistService.updatePlaylist(id, {
      likes,
    });

    setPlaylists(
      [...playlists].map((playlist) =>
        playlist.id === id ? { ...playlist, likes } : playlist
      )
    );
  };

  const handleRemove = async (id) => {
    try {
      playlistService.setAuthorization(userObject.token);
      await playlistService.removePlaylist(id);
      notify({
        message: "Delete successfull.",
        type: "info",
      });
      setPlaylists([...playlists].filter((playlist) => playlist.id !== id));
    } catch (error) {
      notify({
        message: `${error.response.data.message}`,
        type: "warning",
      });
    }
  };

  return (
    <div>
      {notification && <Notification notification={notification} />}
      {userObject ? displayPlaylists() : userLoginForm()}
      {userObject && addPlaylistForm()}
    </div>
  );
};

export default App;
