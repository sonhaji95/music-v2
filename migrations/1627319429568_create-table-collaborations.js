/* eslint-disable camelcase */

exports.up = (pgm) => {
     pgm.createTable('collaborations', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        playlist_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
    });

    pgm.addConstraint('collaborations',
    'unique_playlist_id_and_user_id', 'UNIQUE(playlist_id, user_id)');

    //fk pada column playlist_id
    pgm.addConstraint('collaborations',
    'fk_collaborations.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
    //fk pada column user_id
    pgm.addConstraint('collaborations',
    'fk_collaborations.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropTable('collaborations');
};
