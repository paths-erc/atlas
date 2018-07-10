/*jshint esversion: 6 */

export default {

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
};
