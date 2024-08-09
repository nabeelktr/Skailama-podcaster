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
      throw new DBConnectionError();
    }
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (e) {
      throw new DBConnectionError();
    }
  }

  async findByIdAndUpdate(id, updateData) {
    try {
      const document = await this.model.findByIdAndUpdate(id, updateData, { new: true, lean: true });
      if (!document) {
        this.logger.warn(`Document not found with id: ${id}`);
        throw new Error('Document not found.');
      }
      return { msg: 'updated successfully' };
    } catch (e) {
      throw new DBConnectionError();
    }
  }

  async deleteById(id) {
    try {
      const deletedDocument = await this.model.findByIdAndDelete(id).lean();
      if (!deletedDocument) {
        this.logger.warn(`Document not found with id: ${id}`);
        throw new Error('Document not found.');
      }
      return
    }
    catch (e) {
      throw new DBConnectionError();
    }
  }

  async upsert(
    filterQuery,
    document
  ) {
    try {
      return this.model.findOneAndUpdate(filterQuery, document, {
        lean: true,
        upsert: true,
        new: true,
      });
    }
    catch (e) {
      throw new DBConnectionError();
    }
  }

}
