class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        //binding agar nilai tetap instance
        this.postUserHandler = this.postUserHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    }

    //fungsi add user
    async postUserHandler(request, h) {
            this._validator.validateUserPayload(request.payload);
            const { username, password, fullname } = request.payload;

            const userId = await this._service.addUser({ username, password, fullname });
            const response = h.response({
                status: 'success',
                message: 'User berhasil ditambahkan',
                data: {
                    userId,
                },
            });
            response.code(201);
            return response;
        }

    //fungsi get user by id
    async getUserByIdHandler(request) {
            const { id } = request.params;
            const user = await this._service.getUserById(id);

            return {
                status: 'success',
                data: {
                    user,
                },
            };
        } 
}

module.exports = UsersHandler;
