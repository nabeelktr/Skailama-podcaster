import mongoose from "mongoose";

export const uploadSchema = new mongoose.Schema({
  uploadName: {
    type: String,
    required: [true, "Please enter the upload name"],
  },
  description: {
    type: String,
    required: [true, "Please enter the upload description"],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  }
}, {
  timestamps: true,
});

const Upload = mongoose.model("Upload", uploadSchema);

export { Upload, uploadSchema};