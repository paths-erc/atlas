
const cfg = {
  'titles': {
    'label': 'Titles',
    'id_field': 'cc',
    'fields': ['cc', 'workcc', 'msid', 'type']
  },
  'works': {
    'label': 'Works',
    'id_field': 'cmcl',
    'fields': ['cmcl', 'title', 'bhg', 'bhl']
  },
  'manuscripts': {
    'label': 'Manuscripts',
    'id_field': 'id',
    'fields': ['id', 'cmclid', 'tm', 'ldab', 'bookform', 'writingsupport']
  }
};

export default class PreviewFlds {

  static get(tb){
    if (typeof cfg[tb] !== 'undefined') {
      return cfg[tb];
    } else {
      return false;
    }
  }


}
