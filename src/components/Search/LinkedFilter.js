import qs from 'qs';

/**
 * "Linked" searches carry a ready-made API filter in the URL (`?filter=<json>`)
 * instead of one form row per condition. They come from the record links and
 * backlinks, whose filters can be arbitrarily long (e.g. 40+ ids) or relational,
 * and therefore cannot be edited in the advanced-search form.
 */

// the API rejects/ignores blank list members (BraDypUS can emit `""` in `_in`)
const clean = node => {
  if (Array.isArray(node)) {
    return node.filter(v => v !== '' && v !== null && v !== undefined);
  }
  if (node && typeof node === 'object') {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, clean(v)]));
  }
  return node;
};

export const cleanFilter = clean;

/**
 * Query string of a linked search.
 * `from` is the source record as `table:id`, shown in the banner.
 */
export const linkedQuery = (filter, from) => qs.stringify({
  filter: JSON.stringify(clean(filter)),
  ...(from ? { from } : {})
});

/**
 * Older backlink URLs spelled `id IN (...)` as one `_eq` row per id joined by OR.
 * Recognise them (same field, `_eq`, OR) so that existing links keep working
 * and are shown as a linked search too.
 */
const legacyRowsToFilter = rows => {
  const list = Object.values(rows);
  if (list.length < 2) { return null; }
  const fld = list[0].f;
  const ok = list.every((r, i) => (
    r && r.f === fld && r.o === '_eq' && (i === 0 || r.c === 'OR')
  ));
  if (!ok) { return null; }
  const values = list.map(r => r.v).filter(v => v !== '');
  return { [fld]: { _in: values.map(v => (/^\d+$/.test(v) ? Number(v) : v)) } };
};

/**
 * Parse a search query string; returns `{ filter, from }` for a linked search,
 * `null` for a plain advanced-search form.
 */
export const parseLinked = search => {
  const q = qs.parse(search, { ignoreQueryPrefix: true });
  if (typeof q.filter === 'string') {
    try {
      const filter = JSON.parse(q.filter);
      if (filter && typeof filter === 'object') {
        return { filter, from: typeof q.from === 'string' ? q.from : null };
      }
    } catch (e) {
      // malformed filter: fall through to the form
    }
  }
  const { page, ...rows } = q;
  if (Object.keys(rows).length && Object.values(rows).every(r => r && typeof r === 'object')) {
    const filter = legacyRowsToFilter(rows);
    if (filter) { return { filter, from: null }; }
  }
  return null;
};
