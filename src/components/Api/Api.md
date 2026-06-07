PAThs makes the contents of its database freely available for research and reuse.
Data can be browsed interactively through this atlas or accessed programmatically
via the [BraDypUS v5 REST API](https://docs.bdus.cloud/).

---

## Zotero

All bibliographic data of the PAThs project are freely available in the official Zotero
repository: [https://www.zotero.org/groups/2189557/erc-paths/](https://www.zotero.org/groups/2189557/erc-paths/)

---

## REST API

The atlas uses the **BraDypUS v5 API**. All requests require two query parameters:

| Parameter | Value |
|-----------|-------|
| `api_key` | *(contact the project team)* |
| `app`     | `paths` |

### Endpoints

#### List records
```
GET /api/records/{table}
```
Returns a paginated list of records. Supported tables: `manuscripts`, `places`, `works`,
`authors`, `titles`, `colophons`, `persons`, `collections`.

Optional parameters:
- `page` — page number (default: 1, 30 records per page)
- `filter[field][_op]=value` — filter by field (see operators below)
- `search=text` — full-text search

#### Single record
```
GET /api/record/{table}/{id}
```
Returns a single record with all fields, related data, links and files.

#### Geographic data (map)
```
GET /api/geoface?tb=places
```
Returns a GeoJSON `FeatureCollection` of all places. Accepts the same `filter` syntax
to return a geographic subset (e.g. only discovery places, only episcopal sees).

#### Search configuration
```
GET /api/search/{table}/config
```
Returns the list of searchable fields for the given table.

#### Autocomplete values
```
GET /api/search/{table}/values?fld={field}
```
Returns the list of distinct values for a given field, used to drive autocomplete inputs.

---

### Filter operators

Filters follow the Directus query syntax:

| Operator | Meaning |
|----------|---------|
| `_eq` | exactly equal |
| `_icontains` | case-insensitive substring |
| `_ncontains` | does not contain |
| `_starts_with` | starts with |
| `_ends_with` | ends with |
| `_gt` / `_lt` | greater / less than |
| `_empty` / `_nempty` | null / not null |
| `_in` | value in list |

Multiple filters can be combined with `_and` or `_or` arrays.
Relational fields use dot-notation: `filter[relatedTable][field][_op]=value`.
