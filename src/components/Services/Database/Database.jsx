import axios from 'axios';
import SavedQueries from '../SavedQueries';


let baseUrl = 'https://db-dev.bradypus.net/api/paths/';

if (window.location.hostname === 'localhost'){
  baseUrl = 'http://db.localhost/api/paths/';
}

export default class Database {

  static getData(url, params, callback) {

    url = baseUrl + url;

    axios({
      method: 'post',
      url: url,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      callback(res.data);
    })
    .catch( res => {
      if(res instanceof Error) {
        console.log(res.message);
      } else {
        console.log(res.data);
      }
    });
  }

  static getBaseUrl(){
    return baseUrl;
  }

  static getSaved(grp, q, page, cb) {

    if (typeof SavedQueries[grp][q] === 'undefined') {
      cb({
        status: 'error',
        text: `No saved query found for id: ${grp}.${q}`
      });
      return;
    } else {
      SavedQueries[grp][q].data.page = page;
      this.getData(SavedQueries[grp][q].url, SavedQueries[grp][q].data, d => {
        cb(d, SavedQueries[grp][q].title);
      });
    }
  }

  static getAdv(tb, data, page, cb) {
    data.verb = 'search';
    data.type = 'advanced';
    data.page = page;

    this.getData(tb, data, d => { cb(d); }, true);
  }

  static getStr(tb, string, page, cb) {
    this.getData(tb, {
      verb: 'search',
      type: 'fast',
      string: string,
      page: page
    }, d => { cb(d, 'Search [' + string + '] in ' + d.head.table_label); }, true);
  }

  static getByEncodedSql(tb, sql, page, cb) {
      this.getData(tb, {
        verb: 'search',
        type: 'encoded',
        'q_encoded': sql,
        page: page
      }, d => { cb(d); }, true);
  }

  static getAll(tb, page, cb) {
    this.getData(tb, {
      verb : 'search',
      type: 'all',
      page: page
    }, d => { cb(d); });
  }

  static getOne(tb, id, cb) {
    this.getData('../v2/paths/' + tb, {
      tb: tb,
      verb : 'read',
      id : id
    }, d => { cb(d); });
  }

  static inspect(tb, cb) {
    this.getData('../v2/paths/' + tb, {
      tb: tb,
      'verb':'inspect'
    }, d => { cb(d); });
  }

  static getPlaces(where, cb) {
    let data = {
      "join": "JOIN paths__places ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = paths__places.id",
      "fields[paths__geodata.geometry]": "Geometry",
      "fields[paths__places.id]": "Id",
      "fields[paths__places.name]": "Name",
      "fields[paths__places.copticname]": "Coptic name",
      "fields[paths__places.greekname]": "Greek name",
      "fields[paths__places.egyptianname]": "Egyptian name",
      "fields[paths__places.pleiades]": "Pleiades Id",
      "fields[paths__places.typology]": "Site typology",
      "q_encoded": btoa( ( where ? where.replace(/`(.*)`/gi, '`paths__places`.`$1`') : " 1 LIMIT 0, 500" ))
    };

    this.getData(
      'geodata?verb=search&geojson=true&type=encoded',
      data,
      d => { cb(d) }
    );
  }

  static getMsPlaces(ms_where, cb) {
    const data = {
      "join": " JOIN paths__places ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = paths__places.id" +
              " JOIN `paths__m_msplaces` ON `paths__m_msplaces`.`table_link`= 'paths__manuscripts' AND `paths__places`.`id` = `paths__m_msplaces`.`place` ",
      "fields[paths__geodata.geometry]": "Geometry",
      "fields[paths__places.id]": "Id",
      "fields[paths__places.name]": "Name",
      "fields[paths__places.copticname]": "Coptic name",
      "fields[paths__places.greekname]": "Greek name",
      "fields[paths__places.egyptianname]": "Egyptian name",
      "fields[paths__places.pleiades]": "Pleiades Id",
      "fields[paths__places.typology]": "Site typology",
      "fields[paths__m_msplaces.type]": "Place type",
      "group": "paths__places.id",
      "limit_start": "0",
      "limit_end": "500",
      "q_encoded": btoa(" `paths__m_msplaces`.`id_link` IN (SELECT `id` FROM `paths__manuscripts` WHERE " + ms_where + " )")
    };
    this.getData(
      'geodata?verb=search&geojson=true&type=encoded',
      data,
      d => { cb(d) }
    );
  }

}
