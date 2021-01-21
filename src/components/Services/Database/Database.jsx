import axios from 'axios';
import SavedQueries from '../SavedQueries';


let baseUrl = 'https://bdus.cloud/';

if (window.location.hostname === 'localhost'){
  baseUrl = 'http://bdus.localhost/';
}

baseUrl += 'api/v2/paths/';

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
      if (res.data.type && res.data.type === 'error'){
        console.log(`API error: ${res.data.text}`);
        return false;
      }
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

  static getUniqueVal(tb, fld, string, cb) {
    this.getData('./' + tb, {
      verb: 'getUniqueVal',
      tb: tb.replace('paths__', ''),
      fld: fld,
      s: string
    }, d => { cb(d); }, true);

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

  static getSimple(tb, fld, val, strict, page, cb){
    const data = {
      verb: 'search',
      shortsql: `@${tb}~?${fld.replace(':', '.')}|${ strict ? '=' : 'LIKE' }|${val}`,
      page: page
    };
    this.getData('', data, d => { cb(d); }, true);
  }

  /**
   * Executes an advanced query on the database
   * @param  {String}   tb   Table to be queried, no prefix
   * @param  {Object}   data Object of query data: {a:{f:'fieldname', v:'value', o: 'operator'}, a2:{f:'fieldname', v:'value', o: 'operator', c: 'connector'}}
   * @param  {Integer}   page Page number
   * @param  {Function} cb   Callback function
   */
  static getAdv(tb, data, page, cb) {
    let d = {
      verb: 'search',
      type: 'advanced',
      page: page
    };
    Object.entries(data).forEach(([k, v]) => {
      d[`adv[${k}][fld]`] = v.f;
      d[`adv[${k}][value]`] = v.v;
      d[`adv[${k}][operator]`] = v.o;
      d[`adv[${k}][connector]`] = v.c;
    });

    this.getData(tb, d, d => { cb(d); }, true);
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
    this.getData('', {
      verb : 'search',
      shortsql: `@${tb}`,
      page: page
    }, d => { cb(d); });
  }

  static getOne(tb, id, cb) {
    this.getData('', {
      tb: tb,
      verb : 'read',
      id : id
    }, d => { cb(d); });
  }

  static inspect(tb, cb) {
    this.getData('' , {
      tb: tb,
      'verb':'inspect'
    }, d => { cb(d); });
  }

  static getChart(id, cb) {
    this.getData('' + id, {
      id: id,
      'verb':'getChart'
    }, d => { cb(d); });
  }

  static simplifyGeojson(gj) {
    let newgj = {
      type: "FeatureCollection",
      features: [ ]
    };
    let currentId = false;

    Object.entries(gj.features).forEach( ([key, value]) => {
      if (!currentId || currentId !== value.properties.id){
        newgj.features.push(value);
        currentId = value.properties.id;
      }
      if (currentId === value.properties.id){
        newgj.features[newgj.features.length-1].properties.toponym += '|'+value.properties.toponym;
      }
    });
    return newgj;
  }

  static getPlaces(where, cb) {
    let data = {
      "join": "JOIN paths__geodata as g ON g.table_link = 'paths__places' AND g.id_link = paths__places.id "
      + " JOIN paths__m_toponyms as t ON t.table_link = 'paths__places' AND t.id_link = paths__places.id",
      "fields[g.geometry]": "Geometry",
      "fields[paths__places.id]": "Id",
      "fields[paths__places.name]": "Name",
      "fields[paths__places.pleiades]": "Pleiades Id",
      "fields[paths__places.typology]": "Site typology",
      "fields[GROUP_CONCAT(t.toponym)]": "Toponyms",
      "group": "paths__places.id",
      "limit_start": "0",
      "limit_end": "500",
      "q_encoded": btoa( ( where ? where.replace(/`id`/gi, '`paths__places`.`id`') : " 1" ))
    };

    this.getData(
      'places?verb=search&geojson=true&type=encoded',
      data,
      d => {
        cb( d );
      }
    );
  }

  static getMsPlaces(ms_where, cb) {

    const data = {
      "join": " JOIN paths__places ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = paths__places.id" +
              " JOIN `paths__m_msplaces` ON `paths__m_msplaces`.`table_link`= 'paths__manuscripts' AND `paths__places`.`id` = `paths__m_msplaces`.`place` ",
      "fields[paths__geodata.geometry]": "Geometry",
      "fields[paths__places.id]": "Id",
      "fields[paths__places.name]": "Name",
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
