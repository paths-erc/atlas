/*jshint esversion: 6 */

export default {
  places: {
    discovery_places: {
      id: 'discovery_places',
      title: 'Discovery places of Coptic literary manuscripts',
      filter: { m_msplaces: { type: { _eq: 'discovery' } } }
    },
    storage_places: {
      id: 'storage_places',
      title: 'Storage places of Coptic literary manuscripts',
      filter: { m_msplaces: { type: { _eq: 'storage' } } }
    },
    production_places: {
      id: 'production_places',
      title: 'Production places of Coptic literary manuscripts',
      filter: { m_msplaces: { type: { _eq: 'production' } } }
    },
    episcopal_sees: {
      id: 'episcopal_sees',
      title: 'Episcopal sees',
      filter: { episcopalsee: { _eq: 1 } }
    },
    ms_in_graves: {
      id: 'ms_in_graves',
      title: 'Places where manuscripts used in funerary contexts have been found',
      filter: { id: { _in: [24, 27, 28, 74, 83, 178, 274] } }
    },
    cemeteries: {
      id: 'cemeteries',
      title: 'Catacombs, cemeteries, tombs or necropoleis',
      filter: { _or: [
        { typology: { _eq: 'catacomb, cemetery, necropolis' } },
        { typology: { _eq: 'tomb' } }
      ]}
    },
    hermitages: {
      id: 'hermitages',
      title: 'Hermitage units (mainly referred to the area of Western Thebes)',
      filter: { typology: { _eq: 'hermitage unit(s)' } }
    },
    mines: {
      id: 'mines',
      title: 'Mines or quarries',
      filter: { typology: { _eq: 'mine, quarry' } }
    },
    monasteries: {
      id: 'monasteries',
      title: 'Monasteries',
      filter: { typology: { _eq: 'monastery' } }
    },
    settlements: {
      id: 'settlements',
      title: 'Settlements',
      filter: { typology: { _eq: 'settlement' } }
    },
  },

  titles: {
    final: {
      id: 'final',
      title: 'Final titles',
      filter: { type: { _eq: 'final' } }
    },
    section_headings: {
      id: 'section_headings',
      title: 'Section headings',
      filter: { type: { _eq: 'section heading' } }
    }
  },

  authors: {
    bishops: {
      id: 'bishops',
      title: 'Authors – (arch)bishops',
      filter: { title: { _ends_with: 'bishop' } }
    }
  },

  manuscripts: {
    palimpsest_ms: {
      id: 'palimpsest_ms',
      title: 'Palimpsests',
      filter: { palimpsest: { _eq: 1 } }
    },
    ms_has_bindings: {
      id: 'ms_has_bindings',
      title: 'Manuscripts with ancient bookbindings',
      filter: { bindings: { _eq: 1 } }
    },
    detached_bindings: {
      id: 'detached_bindings',
      title: 'Bookbindings detached from original manuscripts',
      filter: { isbookbinding: { _eq: 1 } }
    },
    horizontal_rolls: {
      id: 'horizontal_rolls',
      title: 'Horizontal rolls',
      filter: { bookform: { _eq: 'horizontal roll' } }
    },
    vertical_rolls: {
      id: 'vertical_rolls',
      title: 'Vertical rolls',
      filter: { bookform: { _eq: 'vertical roll' } }
    },
    minor_dialects: {
      id: 'minor_dialects',
      title: '"Minor" dialects',
      filter: { _and: [
        { dialect: { _ncontains: 'F;' } },
        { dialect: { _ncontains: 'S;' } },
        { dialect: { _ncontains: 'B;' } },
        { dialect: { _ncontains: 'F' } },
        { dialect: { _ncontains: 'B' } }
      ]}
    },
    miniature_codices: {
      id: 'miniature_codices',
      title: 'Miniature codices',
      filter: { _and: [
        { bookform: { _eq: 'codex' } },
        { leafw: { _gt: 0 } },
        { leafw: { _lt: 101 } }
      ]}
    },
    square_codices: {
      id: 'square_codices',
      title: 'Square format codices',
      filter: { _and: [
        { bookform: { _eq: 'codex' } },
        { prophw: { _gt: 0.84 } },
        { prophw: { _lt: 1.16 } }
      ]}
    },
    oblong_codices: {
      id: 'oblong_codices',
      title: 'Oblong format codices',
      filter: { _and: [
        { bookform: { _eq: 'codex' } },
        { prophw: { _gt: 0.84 } }
      ]}
    },
    early_bohairic: {
      id: 'early_bohairic',
      title: 'Early Bohairic manuscripts (up to 7th cent.)',
      filter: { _and: [
        { dialect: { _icontains: 'B' } },
        { chronoto: { _lt: 701 } }
      ]}
    },
    fayyumic: {
      id: 'fayyumic',
      title: 'Fayyumic dialect manuscripts',
      filter: { dialect: { _icontains: 'F' } }
    },
    ms_third_c: {
      id: 'ms_third_c',
      title: 'Manuscripts up to the 3rd Century',
      filter: { chronofrom: { _lt: 301 } }
    },
    ms_forth_c: {
      id: 'ms_forth_c',
      title: 'Manuscripts of the 4th Century',
      filter: { _and: [
        { chronofrom: { _gt: 299 } },
        { chronofrom: { _lt: 400 } }
      ]}
    },
    ms_fifth_c: {
      id: 'ms_fifth_c',
      title: 'Manuscripts of the 5th Century',
      filter: { _and: [
        { chronofrom: { _gt: 399 } },
        { chronofrom: { _lt: 500 } }
      ]}
    },
    ms_sixth_c: {
      id: 'ms_sixth_c',
      title: 'Manuscripts of the 6th Century',
      filter: { _and: [
        { chronofrom: { _gt: 499 } },
        { chronofrom: { _lt: 600 } }
      ]}
    },
    ms_seventh_c: {
      id: 'ms_seventh_c',
      title: 'Manuscripts of the 7th Century',
      filter: { _and: [
        { chronofrom: { _gt: 599 } },
        { chronofrom: { _lt: 700 } }
      ]}
    },
  },

  works: {
    translations_apocryphal: {
      id: 'translations_apocryphal',
      title: 'Early translations of apocryphal works – first phase (4th cent.)',
      filter: { litperiod: { _eq: 'Early translations of apocryphal works – first phase (4th cent.)' } }
    },
    translations_gnostic: {
      id: 'translations_gnostic',
      title: 'Translation and (eventual) re-elaboration of a "Gnostic" corpus (3rd-4th cent.)',
      filter: { litperiod: { _eq: 'Translation and (eventual) re-elaboration of a “Gnostic” corpus (3rd-4th cent.)' } }
    },
    translations_manichaean: {
      id: 'translations_manichaean',
      title: 'Translation and (eventual) re-elaboration of a Manichaean corpus (3th-5th cent.)',
      filter: { litperiod: { _eq: 'Translation and (eventual) re-elaboration of a Manichaean corpus (3th-5th cent.)' } }
    },
    translations_patristic: {
      id: 'translations_patristic',
      title: 'Early translation of patristic works – first phase (3th-5th cent.)',
      filter: { litperiod: { _eq: 'Early translation of patristic works – first phase (3th-5th cent.)' } }
    },
    pachomius: {
      id: 'pachomius',
      title: 'Pachomius and the early Pachomian milieu (4th-5th cent.)',
      filter: { litperiod: { _eq: 'Pachomius and the early Pachomian milieu (4th-5th cent.)' } }
    },
    shenoute: {
      id: 'shenoute',
      title: 'Early original literary production: Shenoute and the Shenoutean milieu (4th-5th cent.)',
      filter: { litperiod: { _eq: 'Early original literary production: Shenoute and the Shenoutean milieu (4th-5th cent.)' } }
    },
    translations_apocryphal_second: {
      id: 'translations_apocryphal_second',
      title: 'Translations of apocryphal texts – second phase (4th-5th cent.)',
      filter: { litperiod: { _eq: 'Translations of apocryphal texts – second phase (4th-5th cent.)' } }
    },
    translations_hagiographical: {
      id: 'translations_hagiographical',
      title: 'Translations of hagiographical works – first phase (4th-6th cent.)',
      filter: { litperiod: { _eq: 'Translations of hagiographical works – first phase (4th-6th cent.)' } }
    },
    classsical_translations_homilies: {
      id: 'classsical_translations_homilies',
      title: '"Classical" translations - homilies (end of 4th-6th cent.)',
      filter: { litperiod: { _eq: '“Classical” translations - homilies (end of 4th-6th cent.)' } }
    },
    classsical_translations_historiae: {
      id: 'classsical_translations_historiae',
      title: '"Classical" translations – historiae monachorum (end of 4th-6th cent.)',
      filter: { litperiod: { _eq: '“Classical” translations – historiae monachorum (end of 4th-6th cent.)' } }
    },
    classical_translations_acts: {
      id: 'classical_translations_acts',
      title: '"Classical" translations – acts of councils and Canones (end of 4th-6th cent.)',
      filter: { litperiod: { _eq: '“Classical” translations – acts of councils and Canones (end of 4th-6th cent.)' } }
    },
    classical_translations_monastic: {
      id: 'classical_translations_monastic',
      title: '"Classical" translations – monastic works (end of 4th-6th cent.)',
      filter: { litperiod: { _eq: '“Classical” translations – monastic works (end of 4th-6th cent.)' } }
    },
    post_chalcedonian: {
      id: 'post_chalcedonian',
      title: 'Post-Chalcedonian opposition literature: the "plerophories" and other works (5th-6th cent.)',
      filter: { litperiod: { _eq: 'Post-Chalcedonian opposition literature: the “plerophories” and other works (5th-6th cent.)' } }
    },
    historiographic: {
      id: 'historiographic',
      title: 'Historiographic Production (6th cent.)',
      filter: { litperiod: { _eq: 'Historiographic Production (6th cent.)' } }
    },
    orig_lit_formation: {
      id: 'orig_lit_formation',
      title: 'Original Literature: Formation of the earlier hagiographic cycles (6 cent.)',
      filter: { litperiod: { _eq: 'Original Literature: Formation of the earlier hagiographic cycles (6 cent.)' } }
    },
    orig_lit_damian_hag: {
      id: 'orig_lit_damian_hag',
      title: 'Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Hagiographies',
      filter: { litperiod: { _eq: 'Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Hagiographies' } }
    },
    orig_lit_damian_hom: {
      id: 'orig_lit_damian_hom',
      title: 'Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Homilies',
      filter: { litperiod: { _eq: 'Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Homilies' } }
    },
    poetry: {
      id: 'poetry',
      title: 'Poetic production (7th-8th cent.)',
      filter: { litperiod: { _eq: 'Poetic production (7th-8th cent.)' } }
    },
    orig_lit_hom: {
      id: 'orig_lit_hom',
      title: 'Original Literature: Homilies with apocryphal insertions (6th -8th cent.)',
      filter: { litperiod: { _eq: 'Original Literature: Homilies with apocryphal insertions (6th -8th cent.)' } }
    },
    original_lit_early_islamic: {
      id: 'original_lit_early_islamic',
      title: 'Original Literature: Literary production of the early Islamic period (7th cent.)',
      filter: { litperiod: { _eq: 'Original Literature: Literary production of the early Islamic period (7th cent.)' } }
    },
    original_lit_later_hag: {
      id: 'original_lit_later_hag',
      title: 'Original Literature: Formation of the later (pseudo-epigraphical) hagiographic cycles and re-arrangement of homiletic production (7th-8th cent.)',
      filter: { litperiod: { _eq: 'Original Literature: Formation of the later (pseudo-epigraphical) hagiographic cycles and re-arrangement of homiletic production (7th-8th cent.)' } }
    },
    late_liturgical: {
      id: 'late_liturgical',
      title: 'Late liturgical production (10th-14th cent.)',
      filter: { litperiod: { _eq: 'Late liturgical production (10th-14th cent.)' } }
    },
  },

  colophons: {
    cryptography: {
      id: 'cryptography',
      title: 'Colophons with cryptography',
      filter: { cryptography: { _eq: 1 } }
    },
    greek_minuscule: {
      id: 'greek_minuscule',
      title: 'Colophons with Greek minuscule',
      filter: { minusculegreek: { _eq: 1 } }
    },
    coptic_minuscule: {
      id: 'coptic_minuscule',
      title: 'Colophons with Coptic minuscule',
      filter: { minusculecopitc: { _eq: 1 } }
    },
    nag_hammadi: {
      id: 'nag_hammadi',
      title: '"Colophons" of the Nag Hammadi Codices',
      filter: { id: { _in: [236, 237, 238, 255, 256, 257] } }
    }
  },

  persons: {
    donors: {
      id: 'donors',
      title: 'Donors',
      filter: { type: { _eq: 'donor' } }
    },
    copyists: {
      id: 'copyists',
      title: 'Copyists',
      filter: { type: { _eq: 'copyist' } }
    }
  },

  map: {
    discovery_places: {
      id: 'discovery_places',
      title: 'Discovery places of Coptic literary manuscripts',
      filter: { m_msplaces: { type: { _eq: 'discovery' } } }
    },
    storage_places: {
      id: 'storage_places',
      title: 'Storage places of Coptic literary manuscripts',
      filter: { m_msplaces: { type: { _eq: 'storage' } } }
    },
    production_places: {
      id: 'production_places',
      title: 'Production places of Coptic literary manuscripts',
      filter: { m_msplaces: { type: { _eq: 'production' } } }
    },
    bishoprics: {
      id: 'bishoprics',
      title: 'Bishoprics',
      filter: { episcopalsee: { _eq: 1 } }
    },
  }
};
