const Playlist = ({ playlist, handleLike, username, handleRemove }) => {
  const addLike = () => {
    handleLike(playlist.id, playlist.likes + 1);
  };

  const removePlaylist = () => {
    if (window.confirm(`Remove Playlist ${playlist.name}?`)) {
      handleRemove(playlist.id);
    }
  };

  return (
    <div>
      <div>
        {playlist.name} by {playlist.creator}
      </div>
      <div>{playlist.numOfSongs} songs</div>
      <div>
        {playlist.likes} likes <button onClick={addLike}>like</button>
      </div>
      <div className="playlist-owner">
        Added by <em data-testid="username-id">{playlist.user.username}</em>{" "}
        {playlist.user.username === username && (
          <button className="small-button" onClick={removePlaylist}>
            Remove the playlist
          </button>
        )}
      </div>
    </div>
  );
};

export default Playlist;
