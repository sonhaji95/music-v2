class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }
    
    //handler Create
    async postSongHandler(request, h) {
        
        this._validator.validateSongPayload(request.payload);
        const { title = 'untitled', year, performer, genre, duration } = request.payload;
        const songId = await this._service.addSong({ title, year, performer, genre, duration });
        
        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan',
            data: {
                songId,
                },
            });
            response.code(201);
            return response;
    }

    //handler Read all songs
    async getSongsHandler() {
            const songs = await this._service.getSongs();
            return {
                status: 'success',
                data: {
                    songs,
                },
            };
        } 

    //handler Read song Id
    async getSongByIdHandler(request) {
            const { id } = request.params;
            const song = await this._service.getSongById(id);
            return {
                status: 'success',
                data: {
                    song,
                },
            };
        } 

    // Handler Update song id
    async putSongByIdHandler(request) {
            this._validator.validateSongPayload(request.payload);
            const { id } = request.params;
            await this._service.editSongById(id, request.payload);
            return {
                status: 'success',
                message: 'Lagu berhasil diperbarui',
            };
        }

    //Handler Delete song id
    async deleteSongByIdHandler(request) {
            const { id } = request.params;
            await this._service.deleteSongById(id);
            return {
                status: 'success',
                message: 'Lagu berhasil dihapus',
            };
        } 
}

module.exports = SongsHandler;
