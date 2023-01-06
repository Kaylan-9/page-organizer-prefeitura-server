import Database from "../database";
import { model, Schema, Model } from 'mongoose';

export interface articlesType {
  _id: string;
  title: string;
  _content?: string;
  date?: Date;
}

interface articlesTypeDocument extends articlesType, Document {}
interface articlesTypeModel extends Model<articlesTypeDocument> {}

const articlesStructure = {
  _content : {type: String, required: true},
  date : {type: Schema.Types.Date, required: true}
};
export const articlesSchema = new Schema<articlesType>(articlesStructure);

export const articlesModel = model<articlesTypeDocument, articlesTypeModel>('articles', articlesSchema);

export default new (class extends Database {
  get store() {
    return articlesModel.find();
  }

  async store_n(n: number) {
    return articlesModel.find().limit(n);
  }

  async text(_id: string) {
    const data = await articlesModel.findById(_id);
    const _content = data?._content;
    return _content;
  }

  async remove(_ids: string[]) {
    return Promise.all(_ids.map(async _id => {
      return await articlesModel.findByIdAndDelete(_id);
    }));
  }

  async update(_id: string, _content: string) {
    const date = new Date();
    const objeto = {_content, date};
    const data = await articlesModel.findByIdAndUpdate(_id, objeto);
    return data;
  }

  async create(title: string, _content: string) {
    const date = new Date();
    const objeto = {title, _content, date};
    return await articlesModel.create(objeto);
  }
})();