const { Pool } = require('pg');

class ExportsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylists(userId) {
        const query = {
            text: `SELECT songs.id, songs.title, songs.performer, songs.year, songs.genre, songs.duration FROM songs 
        LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id
        LEFT JOIN playlists ON playlists.id = playlistsongs.playlist_id
        LEFT JOIN collaborations ON collaborations.playlist_id = playlistsongs.playlist_id
        WHERE playlists.owner = $1 OR collaborations.user_id = $1
        GROUP BY playlistsongs.id, songs.id`,
            values: [userId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = ExportsService;
