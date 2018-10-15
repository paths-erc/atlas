/*jshint esversion: 6 */


export default {
    "coptic": [
      "places.copticname",
      "authors.copticname",
      "titles.text",
      "colophons.text"
    ],
    "greek": [
      "authors.greekname",
      "places.greekname"
    ],
    "hidden": [
      "manuscripts.creator",
      "collections.creator",
      "collections.cmclname",
      "works.id",
      "works.creator",
      "works.shelfmarks",
      "works.period",
      "works.problems",
      "titles.creator",
      "colophons.creator",
      "authors.id",
      "authors.creator",
      "authors.cmclname",
      "places.creator",
      "places.hasplans",
      "places.hasphotos",
      "persons.id",
      "persons.creator",
      "biblio.creator",
      "m_quires.id"
    ],
    "id_fld": {
      "manuscripts": "id",
      "collections": "fullname",
      "works": "cmcl",
      "titles": "cc",
      "colophons": "id",
      "authors": "name",
      "places": "name",
      "persons": "name"
    },
    "searchDefault": {
      "manuscripts": "id",
      "collections": "fullname",
      "works": "cmcl",
      "titles": "cc",
      "colophons": "id",
      "authors": "name",
      "places": "paths__m_toponyms:toponym",
      "persons": "name"
    },
    "preview": {
      "manuscripts":  [ "id", "cmclid", "tm", "ldab", "bookform", "writingsupport" ],
      "collections":  [ "id", "fullname", "cmclname", "country", "town", "institution", "name", "notes" ],
      "works":        [ "id", "cmcl", "title", "cpg" ],
      "titles":       [ "cc", "type", "workcc", "msid" ],
      "colophons":    [ "id", "dialect", "chronofrom", "chronoto", "datingcriteria" ],
      "authors":      [ "name", "title", "copticname", "greekname", "cmclname" ],
      "places":       [ "id", "name", "copticname", "greekname", "arabictranslname", "egyptianname", "tm", "pleiades" ],
      "persons":      [ "id", "name", "type", "profession", "patronymic" ]
    },
    "label": {
      "manuscripts": "Manuscripts",
      "collections": "Collections",
      "works": "Works",
      "titles": "Titles",
      "colophons": "Colophons",
      "authors": "Authors",
      "places": "Places",
      "persons": "Persons attested in colophons"
    }
};
