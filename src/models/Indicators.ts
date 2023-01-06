import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { convertToJSObject } from '../tools/Convert';
import Articles, { articlesType } from './Articles';
import Pages, { pagesType } from "./Pages";
import Users, { usersModel, usersType } from "./Users";

type pagesWithCountType = pagesType & {
  lenght: number,
};

type articlesWithCountType = articlesType & {
  lenght: number,
};

export default new (class {
  async least_visited_infos() {
    return await this.saveLocallyOnceADay('infos.json', this.new_least_visited_infos);
  }

  async least_visited_pages() {
    return await this.saveLocallyOnceADay('least.visited.pages.json', this.new_least_visited_pages);
  }

  async users() {
    return await this.saveLocallyOnceADay('users.json', this.new_users);
  }

  private async saveLocallyOnceADay(filename: string, func: any) {
    const date = new Date();
    date.toLocaleString('en-US', {timeZone: 'America/Sao_Paulo'});
    const date_str = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;

    const localdata = resolve(__dirname, '..', 'data', filename);
    let data_str = readFileSync(localdata, 'utf8');
    let data = data_str!=="" ? JSON.parse(data_str) : {};

    if(data.date==undefined || date_str!=data.date || date) {
      data = {
        date: date_str,
        content: await Promise.all(await func())
      }
      data_str = JSON.stringify(await data);
      writeFileSync(localdata, data_str);
    }
    return data;
  }

  private async new_least_visited_pages() {
    const likes = (await Users.store)
      .map((user: usersType) => user.likes).reduce((list, sub) => list.concat(sub), []);
    
    let pages = convertToJSObject(await Pages.allData).map((page: pagesType) => {
      let lenght = 0;
      for(let like of likes) 
        if(like==page._id)
          lenght++;
      return {...page, lenght};
    });

    pages.sort((a: pagesWithCountType, b: pagesWithCountType) => a.lenght - b.lenght);
    return pages;
  }

  private async new_users() {
    let users: usersType[] = convertToJSObject(await usersModel.aggregate([
      {$lookup: {
        from: "pages",
        localField: "likes",
        foreignField: "_id",
        as: "pages"
      }},
      {$project: {
        id: 0,
        likes: 0
      }}
    ]));
    
    users.sort((a: usersType, b: usersType) => {
      const _a = Number(a.ip?.replace(/\.|\-/g, ''));
      const _b = Number(b.ip?.replace(/\.|\-/g, ''));
      return _a - _b;
    });    
    return users;
  }

  private async new_least_visited_infos() {
    const views = (await Users.store)
      .map((user: usersType) => user.viewed_infos)
      .reduce((list, sub) => list.concat(sub), []);

    let infos = convertToJSObject(await Articles.store)
      .map((art: articlesType) => {
        let lenght = 0;
        for(let view of views) 
          if(view==art._id)
            lenght++;
        return {lenght, ...art};
      });
    infos.sort((a: articlesWithCountType, b: articlesWithCountType) => a.lenght - b.lenght);

    return infos;
  }

})();