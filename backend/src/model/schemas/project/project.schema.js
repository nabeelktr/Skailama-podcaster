import mongoose from "mongoose";
import "dotenv/config";


const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        uploads: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Upload'
        }]
    },
    {
        timestamps: true,
    }
);


const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;
