/*jshint esversion: 6 */

export default {
  manuscripts: {
    ms_has_bindings: {
      id: "ms_has_bindings",
      title: "Manuscripts with bookbindings",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`bindings`='1'")
      }

    },
    ms_with_date: {
      id: "ms_with_date",
      title: "Dated manuscripts",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("(`chronofrom`!='' AND `chronofrom` IS NOT NULL) OR (`chronoto`!='' AND `chronoto` IS NOT NULL)")
      }
    },
    ms_ae_200: {
      id: "ms_ae_200",
      title: "Manuscripts of the 3th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 199 AND `chronoto` < 300")
      }
    },
    ms_ae_300: {
      id: "ms_ae_300",
      title: "Manuscripts of the 4th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 299 AND `chronoto` < 400")
      }
    },
    ms_ae_400: {
      id: "ms_ae_400",
      title: "Manuscripts of the 5th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 399 AND `chronoto` < 500")
      }
    },
    ms_ae_500: {
      id: "ms_ae_500",
      title: "Manuscripts of the 6th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 499 AND `chronoto` < 600")
      }
    },
    ms_ae_600: {
      id: "ms_ae_600",
      title: "Manuscripts of the 7th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 599 AND `chronoto` < 700")
      }
    },
    ms_ae_700: {
      id: "ms_ae_700",
      title: "Manuscripts of the 8th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 699  AND `chronoto` < 800")
      }
    },
    ms_ae_800: {
      id: "ms_ae_800",
      title: "Manuscripts of the 9th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 799 AND `chronoto` < 900")
      }
    },
    ms_ae_900: {
      id: "ms_ae_900",
      title: "Manuscripts of the 10th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 899 AND `chronoto` < 1000")
      }
    },
    ms_ae_1000: {
      id: "ms_ae_1000",
      title: "Manuscripts of the 11th Century",
      url: 'manuscripts?verb=search&type=encoded',
      data: {
        "q_encoded": btoa("`chronofrom` > 999 AND `chronoto` < 1100")
      }
    }
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
        "fields[p.copticname]": "Coptic name",
        "fields[p.greekname]": "Greek name",
        "fields[p.egyptianname]": "Egyptian name",
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
        "fields[p.copticname]": "Coptic name",
        "fields[p.greekname]": "Greek name",
        "fields[p.egyptianname]": "Egyptian name",
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
        "fields[p.copticname]": "Coptic name",
        "fields[p.greekname]": "Greek name",
        "fields[p.egyptianname]": "Egyptian name",
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
      title: 'All manuscript related places',
      url: 'geodata?verb=search&geojson=true&type=encoded',
      data: {
        "join": " JOIN paths__places as p ON paths__geodata.table_link = 'paths__places' AND paths__geodata.id_link = p.id" +
                " JOIN `paths__m_msplaces` as mp ON `mp`.`table_link`= 'paths__manuscripts' AND `p`.`id` = `mp`.`place` ",
        "fields[paths__geodata.geometry]": "Geometry",
        "fields[p.id]": "Id",
        "fields[p.name]": "Name",
        "fields[p.copticname]": "Coptic name",
        "fields[p.greekname]": "Greek name",
        "fields[p.egyptianname]": "Egyptian name",
        "fields[p.pleiades]": "Pleiades Id",
        "fields[p.typology]": "Site typology",
        "fields[mp.type]": "Place type",
        "fields[count(mp.id_link)]": "Tot ms",
        "group": "p.id",
        "limit_start": "0",
        "limit_end": "500",
        "q_encoded": btoa(" 1 ")
      }
    }
  }
};
