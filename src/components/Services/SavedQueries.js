/*jshint esversion: 6 */

export default {
  places: {
    discovery_places: {
      id: 'discovery_places',
      title: 'Discovery places of Coptic literary manuscripts',
      url: 'places?verb=search&type=encoded',
      data: {
        "join": " JOIN `paths__m_msplaces` as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `paths__places`.`id` = `mp`.`place` ",
        "group": "paths__places.id",
        "limit_start": "0",
        "limit_end": "500",
        "q_encoded": btoa(" `mp`.`type` = 'discovery' ")
      }
    },
    storage_places: {
      id: 'storage_places',
      title: 'Storage places of Coptic literary manuscripts',
      url: 'places?verb=search&type=encoded',
      data: {
        "join": " JOIN `paths__m_msplaces` as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `paths__places`.`id` = `mp`.`place` ",
        "group": "paths__places.id",
        "limit_start": "0",
        "limit_end": "500",
        "q_encoded": btoa(" `mp`.`type` = 'storage' ")
      }
    },
    production_places: {
      id: 'production_places',
      title: 'Production places of Coptic literary manuscripts',
      url: 'places?verb=search&type=encoded',
      data: {
        "join": " JOIN `paths__m_msplaces` as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `paths__places`.`id` = `mp`.`place` ",
        "group": "paths__places.id",
        "limit_start": "0",
        "limit_end": "500",
        "q_encoded": btoa(" `mp`.`type` = 'production' ")
      }
    },
    episcopal_sees: {
      id: "episcopal_sees",
      title: "Episcopal sees",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`episcopalsee`=1")
      }
    },
    ms_in_graves: {
      id: "ms_in_graves",
      title: "Places with manuscrips used in funerary context",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`id` IN (24, 28, 74, 83, 174, 178, 274)")
      }
    },
    // has_monasteries: {
    //   id: "has_monasteries",
    //   title: "Sites with one or more monasteries",
    //   url: 'places?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`hasmonastery` = 1")
    //   }
    // },
    churches: {
      id: "churches",
      title: "Churches",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'church'")
      }
    },
    cemeteries: {
      id: "cemeteries",
      title: "Catacombs, cemeteries tombs or necropoleis",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'catacomb, cemetery, necropolis' OR `typology` = 'tomb'")
      }
    },
    // forts: {
    //   id: "forts",
    //   title: "Forts or towers",
    //   url: 'places?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`typology` = 'fort, tower'")
    //   }
    // },
    hermitages: {
      id: "hermitages",
      title: "Hermitage units (mainly referred to the area of Western Thebes)",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'hermitage unit(s)'")
      }
    },
    mines: {
      id: "mines",
      title: "Mines or quarries",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'mine, quarry'")
      }
    },
    monasteries: {
      id: "monasteries",
      title: "Monasteries",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'monastery'")
      }
    },
    settlements: {
      id: "settlements",
      title: "Settlement",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'settlement'")
      }
    },
    // shrines: {
    //   id: "shrines",
    //   title: "Shrines",
    //   url: 'places?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`typology` = 'shrine'")
    //   }
    // },
  },
  titles: {
    final: {
      id: "final",
      title: "Final titles",
      url: "titles?verb=search&type=encoded",
      data: {
        q_encoded: btoa(" `type` = 'final'")
      }
    },
    section_headings: {
      id: "section_headings",
      title: "Section headings",
      url: "titles?verb=search&type=encoded",
      data: {
        q_encoded: btoa(" `type` = 'section heading'")
      }
    }
  },
  authors: {
    bishops: {
      id: "bishops",
      title: "Authors-(arch)bishops",
      url: 'authors?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(" `title` LIKE '%bishop' ")
      }
    }
  },
  manuscripts: {
    palimpsest_ms: {
      id: "palimpsest_ms",
      title: "Palimpsest manuscripts",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`palimpsest` = 1")
      }
    },
    wandering_ms: {
      id: "wandering_ms",
      title: "“Wandering” manuscripts (for instance manufactured in a place but stored in another palace, etc.)",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`id` IN ( SELECT `mp`.`id_link` FROM `paths__m_msplaces` as `mp` GROUP BY `mp`.`id_link` HAVING COUNT(DISTINCT `place`) > 1 )")
      }
    },
    ms_has_bindings: {
      id: "ms_has_bindings",
      title: "Manuscripts with ancient bookbindings",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`bindings`=1")
      }
    },
    detached_bindings: {
      id: "detached_bindings",
      title: "Bookbindings detached from original manuscripts",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`isbookbinding`=1")
      }
    },
    horizontal_rolls : {
      id: "horizontal_rolls",
      title: "Horizontal rolls",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`bookform` = 'horizontal roll'")
      }
    },
    vertical_rolls : {
      id: "vertical_rolls",
      title: "Vertical rolls",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`bookform` = 'vertical roll'")
      }
    },
    minor_dialects : {
      id: "minor_dialects",
      title: "“Minor” dialects",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`dialect` NOT LIKE '%F;%' AND `dialect` NOT LIKE '%S;%' AND `dialect` NOT LIKE '%B;%' AND `dialect` NOT LIKE '%F' AND `dialect` NOT LIKE '%S' AND `dialect` NOT LIKE '%B'")
      }
    },
    miniature_codices : {
      id: "miniature_codices",
      title: "Miniature codices",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`leafw`<101 AND `leafw`>0 AND `bookform` = 'codex'")
      }
    },
    square_codices : {
      id: "square_codices",
      title: "Square format codices",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`bookform`='codex' AND `prophw`>.84 AND `prophw`<1.16")
      }
    },
    oblong_codices : {
      id: "oblong_codices",
      title: "Oblong format codices",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`bookform`='codex' AND `prophw`>1.84")
      }
    },
    // ms_with_date: {
    //   id: "ms_with_date",
    //   title: "Dated manuscripts",
    //   url: 'manuscripts?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("(`chronofrom`!='' AND `chronofrom` IS NOT NULL) OR (`chronoto`!='' AND `chronoto` IS NOT NULL)")
    //   }
    // },
    early_bohairic: {
      id: "early_bohairic",
      title: "Early Bohairic manuscripts (up to 7th cent.)",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`dialect` LIKE '%B%' AND `chronoto`<'701'")
      }
    },
    fayyumic: {
      id: "fayyumic",
      title: "Fayyumic dialect manuscripts",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`dialect` LIKE '%F%' ")
      }
    },
    ms_third_c: {
      id: "ms_third_c",
      title: "Manuscripts up to the 3rd Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` < 301")
      }
    },
    ms_forth_c: {
      id: "ms_forth_c",
      title: "Manuscripts of the 4th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 299 AND `chronofrom` < 400")
      }
    },
    ms_fifth_c: {
      id: "ms_fifth_c",
      title: "Manuscripts of the 5th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 399 AND `chronofrom` < 500")
      }
    },
    ms_sixth_c: {
      id: "ms_sixth_c",
      title: "Manuscripts of the 6th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 499 AND `chronofrom` < 600")
      }
    },
    ms_seventh_c: {
      id: "ms_seventh_c",
      title: "Manuscripts of the 7th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 599 AND `chronofrom` < 700")
      }
    },
    // ms_eighth_c: {
    //   id: "ms_eighth_c",
    //   title: "Manuscripts of the 8th Century",
    //   url: 'manuscripts?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`chronofrom` > 699  AND `chronofrom` < 800")
    //   }
    // },
    // ms_ninth_c: {
    //   id: "ms_ninth_c",
    //   title: "Manuscripts of the 9th Century",
    //   url: 'manuscripts?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`chronofrom` > 799 AND `chronofrom` < 900")
    //   }
    // },
    // ms_tenth_c: {
    //   id: "ms_tenth_c",
    //   title: "Manuscripts of the 10th Century",
    //   url: 'manuscripts?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`chronofrom` > 899 AND `chronofrom` < 1000")
    //   }
    // },
    // ms_eleventh_c: {
    //   id: "ms_eleventh_c",
    //   title: "Manuscripts of the 11th Century",
    //   url: 'manuscripts?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`chronofrom` > 999 AND `chronofrom` < 1100")
    //   }
    // },
    // ms_post_eleventh_c: {
    //   id: "ms_post_eleventh_c",
    //   title: "Manuscripts after the 11th Century",
    //   url: 'manuscripts?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("`chronofrom` > 1099")
    //   }
    // }
  },
  works: {
    translations_biblical_sahidic: {
      id: "translations_biblical_sahidic",
      title: "Translations of biblical works into Sahidic - first phase (3rd-4th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(" `litperiod` = 'Translations of biblical works into Sahidic - first phase (3rd-4th cent.)'")
      }
    },
    translations_biblical_bohairic: {
      id: "translations_biblical_bohairic",
      title: "Translations of biblical works into Bohairic - first phase (4th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(" `litperiod` = 'Translations of biblical works into Bohairic - first phase (4th cent.)")
      }
    },
    early_translations_other: {
      id: "early_translations_other",
      title: "Translations of biblical works into, Akhmimic, Lykopolitan, Oxyrhyrinchite, Fayyumic, etc. (4th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(" `litperiod` = 'Translations of biblical works into, Akhmimic, Lykopolitan, Oxyrhyrinchite, Fayyumic, etc. (4th cent.)'")
      }
    },
    translations_apocryphal: {
      id: "translations_apocryphal",
      title: "Translations of apocryphal works – first phase (4th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent(" `litperiod` = 'Translations of apocryphal works – first phase (4th cent.)'")))
      }
    },
    translations_gnostic: {
      id: "translations_gnostic",
      title: "Translation and (eventual) re-elaboration of a “Gnostic” corpus (3rd-4th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Translation and (eventual) re-elaboration of a “Gnostic” corpus (3rd-4th cent.)' ")))
      }
    },
    translations_manichaean: {
      id: "translations_manichaean",
      title: "Translation and (eventual) re-elaboration of a Manichaean corpus (3th-5th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Translation and (eventual) re-elaboration of a Manichaean corpus (3th-5th cent.)' ")))
      }
    },
    translations_patristic: {
      id: "translations_patristic",
      title: "Translation of patristic works – first phase (3th-5th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Translation of patristic works – first phase (3th-5th cent.)' ")))
      }
    },
    pachomius: {
      id: "pachomius",
      title: "Pachomius and the early Pachomian milieu (4th-5th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Pachomius and the early Pachomian milieu (4th-5th cent.)' ")))
      }
    },
    shenoute: {
      id: "shenoute",
      title: "Early original literary production: Shenoute and the Shenoutean milieu (4th-5th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Early original literary production: Shenoute and the Shenoutean milieu (4th-5th cent.)' ")))
      }
    },
    standard_translations: {
      id: "standard_translations",
      title: "“Standard” translations of biblical works into Sahidic (5th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = '“Standard” translations of biblical works into Sahidic (5th cent.)' ")))
      }
    },
    translations_apocryphal_second: {
      id: "translations_apocryphal_second",
      title: "Translations of apocryphal texts – second phase (4th-5th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Translations of apocryphal texts – second phase (4th-5th cent.)' ")))
      }
    },
    translations_hagiographical: {
      id: "translations_hagiographical",
      title: "Translations of hagiographical works – first phase (4th-6th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Translations of hagiographical works – first phase (4th-6th cent.)' ")))
      }
    },
    classsical_translations_homilies: {
      id: "classsical_translations_homilies",
      title: "“Classical” translations - homilies (end of 4th-6th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = '“Classical” translations - homilies (end of 4th-6th cent.)' ")))
      }
    },
    classsical_translations_historiae: {
      id: "classsical_translations_historiae",
      title: "“Classical” translations – historiae monachorum (end of 4th-6th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = '“Classical” translations – historiae monachorum (end of 4th-6th cent.)' ")))
      }
    },
    classsical_translations_acts: {
      id: "classsical_translations_acts",
      title: "“Classical” translations – acts of councils and Canones (end of 4th-6th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = '“Classical” translations – acts of councils and Canones (end of 4th-6th cent.)' ")))
      }
    },
    classsical_translations_monastic: {
      id: "classsical_translations_monastic",
      title: "“Classical” translations – monastic works (end of 4th-6th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = '“Classical” translations – monastic works (end of 4th-6th cent.)' ")))
      }
    },
    post_chalcedonian: {
      id: "post_chalcedonian",
      title: "Post-Chalcedonian opposition literature: the “plerophories” and other works (5th-6th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Post-Chalcedonian opposition literature: the “plerophories” and other works (5th-6th cent.)' ")))
      }
    },
    historiographic: {
      id: "historiographic",
      title: "Historiographic Production (6th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Historiographic Production (6th cent.)' ")))
      }
    },
    orig_lit_formation: {
      id: "orig_lit_formation",
      title: "Original Literature: Formation of the earlier hagiographic cycles (6 cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Original Literature: Formation of the earlier hagiographic cycles (6 cent.)' ")))
      }
    },
    orig_lit_damian_hag: {
      id: "orig_lit_damian_hag",
      title: "Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Hagiographies",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Hagiographies' ")))
      }
    },
    orig_lit_damian_hom: {
      id: "orig_lit_damian_hom",
      title: "Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Homilies",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Original Literature: The period of Damian and his cultural circle (6th-7th cent.): Homilies' ")))
      }
    },
    poetry: {
      id: "poetry",
      title: "Poetic production (7th-8th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Poetic production (7th-8th cent.)' ")))
      }
    },
    orig_lit_hom: {
      id: "orig_lit_hom",
      title: "Original Literature: Homilies with apocryphal insertions (6th -8th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Original Literature: Homilies with apocryphal insertions (6th -8th cent.)' ")))
      }
    },
    original_lit_early_islamic: {
      id: "original_lit_early_islamic",
      title: "Original Literature: Literary production of the early Islamic period (7th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Original Literature: Literary production of the early Islamic period (7th cent.)' ")))
      }
    },
    standard_translations_in_bohairic: {
      id: "standard_translations_in_bohairic",
      title: "“Standard” translations of biblical works into Bohairic (7th-8th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = '“Standard” translations of biblical works into Bohairic (7th-8th cent.)' ")))
      }
    },
    original_lit_later_hag: {
      id: "original_lit_early_islamic",
      title: "Original Literature: Formation of the later (pseudo-epigraphical) hagiographic cycles and re-arrangement of homiletic production (7th-8th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Original Literature: Formation of the later (pseudo-epigraphical) hagiographic cycles and re-arrangement of homiletic production (7th-8th cent.)' ")))
      }
    },
    synaxarial: {
      id: "synaxarial",
      title: "Synaxarial arrangement (9th-10th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Synaxarial arrangement (9th-10th cent.)' ")))
      }
    },
    late_liturgical: {
      id: "late_liturgical",
      title: "Late liturgical production (10th-14th cent.)",
      url: 'works?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`litperiod` = 'Late liturgical production (10th-14th cent.)' ")))
      }
    },
  },
  colophons: {
    cryptography: {
      id: 'cryptography',
      title: "Colophons with cryptography",
      url: 'colophons?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`cryptography`=1 ")))
      }
    },
    greek_minuscule: {
      id: 'greek_minuscule',
      title: "Colophons with Greek minuscule",
      url: 'colophons?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`minusculegreek`=1 ")))
      }
    },
    coptic_minuscule: {
      id: 'coptic_minuscule',
      title: "Colophons with Coptic minuscule",
      url: 'colophons?verb=search&type=encoded',
      data: {
        "q_encoded": btoa(unescape(encodeURIComponent("`minusculecopitc`=1 ")))
      }
    }
  },
  map: {
    discovery_places: {
      id: 'discovery_places',
      title: 'Discovery places of Coptic literary manuscripts',
      url: 'geodata?verb=search&geojson=true&type=encoded',
      data: {
        "join": " JOIN paths__places as p ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = p.id" +
                " JOIN `paths__m_msplaces` as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `p`.`id` = `mp`.`place` ",
        "fields[paths__geodata.geometry]": "Geometry",
        "fields[p.id]": "Id",
        "fields[p.name]": "Name",
        "fields[p.pleiades]": "Pleiades Id",
        "fields[p.typology]": "Site typology",
        "fields[mp.type]": "Place type",
        "fields[count(mp.id_link)]": "Tot ms",
        "group": "p.id",
        "limit_start": "0",
        "limit_end": "500",
        "q_encoded": btoa(" mp.type = 'discovery' ")
      }
    },
    storage_places: {
      id: 'storage_places',
      title: 'Storage places of Coptic literary manuscripts',
      url: 'geodata?verb=search&geojson=true&type=encoded',
      data: {
        "join": " JOIN paths__places as p ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = p.id" +
                " JOIN `paths__m_msplaces` as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `p`.`id` = `mp`.`place` ",
        "fields[paths__geodata.geometry]": "Geometry",
        "fields[p.id]": "Id",
        "fields[p.name]": "Name",
        "fields[p.pleiades]": "Pleiades Id",
        "fields[p.typology]": "Site typology",
        "fields[mp.type]": "Place type",
        "fields[count(mp.id_link)]": "Tot ms",
        "group": "p.id",
        "limit_start": "0",
        "limit_end": "500",

        "q_encoded": btoa(" mp.type = 'storage' ")
      }
    },
    production_places: {
      id: 'production_places',
      title: 'Production places of Coptic literary manuscripts',
      url: 'geodata?verb=search&geojson=true&type=encoded',
      data: {
        "join": " JOIN paths__places as p ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = p.id" +
                " JOIN `paths__m_msplaces` as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `p`.`id` = `mp`.`place` ",
        "fields[paths__geodata.geometry]": "Geometry",
        "fields[p.id]": "Id",
        "fields[p.name]": "Name",
        "fields[p.pleiades]": "Pleiades Id",
        "fields[p.typology]": "Site typology",
        "fields[mp.type]": "Place type",
        "fields[count(mp.id_link)]": "Tot ms",
        "group": "p.id",
        "limit_start": "0",
        "limit_end": "500",
        "q_encoded": btoa(" mp.type = 'production' ")
      }
    },
    all_ms_places: {
      id: 'all_ms_places',
      title: 'All places connected to manuscripts',
      url: 'geodata?verb=search&geojson=true&type=encoded',
      data: {
        "join": " JOIN paths__places as p ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = p.id" +
                " JOIN  (SELECT * FROM `paths__m_msplaces` GROUP BY `id_link`, `place`) as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `p`.`id` = `mp`.`place` ",
        "fields[paths__geodata.geometry]": "Geometry",
        "fields[p.id]": "Id",
        "fields[p.name]": "Name",
        "fields[p.pleiades]": "Pleiades Id",
        "fields[p.typology]": "Site typology",
        "fields[GROUP_CONCAT(DISTINCT mp.type) as type]": "Place type",
        "fields[count(mp.id_link)]": "Tot ms",
        "group": "p.id",
        "limit_start": "0",
        "limit_end": "500",
        "q_encoded": btoa(" 1 ")
      }
    },
    bishoprics: {
      id: 'bishoprics',
      title: 'Bishoprics',
      url: 'geodata?verb=search&geojson=true&type=encoded',
      data: {
        "join": "JOIN paths__places ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = paths__places.id",
        "fields[paths__geodata.geometry]": "Geometry",
        "fields[paths__places.id]": "Id",
        "fields[paths__places.name]": "Name",
        "fields[paths__places.pleiades]": "Pleiades Id",
        "fields[paths__places.typology]": "Site typology",
        "q_encoded": btoa( '`paths__places`.`episcopalsee`=1 LIMIT 0, 100')
      }
    },
    // multi_stratified: {
    //   id: 'multi_stratified',
    //   title: 'Multi stratified sites',
    //   url: 'geodata?verb=search&geojson=true&type=encoded',
    //   data: {
    //     "join": "JOIN `paths__places` ON `paths__geodata`.`table_link` = 'paths__places' AND `paths__geodata`.`id_link` = `paths__places`.`id` " +
    //     "JOIN (SELECT `id_link`, count(id) as tot from `paths__m_placephase` GROUP BY `id_link` ORDER BY `tot` DESC LIMIT 0,10) as t ON `t`.`id_link` = `paths__geodata`.`id_link` ",
    //     "fields[paths__geodata.geometry]": "Geometry",
    //     "fields[paths__places.id]": "Id",
    //     "fields[paths__places.name]": "Name",
    //     "fields[paths__places.pleiades]": "Pleiades Id",
    //     "fields[paths__places.typology]": "Site typology",
    //     "q_encoded": btoa( '1 ORDER BY `t`.`tot` DESC')
    //   }
    // }
  }
};
