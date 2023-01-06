import * as dotenv from 'dotenv';
dotenv.config();
import Database from "../database";
import { model, Schema, Model, Types } from 'mongoose';
import { groupsPagesModel } from './GroupsPages';
import https from 'node:https';
import { screenshot } from "../tools/Auto";
import { join } from 'node:path';
import { createHmac } from 'node:crypto';

export interface pagesType {
  _id?: string;
  name?: string;
  link?: string;
  imagename?: string;
  _idgroup?: string;
  creation_date: Date;
}

interface pagesTypeDocument extends pagesType, Document {}
interface pagesTypeModel extends Model<pagesTypeDocument> {}

const pagesStructure = {
  _id : {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name : {
    type: String,
    required: true,
    unique: true
  },
  imagename : {
    type: String,
    unique: true
  },
  link : {
    type: String,
    required: true,
    unique: true
  },
  _idgroup : {
    type: Schema.Types.ObjectId,
    ref: "groupspages"
  },
  creation_date: {
    type: Date,
    required: true
  }
};

export const PagesSchema = new Schema<pagesType>(pagesStructure);

export const PagesModel = model<pagesTypeDocument, pagesTypeModel>('pages', PagesSchema);

export default new (class extends Database {
  async store(n: number) {
    return PagesModel.find().skip(n*9).limit(9);
  }

  get allData() {
    return PagesModel.find();
  }

  search(search: string) {
    return PagesModel.find({name: {$regex: new RegExp(search, 'gi')}});
  }

  group(_id: string) {
    return groupsPagesModel.findById(_id);
  }

  remove(_id: string) {
    return PagesModel.findByIdAndRemove(_id);
  }

  async item(_id: string) {
    return PagesModel.findById(_id);
  }

  async removeList(_ids: string[]) {
    return Promise.all(_ids?.map(async _id => {
      return await PagesModel.findByIdAndDelete(_id);
    }));
  }

  update(_id: string, name?: string, link?: string) {
    let objeto = {name, link};
    return PagesModel.findByIdAndUpdate(_id, objeto);
  }

  private async urlExist(url: string) {
    try {
      https.get(url, () => {});
      return true;
    } catch(err) {
      return false;
    }
  }

  async isonline(url: string) {
    return {ok: await this.urlExist(url)};
  }

  async update_image(imagename: string, link: string) {
    const dirImage = join(__dirname, '..', 'uploads', 'images', 'pages', `${imagename}.jpeg`);
    return await screenshot(dirImage, link);
  }

  async create(_idgroup: string, name: string, link: string) {
    let address_not_exist = await this.urlExist(link);
    if(address_not_exist) {
      const imagename = createHmac('sha256', process.env.CRYKEY as string)
        .update(name)
        .digest('hex');
      const objeto = {
        _idgroup,
        _id: new Types.ObjectId(), 
        creation_date: new Date(),
        name,
        link,
        imagename
      };
      return await PagesModel.create(objeto);
    } else {
      return {status: 'error', message: `Infelizmente a url: ${link}, não está online ou não existe!`};
    }
  }
  
})();