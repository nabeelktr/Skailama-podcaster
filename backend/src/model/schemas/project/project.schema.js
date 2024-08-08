import mongoose from "mongoose";
import "dotenv/config";
import { uploadSchema } from "./uploads.schema";


const projectSchema = new mongoose.Schema(
    {
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
