import pkg from 'pg';

const { Pool } = pkg;

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists 
      WHERE playlists.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getSongsInPlaylist(id) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlist_songs
      INNER JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlist_songs.playlist_id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }
}

export default PlaylistsService;
