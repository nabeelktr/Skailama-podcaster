import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema(
    {
        chatBotName: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        display: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Display',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);


const WidgetModel = mongoose.model("Widget", widgetSchema);
export default WidgetModel;
