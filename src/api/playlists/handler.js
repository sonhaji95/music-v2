class PlaylistsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        //binding
        this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
        this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
        this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
        this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
        this.getSongsFromPlaylistHandler = this.getSongsFromPlaylistHandler.bind(this);
        this.deleteSongToPlaylistHandler = this.deleteSongToPlaylistHandler.bind(this);
        this.getUsersByUsernameHandler = this.getUsersByUsernameHandler.bind(this);
    }

    //post playlist
    async postPlaylistHandler(request, h) {
            this._validator.validatePlaylistPayload(request.payload);
            const { name } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const playlistId = await this._service.addPlaylist({
                name, owner: credentialId,
            });

            const response = h.response({
                status: 'success',
                message: 'Playlist berhasil ditambahkan',
                data: {
                    playlistId,
                },
            });
            response.code(201);
            return response;
        } 

    // get playlists
    async getPlaylistsHandler(request) {
        const { id: credentialId } = request.auth.credentials;
        const playlists = await this._service.getPlaylists(credentialId);
        return {
            status: 'success',
            data: {
                playlists,
            },
        };
    }

    //delete playlist
    async deletePlaylistByIdHandler(request) {
            const { playlistId } = request.params;
            const { id: credentialId } = request.auth.credentials;
            
            await this._service.verifyPlaylistOwner(playlistId, credentialId);
            await this._service.deletePlaylistById(playlistId);
            return {
                status: 'success',
                message: 'Playlist berhasil dihapus',
            };
    }

    //post song to playlist
    async postSongToPlaylistHandler(request, h) {
            this._validator.validatePostSongPlaylistPayload(request.payload);
            const { playlistId } = request.params;
            const { songId } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            await this._service.verifyPlaylistAccess(playlistId, credentialId);
            await this._service.addSongToPlaylist(playlistId, songId);

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan ke playlist',
            });
            response.code(201);
            return response;
        } 

    //get songs from playlist
    async getSongsFromPlaylistHandler(request) {
            const { playlistId } = request.params;
            const { id: credentialId } = request.auth.credentials;

            await this._service.verifyPlaylistAccess(playlistId, credentialId);
            const songs = await this._service.getSongsFromPlaylist(playlistId);
            return {
                status: 'success',
                data: {
                    songs,
                },
            };
        }

    //delete song to playlist
    async deleteSongToPlaylistHandler(request) {
    
      const { playlistId } = request.params;
      const { songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyPlaylistAccess(playlistId, credentialId);
      await this._service.deleteSongFromPlaylist(playlistId, songId);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      }; 
    }

    async getUsersByUsernameHandler(request) {
        const { username = '' } = request.query;
        const users = await this._service.getUserByUsername(username);
        return {
            status: 'success',
            data: {
                users,
            },
        };
    }
}

module.exports = PlaylistsHandler;
