/*jshint esversion: 6 */

export default {
  places: {
    episcopal_sees: {
      id: "episcopal_sees",
      title: "Episcopal sees",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`episcopalsee`=1")
      }
    },
    has_monasteries: {
      id: "has_monasteries",
      title: "Site has one or more monasteries",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`ismonastery` = 1")
      }
    },
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
    forts: {
      id: "forts",
      title: "Forts or towers",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'fort, tower'")
      }
    },
    hermitages: {
      id: "hermitages",
      title: "Hermitage units",
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
    shrines: {
      id: "shrines",
      title: "Shrines",
      url: 'places?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`typology` = 'shrine'")
      }
    },
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
    ms_has_bindings: {
      id: "ms_has_bindings",
      title: "Manuscripts with bookbindings",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`bindings`='1'")
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
    // ms_with_date: {
    //   id: "ms_with_date",
    //   title: "Dated manuscripts",
    //   url: 'manuscripts?verb=search&type=encoded',
    //   data: {
    //     "q_encoded": btoa("(`chronofrom`!='' AND `chronofrom` IS NOT NULL) OR (`chronoto`!='' AND `chronoto` IS NOT NULL)")
    //   }
    // },
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
  map: {
    discovery_places: {
      id: 'discovery_places',
      title: 'Manuscript discovery places',
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
      title: 'Manuscript storage places',
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
      title: 'Manuscript production places',
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
        "fields[mp.type]": "Place type",
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
    multi_stratified: {
      id: 'multi_stratified',
      title: 'Multi stratified sites',
      url: 'geodata?verb=search&geojson=true&type=encoded',
      data: {
        "join": "JOIN `paths__places` ON `paths__geodata`.`table_link` = 'paths__places' AND `paths__geodata`.`id_link` = `paths__places`.`id` " +
        "JOIN (SELECT `id_link`, count(id) as tot from `paths__m_placefase` GROUP BY `id_link` ORDER BY `tot` DESC LIMIT 0,10) as t ON `t`.`id_link` = `paths__geodata`.`id_link` ",
        "fields[paths__geodata.geometry]": "Geometry",
        "fields[paths__places.id]": "Id",
        "fields[paths__places.name]": "Name",
        "fields[paths__places.pleiades]": "Pleiades Id",
        "fields[paths__places.typology]": "Site typology",
        "q_encoded": btoa( '1 ORDER BY `t`.`tot` DESC')
      }
    }
  }
};
