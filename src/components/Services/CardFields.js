/**
 * Per-table choice of the fields shown in the result cards, persisted in the
 * browser (localStorage). `null` means "use the defaults from Cfg.preview".
 */
const PREFIX = 'atlas.cardFields.';

/** Max number of fields a user can show in a card */
export const MAX_FIELDS = 8;

const VALID = /^[a-z0-9_]+$/i;

const clean = list => {
  if (!Array.isArray(list)) {
    return null;
  }
  const out = Array.from(new Set(list.filter(f => typeof f === 'string' && VALID.test(f))));
  return out.length > 0 ? out.slice(0, MAX_FIELDS) : null;
};

const CardFields = {

  get(tb) {
    try {
      return clean(JSON.parse(window.localStorage.getItem(PREFIX + tb)));
    } catch (e) {
      return null;
    }
  },

  set(tb, list) {
    try {
      const value = clean(list);
      if (value) {
        window.localStorage.setItem(PREFIX + tb, JSON.stringify(value));
      } else {
        window.localStorage.removeItem(PREFIX + tb);
      }
    } catch (e) {
      // storage unavailable (private mode, blocked): the choice lasts for the session only
    }
  },

  reset(tb) {
    CardFields.set(tb, null);
  }
};

export default CardFields;
