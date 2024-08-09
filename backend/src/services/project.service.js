import { CustomError } from "@nabeelktr/error-handler";

export class ProjectService {

    constructor(projectRepository, uploadRepository) {
        this.projectRepository = projectRepository;
        this.uploadRepository = uploadRepository;
    }

    async create(projectData) {
        try {
            const existingProject = await this.projectRepository.findOne({ title: projectData.title });
            if (existingProject) {
                throw new Error('Project already exists');
            }
            return this.projectRepository.create(projectData);
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async getProjects(userId) {
        try {
            return this.projectRepository.find({userId});
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async createUpload(uploadData) {
        try {
            return this.uploadRepository.create(uploadData);
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async deleteUpload(uploadId) {
        try {
            return this.uploadRepository.findByIdAndDelete(uploadId);
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async updateUpload(uploadId, updateData) {
        try {
            return this.uploadRepository.findByIdAndUpdate(uploadId, updateData);
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async getUploads(projectId) {
        try {
            return this.uploadRepository.find({projectId});
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async getUpload(id) {
        try {
            return this.uploadRepository.findById(id);
        } catch (e) {
            throw new CustomError(e);
        }
    }
}
