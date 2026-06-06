import axios from 'axios';
import qs from 'qs';

const API_BASE = process.env.REACT_APP_API_BASE || '';
const API_KEY  = process.env.REACT_APP_API_KEY;
const APP      = process.env.REACT_APP_APP || 'paths';

const AUTH = { api_key: API_KEY, app: APP };

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets', encode: false }),
});

const onError = (err, cb) => {
  const msg = err?.response?.data?.code || err?.response?.data?.detail || err.message || 'Network error';
  console.error('[Database]', msg);
  cb({ status: 'error', detail: msg });
};

const listParams = (extra, page) => ({ ...AUTH, page: page || 1, ...extra });

const fieldName = fld => fld.includes(':') ? fld.split(':')[1] : fld;

const buildFilter = (tb, fld, op, val) => {
  if (fld.includes(':')) {
    const [fldTb, fldName] = fld.split(':');
    if (fldTb !== tb) {
      return { [fldTb]: { [fldName]: { [op]: val } } };
    }
    return { [fldName]: { [op]: val } };
  }
  return { [fld]: { [op]: val } };
};

export default class Database {

  static getBaseUrl() {
    return `${API_BASE}/projects/${APP}/`;
  }

  static getApp() {
    return APP;
  }

  static getOne(tb, id, cb) {
    api.get(`/record/${tb}/${id}`, { params: AUTH })
      .then(res => cb(res.data))
      .catch(err => onError(err, cb));
  }

  static getAll(tb, page, cb) {
    api.get(`/records/${tb}`, { params: listParams({}, page) })
      .then(res => cb(res.data))
      .catch(err => onError(err, cb));
  }

  static getSimple(tb, fld, val, strict, page, cb) {
    const op = strict ? '_eq' : '_icontains';
    const filter = buildFilter(tb, fld, op, val);
    api.get(`/records/${tb}`, { params: listParams({ filter }, page) })
      .then(res => cb(res.data))
      .catch(err => onError(err, cb));
  }

  static getAdv(tb, rows, page, cb) {
    const entries = Object.values(rows).filter(r => r.f && r.v !== '');
    const hasOr = entries.some(r => r.c === 'OR');
    let filter;
    if (hasOr) {
      filter = { _or: entries.map(r => buildFilter(tb, r.f, r.o, r.v)) };
    } else {
      filter = { _and: entries.map(r => buildFilter(tb, r.f, r.o, r.v)) };
    }
    api.get(`/records/${tb}`, { params: listParams({ filter }, page) })
      .then(res => cb(res.data))
      .catch(err => onError(err, cb));
  }

  static getStr(tb, string, page, cb) {
    api.get(`/records/${tb}`, { params: listParams({ search: string }, page) })
      .then(res => cb(res.data))
      .catch(err => onError(err, cb));
  }

  static getUniqueVal(tb, fld, string, cb) {
    api.get(`/search/${tb}/values`, { params: { ...AUTH, fld } })
      .then(res => cb(res.data.values || []))
      .catch(() => cb([]));
  }

  static inspect(tb, cb) {
    api.get(`/search/${tb}/config`, { params: AUTH })
      .then(res => {
        const fields = {};
        (res.data.fields || []).forEach(f => { fields[f.value] = { label: f.label }; });
        cb({ fields });
      })
      .catch(() => cb({ fields: {} }));
  }

  static getSaved(grp, queryKey, page, cb) {
    const SavedQueries = require('../SavedQueries').default;
    const query = SavedQueries[grp]?.[queryKey];
    if (!query) {
      cb({ status: 'error', detail: `No saved query: ${grp}.${queryKey}` });
      return;
    }
    api.get(`/records/${grp}`, { params: listParams({ filter: query.filter }, page) })
      .then(res => cb(res.data))
      .catch(err => onError(err, cb));
  }

  static getPlaces(filter, cb) {
    const params = { ...AUTH, tb: 'places' };
    if (filter) params.filter = filter;
    api.get('/geoface', { params })
      .then(res => {
        const gj = res.data.geojson;
        if (!gj) { cb(null); return; }
        cb(typeof gj === 'string' ? JSON.parse(gj) : gj);
      })
      .catch(err => onError(err, cb));
  }

  static getMsPlaces(msFilter, cb) {
    const filter = msFilter ? { m_msplaces: { manuscripts: msFilter } } : null;
    Database.getPlaces(filter, cb);
  }

  static getChart(id, cb) {
    cb(null);
  }

  static getData(url, params, cb) {
    cb({ status: 'error', detail: 'ShortSQL not supported in v5' });
  }
}
