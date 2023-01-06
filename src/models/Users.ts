import Database from "../database";
import { model, Schema, Model } from 'mongoose';
import { PagesModel, pagesType } from "./Pages";
import { convertToJSObject } from "../tools/Convert";

export interface usersType {
  ip: string;
  user?: string;
  password?: string;
  likes: string[];
  pages?: pagesType[];
  viewed_infos: string[];
}

interface usersTypeDocument extends usersType, Document {}
interface usersTypeModel extends Model<usersTypeDocument> {}

const usersStructure = {
  ip : {
    type: String, 
    required: true
  },
  user : {type: String},
  password : {type: String},
  likes : [{
    type: Schema.Types.ObjectId,
    ref: 'pages'
  }],
  viewed_infos : [{
    type: Schema.Types.ObjectId,
    ref: 'articles'
  }],
};
export const usersSchema = new Schema<usersType>(usersStructure);

export const usersModel = model<usersTypeDocument, usersTypeModel>('users', usersSchema);

export default new (class extends Database {
  get store() {
    return usersModel.find();
  }

  search(search: string) {
    return usersModel.find({ip: {$regex: '.*'+search+'.*'}});
  }

  async appointments(ip: string) {
    const data = (await usersModel.findOne({ip}));
    const likes = data?.likes;
    return likes;
  }

  async pages(ip: string, n: number) {
    const data: usersType = convertToJSObject(await usersModel.aggregate([
      {$lookup: {
        from: "pages",
        localField: "likes",
        foreignField: "_id",
        as: "pages",
        pipeline: [
          {$skip: 9*n},
          {$limit: 9}
        ]
      }},
      {$match: {ip: ip}},
    ]))[0]?.pages;
    return data ?? [];
  }

  async page_remove(ip: string, _idpage: string) {
    const user: any = await usersModel.findOne({ip});
    let pages = user.likes;
    pages.splice(pages.indexOf(_idpage), 1);
    return await usersModel.updateOne({ip}, {likes: pages});
  }

  async page_add(ip: string, _idpage: string) {
    const user: usersType = convertToJSObject(await usersModel.findOne({ip}));
    let exist = false;
    let pages = user.likes.filter((item: string) => {
      if(item==_idpage) exist = true;
      return item!=_idpage;
    });
    if(!exist) {
      pages.unshift(_idpage);
      return await usersModel.updateOne({ip}, {likes: pages});
    }
    return {status: "error", exist, message: "a página já está marcada na lista de usuário"}
  }

  async page_exist(ip: string, _idpage: string) {
    const user: usersType = convertToJSObject(await usersModel.findOne({ip}));
    let exist = false;
    user?.likes.filter((item: string) => {
      if(item==_idpage) exist = true;
      return item!=_idpage;
    });
    return {status: exist};
  }

  async view_add(ip: string, _idinfo: string) {
    const user = await usersModel.findOne({ip});
    let exist = false;
    let infos = user?.viewed_infos.filter((item: string) => {
      if(item==_idinfo) exist = true;
      return item!=_idinfo;
    });

    if(!exist) {
      infos?.unshift(_idinfo);
      return await usersModel.updateOne({ip}, {viewed_infos: infos});
    }
    return {status: "error", exist, message: "o artigo já foi lido"}
  }

  async create(ip: string) {
    const objeto = {ip};
    return await PagesModel.create(objeto);
  }
})();