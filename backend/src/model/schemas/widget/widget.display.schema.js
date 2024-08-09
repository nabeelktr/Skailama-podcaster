import mongoose from "mongoose";

const displaySchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    required: true,
  },
  fontSize: {
    type: Number,
    required: true,
  },
  fontColor: {
    type: String,
    required: true,
  },
  chatHeight: {
    type: String,  
    required: true,
  },
  chatIconSize: {
    type: String, 
    required: true,
  },
  positionOnScreen: {
    type: String, 
    required: true,
  },
  distanceFromBottom: {
    type: Number, 
    required: true,
  },
  horizontalDistance: {
    type: Number, 
    required: true,
  },
  botIcon: {
    type: String, 
    required: true,
  },
});

const DisplayModel = mongoose.model("Display", displaySchema);
export default DisplayModel;

