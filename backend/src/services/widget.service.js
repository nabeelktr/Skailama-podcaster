import { CustomError } from "@nabeelktr/error-handler";
import mongoose from "mongoose";

export class WidgetService {

    constructor(displayRepository, widgetRepository) {
        this.displayRepository = displayRepository;
        this.widgetRepository = widgetRepository;
    }

    async addWidget(id, widgetData) {
        try {
            return this.widgetRepository.upsert({_id: new mongoose.Types.ObjectId(id)}, widgetData);
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async addDisplay(id, displayData) {
        try {
            return this.displayRepository.upsert({_id: new mongoose.Types.ObjectId(id)}, displayData);
        } catch (e) {
            throw new CustomError(e);
        }
    }

  
}
