import axios from 'axios';

const baseUrl = 'http://db.localhost/api/paths/';
// const baseUrl = 'https://db.bradypus.net/api/paths/';


export default class Database {

  static getData(tb, params, callback){

    let url = baseUrl + tb;

    axios.get(url, { params: params }).then(res => { callback(res.data); });
  }

  static getBaseUrl(){
    return baseUrl;
  }

  static getAdv(tb, data, page, cb)
  {
    data.verb = 'search';
    data.type = 'advanced';
    data.page = page;

    this.getData(tb, data, d => { cb(d); }, true);
  }

  static getStr(tb, string, page, cb)
  {
    this.getData(tb, {
      verb: 'search',
      type: 'fast',
      string: string,
      page: page
    }, d => { cb(d); }, true);
  }

  static getByEncodedSql(tb, sql, page, cb)
  {
      this.getData(tb, {
        verb: 'search',
        type: 'encoded',
        'q_encoded': sql,
        page: page
      }, d => { cb(d); }, true);
  }

  static getAll(tb, page, cb)
  {
    this.getData(tb, {
      verb : 'search',
      type: 'all',
      page: page
    }, d => { cb(d); });
  }

  static getOne(tb, id, cb)
  {
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

  static getPlaces(cb) {
    let url_part = [
      "verb=search",
      "geojson=true",
      "type=encoded",
      "join=JOIN paths__places ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = paths__places.id",
      "fields[paths__geodata.geometry]=Geometry",
      "fields[paths__places.id]=Id",
      "fields[paths__places.name]=Name",
      "fields[paths__places.copticname]=Coptic name",
      "fields[paths__places.greekname]=Greek name",
      "fields[paths__places.egyptianname]=Egyptian name",
      "fields[paths__places.pleiades]=Pleiades Id",
      "fields[paths__places.typology]=Site typology",
      "q_encoded=" + btoa(" 1 LIMIT 0, 500")
    ];

    this.getData(
      'geodata?' + encodeURI(url_part.join('&')),
      false,
      d => { cb(d) }
    );
  }

  static getMsPlaces(ms_where, cb) {
    let url_part = [
      "verb=search",
      "geojson=true",
      "type=encoded",
      "join=JOIN paths__places ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = paths__places.id " +
        " JOIN `paths__m_msplaces` ON `paths__m_msplaces`.`table_link`= 'paths__manuscripts' AND `paths__places`.`id` = `paths__m_msplaces`.`place` ",
      "fields[paths__geodata.geometry]=Geometry",
      "fields[paths__places.id]=Id",
      "fields[paths__places.name]=Name",
      "fields[paths__places.copticname]=Coptic name",
      "fields[paths__places.greekname]=Greek name",
      "fields[paths__places.egyptianname]=Egyptian name",
      "fields[paths__places.pleiades]=Pleiades Id",
      "fields[paths__places.typology]=Site typology",
      "q_encoded=" + btoa(" `paths__m_msplaces`.`id_link` IN (SELECT `id` FROM `paths__manuscripts` WHERE " + ms_where + " ) LIMIT 0, 500")
    ];

    this.getData(
      'geodata?' + encodeURI(url_part.join('&')),
      false,
      d => { cb(d) }
    );

  }
}
