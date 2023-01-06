import Database from "../database";
import { model, Schema, Types, Model } from 'mongoose';
import { PagesModel, pagesType } from "./Pages";
import { convertToJSObject } from "../tools/Convert";

export interface groupsType {
  _id?: string;
  name?: string;
  descricao?: string;
  color?: string;
  pages?: pagesType[]
}

interface groupsTypeDocument extends groupsType, Document {}
interface groupsTypeModel extends Model<groupsTypeDocument> {}

const groupsPagesStructure = {
  _id : {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "pages"
  },
  name : {type: String, required: true},
  descricao : {type: String},
  color : {type: String}
};
export const groupsPagesSchema = new Schema<groupsType>(groupsPagesStructure);

export const groupsPagesModel = model<groupsTypeDocument, groupsTypeModel>('groupspages', groupsPagesSchema);

export default new (class extends Database {
  get store() {
    return groupsPagesModel.find();
  }

  async search(search: string) {
    let data: groupsType[] = convertToJSObject(await groupsPagesModel.aggregate([
      {$lookup: {
        from: "pages",
        localField: "_id",
        foreignField: "_idgroup",
        as: "pages"
      }},
      {$match: {
        name: {$regex: new RegExp(search, 'gi')}
      }}
    ]));
    return data;
  }

  async remove(_ids: string[]) {
    const data = await groupsPagesModel.findById("639facc621b31653783a89e6");
    if(data==null) { 
      await groupsPagesModel.create({
        _id: new Types.ObjectId("639facc621b31653783a89e6"), 
        name: "Outros",
        color: "black",
        descricao: "Páginas sem destino"
      });
    }
    return await Promise.all(_ids?.map(async _id => {
      (await this.pages(_id))?.map(async page => {
        await PagesModel.findByIdAndUpdate(page._id, {_idgroup: "639facc621b31653783a89e6"});
      });
      return await groupsPagesModel.findByIdAndRemove(_id);
    }));
  }

  async update(_id: string, name?: string, color?: string, descricao?: string) {
    const objeto = {name, color, descricao};
    const data = await groupsPagesModel.findByIdAndUpdate(_id, objeto);
    return data;
  }

  async pages(_idgroup: string) {
    return PagesModel.find({_idgroup});
  }

  async pages_all(n: number) {
    let data: groupsType[] = convertToJSObject(await groupsPagesModel.aggregate([
      {$lookup: {
        from: "pages",
        localField: "_id",
        foreignField: "_idgroup",
        as: "pages"
      }}, 
      {$skip: 2*n},
      {$limit: 2}
    ]));
    return data;
  }

  async create(name: string, color: string, descricao: string) {
    let groupsData: groupsType[] = convertToJSObject(await groupsPagesModel.aggregate([
      {$lookup: {
        from: "pages",
        localField: "_id",
        foreignField: "_idgroup",
        as: "pages"
      }}
    ]));
    const groups: string[] | any = (await groupsData).filter((group: groupsType) => {
      return group.pages?.length==0;
    }).map((group: groupsType) => group._id);
    await this.remove(groups);
    const objeto = {_id: new Types.ObjectId(), name, color, descricao};
    return await groupsPagesModel.create(objeto);
  }
})();