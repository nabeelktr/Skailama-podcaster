export default class ProjectController {

    constructor(service) {
        this.service = service
    }

    create = async (req, res, next) => {
        try {
            const projectData = {...req.body, userId: req.user._id}
            const response = await this.service.create(projectData);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

    getProjects = async (req, res, next) => {
        try {
            const userId = req.user._id
            const response = await this.service.getProjects(userId);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

    createUpload = async (req, res, next) => {
        try {
            const response = await this.service.create(req.body);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

    getUploads = async (req, res, next) => {
        try {
            const projectId = req.params.id
            const response = await this.service.getUploads(projectId);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };
    
    getUpload = async (req, res, next) => {
        try {
            const uploadId = req.params.id
            const response = await this.service.getUpload(uploadId);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

    deleteUpload = async (req, res, next) => {
        try {
            const uploadId = req.params.id
            const response = await this.service.deleteUpload(uploadId);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

    updateUpload = async (req, res, next) => {
        try {
            const uploadId = req.params.id
            const response = await this.service.updateUpload(uploadId, req.body);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };
}
