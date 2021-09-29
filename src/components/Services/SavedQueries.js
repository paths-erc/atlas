/*jshint esversion: 6 */

const makeShortSql = arr => {
  return `?verb=search&shortsql=${arr.join('~')}`;
};

export default {
  places: {
    discovery_places: {
      id: 'discovery_places',
      title: 'Discovery places of Coptic literary manuscripts',
      url: makeShortSql([
          '@places',
          `?id|IN|{@m_msplaces~[place~?table_link|=|paths__manuscripts||and|type|=|discovery}`,
        ]),
      data: {}
    },
    storage_places: {
      id: 'storage_places',
      title: 'Storage places of Coptic literary manuscripts',
      url: makeShortSql([
          '@places',
          `?id|IN|{@m_msplaces~[place~?table_link|=|paths__manuscripts||and|type|=|storage}`
        ]),
      data: {}
    },
    production_places: {
      id: 'production_places',
      title: 'Production places of Coptic literary manuscripts',
      url: makeShortSql([
          '@places',
          `?id|IN|{@m_msplaces~[place~?table_link|=|paths__manuscripts||and|type|=|production}`,
        ]),
      data: {}
    },
    episcopal_sees: {
      id: "episcopal_sees",
      title: "Episcopal sees",
      url: makeShortSql([
        '@places',
        `?episcopalsee|=|1`,
      ]),
      data: {}
    },
    ms_in_graves: {
      id: "ms_in_graves",
      title: "Places where manuscrips used in funerary contexts have been found",
      url: makeShortSql([
        '@places',
        `?id|IN|(24, 27, 28, 74, 83, 178, 274)`,
      ]),
      data: {}
    },
    cemeteries: {
      id: "cemeteries",
      title: "Catacombs, cemeteries tombs or necropoleis",
      url: makeShortSql([
        '@places',
        `?typology|=|catacomb, cemetery, necropolis||or|typology|=|tomb`,
      ]),
      data: {}
    },
    hermitages: {
      id: "hermitages",
      title: "Hermitage units (mainly referred to the area of Western Thebes)",
      url: makeShortSql([
        '@places',
        `?typology|=|hermitage unit(s)`,
      ]),
      data: {}
    },
    mines: {
      id: "mines",
      title: "Mines or quarries",
      url: makeShortSql([
        '@places',
        `?typology|=|mine, quarry`,
      ]),
      data: {}
    },
    monasteries: {
      id: "monasteries",
      title: "Monasteries",
      url: makeShortSql([
        '@places',
        `?typology|=|monastery`,
      ]),
      data: {}
    },
    settlements: {
      id: "settlements",
      title: "Settlement",
      url: makeShortSql([
        '@places',
        `?typology|=|settlement`,
      ]),
      data: {}
    },
  },
  titles: {
    final: {
      id: "final",
      title: "Final titles",
      url: makeShortSql([
        '@titles',
        `?type|=|final`,
      ]),
      data: {}
    },
    section_headings: {
      id: "section_headings",
      title: "Section headings",
      url: makeShortSql([
        '@titles',
        `?type|=|section heading`,
      ]),
      data: {}
    }
  },
  authors: {
    bishops: {
      id: "bishops",
      title: "Authors-(arch)bishops",
      url: makeShortSql([
        '@authors',
        `?title|LIKE|%bishop`,
      ]),
      data: {}
    }
  },
  manuscripts: {
    palimpsest_ms: {
      id: "palimpsest_ms",
      title: "Palimpsests",
      url: makeShortSql([
        '@manuscripts',
        `?palimpsest|=|1`,
      ]),
      data: {}
    },
    wandering_ms: {
      id: "wandering_ms",
      title: "“Wandering” manuscripts (for instance manufactured in a place but stored in another palace, etc.)",
      url: makeShortSql([
        '@manuscripts',
        `[paths__manuscripts.*,{@m_msplaces~[m_msplaces.place|count_distinct~?table_link|=|paths__manuscripts||and|id_link|=|^paths__manuscripts.id}:pl_ms`,
        `?pl_ms|<|1`,
      ]),
      data: {}
    },
    ms_has_bindings: {
      id: "ms_has_bindings",
      title: "Manuscripts with ancient bookbindings",
      url: makeShortSql([
        '@manuscripts',
        `?bindings|=|1`,
      ]),
      data: {}
    },
    detached_bindings: {
      id: "detached_bindings",
      title: "Bookbindings detached from original manuscripts",
      url: makeShortSql([
        '@manuscripts',
        `?isbookbinding|=|1`,
      ]),
      data: {}
    },
    horizontal_rolls : {
      id: "horizontal_rolls",
      title: "Horizontal rolls",
      url: makeShortSql([
        '@manuscripts',
        `?bookform|=|horizontal roll`,
      ]),
      data: {}
    },
    vertical_rolls : {
      id: "vertical_rolls",
      title: "Vertical rolls",
      url: makeShortSql([
        '@manuscripts',
        `?bookform|=|vertical roll`,
      ]),
      data: {}
    },
    minor_dialects : {
      id: "minor_dialects",
      title: "“Minor” dialects",
      url: makeShortSql([
        '@manuscripts',
        `?dialect|not like|%F;%||and|dialect|not like|%S;%||and|dialect|not like|%B;%||and|dialect|not like|%F||and|dialect|not like|%B`,
      ]),
      data: {}
    },
    miniature_codices : {
      id: "miniature_codices",
      title: "Miniature codices",
      url: makeShortSql([
        '@manuscripts',
        `?bookform|=|codex||and|leafw|>|0||and|leafw|<|101`,
      ]),
      data: {}
    },
    square_codices : {
      id: "square_codices",
      title: "Square format codices",
      url: makeShortSql([
        '@manuscripts',
        `?bookform|=|codex||and|prophw|>|.84||and|prophw|<|1.16`,
      ]),
      data: {}
    },
    oblong_codices : {
      id: "oblong_codices",
      title: "Oblong format codices",
      url: makeShortSql([
        '@manuscripts',
        `?bookform|=|codex||and|prophw|>|.84`,
      ]),
      data: {}
    },
    early_bohairic: {
      id: "early_bohairic",
      title: "Early Bohairic manuscripts (up to 7th cent.)",
      url: makeShortSql([
        '@manuscripts',
        `?dialect|like|%B%||and|chronoto|<|701`,
      ]),
      data: {}
    },
    fayyumic: {
      id: "fayyumic",
      title: "Fayyumic dialect manuscripts",
      url: makeShortSql([
        '@manuscripts',
        `?dialect|like|%F%`,
      ]),
      data: {}
    },
    ms_third_c: {
      id: "ms_third_c",
      title: "Manuscripts up to the 3rd Century",
      url: makeShortSql([
        '@manuscripts',
        `?chronofrom|<|301`,
      ]),
      data: {}
    },
    ms_forth_c: {
      id: "ms_forth_c",
      title: "Manuscripts of the 4th Century",
      url: makeShortSql([
        '@manuscripts',
        `?chronofrom|>|299||and|chronofrom|<|400`,
      ]),
      data: {}
    },
    ms_fifth_c: {
      id: "ms_fifth_c",
      title: "Manuscripts of the 5th Century",
      url: makeShortSql([
        '@manuscripts',
        `?chronofrom|>|399||and|chronofrom|<|500`,
      ]),
      data: {}
    },
    ms_sixth_c: {
      id: "ms_sixth_c",
      title: "Manuscripts of the 6th Century",
      url: makeShortSql([
        '@manuscripts',
        `?chronofrom|>|499||and|chronofrom|<|600`,
      ]),
      data: {}
    },
    ms_seventh_c: {
      id: "ms_seventh_c",
      title: "Manuscripts of the 7th Century",
      url: makeShortSql([
        '@manuscripts',
        `?chronofrom|>|599||and|chronofrom|<|700`,
      ]),
      data: {}
    },
    
  },
  works: {
    // translations_biblical_sahidic: {
    //   id: "translations_biblical_sahidic",
    //   title: "Translations of biblical works into Sahidic - first phase (3rd-4th cent.)",
    //   url: makeShortSql([
    //     '@works',
    //     `?litperiod|=|Translations of biblical works into Sahidic - first phase (3rd-4th cent.)`,
    //   ]),
    //   data: {}
    // },
    // translations_biblical_bohairic: {
    //   id: "translations_biblical_bohairic",
    //   title: "Translations of biblical works into Bohairic - first phase (4th cent.)",
    //   url: makeShortSql([
    //     '@works',
    //     `?litperiod|=|Translations of biblical works into Bohairic - first phase (4th cent.)`,
    //   ]),
    //   data: {}
    // },
    // early_translations_other: {
    //   id: "early_translations_other",
    //   title: "Translations of biblical works into, Akhmimic, Lykopolitan, Oxyrhyrinchite, Fayyumic, etc. (4th cent.)",
    //   url: makeShortSql([
    //     '@works',
    //     `?litperiod|=|Translations of biblical works into, Akhmimic, Lykopolitan, Oxyrhyrinchite, Fayyumic, etc. (4th cent.)`,
    //   ]),
    //   data: {}
    // },
    translations_apocryphal: {
      id: "translations_apocryphal",
      title: "Early translations of apocryphal works – first phase (4th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Early translations of apocryphal works – first phase (4th cent.)`,
      ]),
      data: {}
    },
    translations_gnostic: {
      id: "translations_gnostic",
      title: "Translation and (eventual) re-elaboration of a “Gnostic” corpus (3rd-4th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Translation and (eventual) re-elaboration of a “Gnostic” corpus (3rd-4th cent.)`,
      ]),
      data: {}
    },
    translations_manichaean: {
      id: "translations_manichaean",
      title: "Translation and (eventual) re-elaboration of a Manichaean corpus (3th-5th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Translation and (eventual) re-elaboration of a Manichaean corpus (3th-5th cent.)`,
      ]),
      data: {}
    },
    translations_patristic: {
      id: "translations_patristic",
      title: "Early translation of patristic works – first phase (3th-5th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Early translation of patristic works – first phase (3th-5th cent.)`,
      ]),
      data: {}
    },
    pachomius: {
      id: "pachomius",
      title: "Pachomius and the early Pachomian milieu (4th-5th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Pachomius and the early Pachomian milieu (4th-5th cent.)`,
      ]),
      data: {}
    },
    shenoute: {
      id: "shenoute",
      title: "Early original literary production: Shenoute and the Shenoutean milieu (4th-5th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Early original literary production: Shenoute and the Shenoutean milieu (4th-5th cent.)`,
      ]),
      data: {}
    },
    // standard_translations: {
    //   id: "standard_translations",
    //   title: "“Standard” translations of biblical works into Sahidic (5th cent.)",
    //   url: makeShortSql([
    //     '@works',
    //     `?litperiod|=|“Standard” translations of biblical works into Sahidic (5th cent.)`,
    //   ]),
    //   data: {}
    // },
    translations_apocryphal_second: {
      id: "translations_apocryphal_second",
      title: "Translations of apocryphal texts – second phase (4th-5th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Translations of apocryphal texts – second phase (4th-5th cent.)`,
      ]),
      data: {}
    },
    translations_hagiographical: {
      id: "translations_hagiographical",
      title: "Translations of hagiographical works – first phase (4th-6th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Translations of hagiographical works – first phase (4th-6th cent.)`,
      ]),
      data: {}
    },
    classsical_translations_homilies: {
      id: "classsical_translations_homilies",
      title: "“Classical” translations - homilies (end of 4th-6th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|“Classical” translations - homilies (end of 4th-6th cent.)`,
      ]),
      data: {}
    },
    classsical_translations_historiae: {
      id: "classsical_translations_historiae",
      title: "“Classical” translations – historiae monachorum (end of 4th-6th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|“Classical” translations – historiae monachorum (end of 4th-6th cent.)`,
      ]),
      data: {}
    },
    classical_translations_acts: {
      id: "classical_translations_acts",
      title: "“Classical” translations – acts of councils and Canones (end of 4th-6th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|“Classical” translations – acts of councils and Canones (end of 4th-6th cent.)`,
      ]),
      data: {}
    },
    classical_translations_monastic: {
      id: "classical_translations_monastic",
      title: "“Classical” translations – monastic works (end of 4th-6th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|“Classical” translations – monastic works (end of 4th-6th cent.)`,
      ]),
      data: {}
    },
    post_chalcedonian: {
      id: "post_chalcedonian",
      title: "Post-Chalcedonian opposition literature: the “plerophories” and other works (5th-6th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Post-Chalcedonian opposition literature: the “plerophories” and other works (5th-6th cent.)`,
      ]),
      data: {}
    },
    historiographic: {
      id: "historiographic",
      title: "Historiographic Production (6th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Historiographic Production (6th cent.)`,
      ]),
      data: {}
    },
    orig_lit_formation: {
      id: "orig_lit_formation",
      title: "Original Literature: Formation of the earlier hagiographic cycles (6 cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Original Literature: Formation of the earlier hagiographic cycles (6 cent.)`,
      ]),
      data: {}
    },
    orig_lit_damian_hag: {
      id: "orig_lit_damian_hag",
      title: "Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Hagiographies",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Hagiographies`,
      ]),
      data: {}
    },
    orig_lit_damian_hom: {
      id: "orig_lit_damian_hom",
      title: "Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Homilies",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Homilies`,
      ]),
      data: {}
    },
    poetry: {
      id: "poetry",
      title: "Poetic production (7th-8th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Poetic production (7th-8th cent.)`,
      ]),
      data: {}
    },
    orig_lit_hom: {
      id: "orig_lit_hom",
      title: "Original Literature: Homilies with apocryphal insertions (6th -8th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Original Literature: Homilies with apocryphal insertions (6th -8th cent.)`,
      ]),
      data: {}
    },
    original_lit_early_islamic: {
      id: "original_lit_early_islamic",
      title: "Original Literature: Literary production of the early Islamic period (7th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Original Literature: Literary production of the early Islamic period (7th cent.)`,
      ]),
      data: {}
    },
    // standard_translations_in_bohairic: {
    //   id: "standard_translations_in_bohairic",
    //   title: "“Standard” translations of biblical works into Bohairic (7th-8th cent.)",
    //   url: makeShortSql([
    //     '@works',
    //     `?litperiod|=|“Standard” translations of biblical works into Bohairic (7th-8th cent.)`,
    //   ]),
    //   data: {}
    // },
    original_lit_later_hag: {
      id: "original_lit_later_hag",
      title: "Original Literature: Formation of the later (pseudo-epigraphical) hagiographic cycles and re-arrangement of homiletic production (7th-8th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Original Literature: Formation of the later (pseudo-epigraphical) hagiographic cycles and re-arrangement of homiletic production (7th-8th cent.)`,
      ]),
      data: {}
    },
    // synaxarial: {
    //   id: "synaxarial",
    //   title: "Synaxarial arrangement (9th-10th cent.)",
    //   url: makeShortSql([
    //     '@works',
    //     `?litperiod|=|Synaxarial arrangement (9th-10th cent.)`,
    //   ]),
    //   data: {}
    // },
    late_liturgical: {
      id: "late_liturgical",
      title: "Late liturgical production (10th-14th cent.)",
      url: makeShortSql([
        '@works',
        `?litperiod|=|Late liturgical production (10th-14th cent.)`,
      ]),
      data: {}
    },
  },
  colophons: {
    cryptography: {
      id: 'cryptography',
      title: "Colophons with cryptography",
      url: makeShortSql([
        '@colophons',
        `?cryptography|=|1`,
      ]),
      data: {}
    },
    greek_minuscule: {
      id: 'greek_minuscule',
      title: "Colophons with Greek minuscule",
      url: makeShortSql([
        '@colophons',
        `?minusculegreek|=|1`,
      ]),
      data: {}
    },
    coptic_minuscule: {
      id: 'coptic_minuscule',
      title: "Colophons with Coptic minuscule",
      url: makeShortSql([
        '@colophons',
        `?minusminusculecopitcculegreek|=|1`,
      ]),
      data: {}
    }
  },
  persons: {
    donors: {
      id: 'donors',
      title: 'Donors',
      url: makeShortSql([
        '@persons',
        `?type|=|donor`,
      ]),
      data: {}
    },
    copyists: {
      id: 'copyists',
      title: 'Copyists',
      url: makeShortSql([
        '@persons',
        `?type|=|copyist`,
      ]),
      data: {}
    }
  },
  map: {
    discovery_places: {
      id: 'discovery_places',
      title: 'Discovery places of Coptic literary manuscripts',
      url: makeShortSql([
        '@places',
        '[geodata.geometry,places.id,places.name,places.pleiades,places.typology,{!@m_msplaces~[id|count~?place|=|^places.id}:tot_ms',
        '?places.id|in|{@m_msplaces~[place~?table_link|=|paths__manuscripts||and|type|=|discovery}',
        '-500:0'
      ]) + '&geojson=1',
      data: {}
    },
    storage_places: {
      id: 'storage_places',
      title: 'Storage places of Coptic literary manuscripts',
      url: makeShortSql([
        '@places',
        '[geodata.geometry,places.id,places.name,places.pleiades,places.typology,{!@m_msplaces~[id|count~?place|=|^places.id}:tot_ms',
        '?places.id|in|{@m_msplaces~[place~?table_link|=|paths__manuscripts||and|type|=|storage}',
        '-500:0'
      ]) + '&geojson=1',
      data: {}
    },
    production_places: {
      id: 'production_places',
      title: 'Production places of Coptic literary manuscripts',
      url: makeShortSql([
        '@places',
        '[geodata.geometry,places.id,places.name,places.pleiades,places.typology,{!@m_msplaces~[id|count~?place|=|^places.id}:tot_ms',
        '?places.id|in|{@m_msplaces~[place~?table_link|=|paths__manuscripts||and|type|=|production}',
        '-500:0'
      ]) + '&geojson=1',
      data: {}
    },
    all_ms_places: {
      id: 'all_ms_places',
      title: 'All places connected to manuscripts',
      url: makeShortSql([
        '@places',
        '[geodata.geometry,places.id,places.name,places.pleiades,places.typology,{!@m_msplaces~[id|count~?place|=|^places.id}:tot_ms',
        '-500:0',
        '?tot_ms|>|^0'
      ]) + '&geojson=1',
      data: {}
    },
    bishoprics: {
      id: 'bishoprics',
      title: 'Bishoprics',
      url: makeShortSql([
        '@places',
        '[geodata.geometry,places.id,places.name,places.pleiades,places.typology',
        '?episcopalsee|=|1',
        '-500:0'
      ]) + '&geojson=1',
      data: {}
    },
  }
};
