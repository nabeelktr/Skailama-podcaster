import { DBConnectionError } from "@nabeelktr/error-handler";


export class Repository {

  constructor(model) {
    this.model = model
  }

  async create(userData) {
    try {
      return await this.model.create(userData);
    } catch (e) {
      throw new DBConnectionError();
    }
  }

  async find(filterQuery) {
    try {
      return await this.model.find(filterQuery, {}, { lean: true });
    } catch (e) {
      throw new DBConnectionError(e.message);
    }
  }

  async findOne(filterQuery) {
    try {
      return await this.model.findOne(filterQuery);
    } catch (e) {
      throw new DBConnectionError(e.message);
    }
  }

  async findByIdAndUpdate(id, updateData) {
    try {
      const document = await this.model.findByIdAndUpdate(id, updateData, { new: true, lean: true });
      if (!document) {
        this.logger.warn(`Document not found with id: ${id}`);
        throw new Error('Document not found.');
      }
      return {msg: 'updated successfully'};
    } catch (e) {
      throw new DBConnectionError(e.message);
    }
  }


}
