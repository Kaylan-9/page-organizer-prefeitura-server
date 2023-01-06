import Database from "../database";
import { model, Schema, Model } from 'mongoose';
import { convertToJSObject } from "../tools/Convert";

export interface admsType {
  name: string;
  password?: string;
  permission?: number;
}

interface admsTypeDocument extends admsType, Document {}
interface admsTypeModel extends Model<admsTypeDocument> {}

const admsStructure = {
  name : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  },
  permission : {
    type: Number,
    required: true
  }
};
export const admsSchema = new Schema<admsType>(admsStructure);

export const admsModel = model<admsTypeDocument, admsTypeModel>('adms', admsSchema);

export default new (class extends Database {

  async login(name: string, password: string) {
    const user = convertToJSObject(await admsModel.findOne({name, password}));
    const data = (name=="" && password=="") ? 
      {
        exists: false, 
        msg: "Complete os campos, e clique em acessar!",
      } :
      user==null ? 
        {
          exists: false,
          msg: "Usuário não existe, ou está digitado errado!",
        } :
        {
          ...user,
          exists: true, msg: "Sucesso, acesso permitido!",
        };
    return data;
  }

})();