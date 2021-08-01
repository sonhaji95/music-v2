/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('playlistsongs', {
        id: {
            type: 'SERIAL',
            primaryKey: true,
        },
        playlist_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
        song_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
    });

    pgm.addConstraint('playlistsongs',
    'unique_playlist_id_and_song_id', 'UNIQUE(playlist_id, song_id)');
    //fk pada column playlist_id
    pgm.addConstraint('playlistsongs',
    'fk_playlistsongs.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

    //fk pada column song_id
    pgm.addConstraint('playlistsongs', 
    'fk_playlistsongs.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropTable('playlistsongs');
};
