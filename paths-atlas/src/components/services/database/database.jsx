import axios from 'axios';

const baseUrl = 'http://db.localhost/api/paths/';
// const baseUrl = 'https://db.bradypus.net/api/paths/';


export default class Database {

  static getData(tb, params, callback){

    let url = baseUrl + tb;

    axios.get(url, { params: params }).then(res => { callback(res.data); });
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
    this.getData(tb, {
      verb : 'read',
      id : id
    }, d => { cb(d); });
  }

  static inspect(tb, cb) {
    this.getData(tb, {'verb':'inspect'}, d => { cb(d); });
  }

  static getPlaces(cb) {
    this.getData( 'geodata?verb=search&geojson=true&type=encoded&join=JOIN%20paths__places%20ON%20paths__geodata.table_link%20=%20%27paths__places%27%20AND%20paths__geodata.id_link%20=%20paths__places.id&fields%5Bpaths__geodata.geometry%5D=Geometry&fields%5Bpaths__places.id%5D=Id&fields%5Bpaths__places.name%5D=Name&fields%5Bpaths__places.copticname%5D=Coptic%20name&fields%5Bpaths__places.greekname%5D=Greek%20name&fields%5Bpaths__places.egyptianname%5D=Egyptian%20name&fields%5Bpaths__places.pleiades%5D=Pleiades%20Id&fields%5Bpaths__places.typology%5D=Site%20typology&q_encoded=MSBMSU1JVCAwLCA1MDA=', false, d => { cb(d) });

  }
}
