/*jshint esversion: 6 */


export default {
    "coptic": [
      "authors.copticname",
      "titles.text",
      "colophons.text"
    ],
    "greek": [
      "authors.greekname"
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
      "titles.taggedtext",
      "colophons.creator",
      "authors.id",
      "authors.creator",
      "authors.cmclname",
      "editors.cmclname",
      "places.creator",
      "places.hasplans",
      "places.hasphotos",
      "persons.id",
      "persons.creator",
      "biblio.creator",
      "biblio.editors",
      "m_quires.id",
      "m_hands.id",
      "m_placephase.id",
      "m_msplaces.id"
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
      "colophons":    [ "id", "msid", "dialect", "chronofrom", "chronoto", "datingcriteria" ],
      "authors":      [ "name", "title", "copticname", "greekname", "cmclname" ],
      "places":       [ "id", "name", "tmgeo", "pleiades", "region", "area", "episcopalsee" ],
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
    },

    "fld_whitelist": [
        "paths__places:id",
        "paths__places:name",
        "paths__places:tmgeo",
        "paths__places:pleiades",
        "paths__places:region",
        "paths__places:area",
        "paths__places:meris",
        "paths__places:nomos",
        "paths__places:province",
        "paths__places:episcopalsee",
        "paths__places:typology",
        "paths__places:description",
        "paths__places:hasmonastery",
        "paths__places:isnomoscapital",
        "paths__places:status",

        "paths__m_toponyms:toponym",
        "paths__m_placephase:fperiod",
        "paths__m_placephase:ftypology",

        "paths__works:id",
        "paths__works:cmcl",
        "paths__works:title",
        "paths__works:cpg",
        "paths__works:cant",
        "paths__works:cavt",
        "paths__works:bho",
        "paths__works:bhg",
        "paths__works:bhl",
        "paths__works:cae",

        "paths__works:litperiod",
        "paths__m_wkauthors:type",
        "paths__m_wkauthors:author",

        "paths__authors:id",
        "paths__authors:name",
        "paths__authors:copticname",
        "paths__authors:greekname",
        "paths__authors:viaf",
        "paths__authors:title",
        "paths__authors:status",

        "paths__titles:id",
        "paths__titles:cc",
        "paths__titles:workcc",
        "paths__titles:msid",
        "paths__titles:type",
        "paths__titles:text",
        "paths__titles:translation",

        "paths__colophons:id",
        "paths__colophons:msid",
        "paths__colophons:chronofrom",
        "paths__colophons:chronoto",
        "paths__colophons:istitutionplace",
        "paths__colophons:dialect",
        "paths__colophons:dialectnotes",
        "paths__colophons:greektext",
        "paths__colophons:writingaxis",
        "paths__colophons:cryptography",
        "paths__colophons:minusculecopitc",
        "paths__colophons:minusculegreek",
        "paths__colophons:text",
        "paths__colophons:translation",

        "paths__collections:id",
        "paths__collections:fullname",
        "paths__collections:country",
        "paths__collections:town",
        "paths__collections:institution",
        "paths__collections:name",

        "paths__manuscripts:id",
        "paths__m_shelfmarks:collection",
        "paths__m_shelfmarks:shelfmark",
        "paths__manuscripts:cmclid",
        "paths__manuscripts:tm",
        "paths__manuscripts:ldab",
        "paths__manuscripts:lcbm",
        "paths__manuscripts:dbmnt",
        "paths__manuscripts:alias",
        "paths__manuscripts:issinglefrag",
        "paths__manuscripts:isbookbinding",
        "paths__manuscripts:reusedinbinding",
        "paths__manuscripts:stratigraphy",
        "paths__manuscripts:modernhistory",
        "paths__manuscripts:contents",
        "paths__manuscripts:dialect",
        "paths__manuscripts:chronofrom",
        "paths__manuscripts:chronoto",
        "paths__manuscripts:datingsource",
        "paths__manuscripts:datingcriteria",
        "paths__manuscripts:bookform",
        "paths__manuscripts:writingsupport",
        "paths__m_msplaces:place",
        "paths__m_msplaces:type",
        "paths__m_msplaces:sourceinfo",
        "paths__manuscripts:leaftotextant",
        "paths__manuscripts:fragtot",
        "paths__manuscripts:fragdim",
        "paths__manuscripts:leaftotestimated",
        "paths__manuscripts:quiresextant",
        "paths__manuscripts:gennotes",
        "paths__manuscripts:columns",
        "paths__manuscripts:colnotes",
        "paths__manuscripts:linespercolumn",
        "paths__manuscripts:charsperline",
        "paths__manuscripts:leafw",
        "paths__manuscripts:leafh",
        "paths__manuscripts:framew",
        "paths__manuscripts:frameh",
        "paths__manuscripts:intercolumnium",
        "paths__manuscripts:marginup",
        "paths__manuscripts:marginlow",
        "paths__manuscripts:marginout",
        "paths__manuscripts:marginin",
        "paths__manuscripts:marginleft",
        "paths__manuscripts:marginright",
        "paths__manuscripts:heighttenlines",
        "paths__manuscripts:prophw",
        "paths__manuscripts:propwt",
        "paths__manuscripts:quiresig",
        "paths__manuscripts:quiretype",
        "paths__manuscripts:quireposition",
        "paths__m_quires:quirepaptype",
        "paths__m_quires:quirepartype",
        "paths__manuscripts:pagination",
        "paths__manuscripts:pagtype",
        "paths__manuscripts:pagposition",
        "paths__manuscripts:foliation",
        "paths__manuscripts:foltype",
        "paths__manuscripts:folposition",
        "paths__manuscripts:handstot",
        "paths__manuscripts:lectionalsigns",
        "paths__manuscripts:structuralsigns",
        "paths__manuscripts:signsnotes",
        "paths__manuscripts:abbreviations",
        "paths__manuscripts:ruling",
        "paths__manuscripts:rulingtype",
        "paths__manuscripts:rulingtool",
        "paths__manuscripts:pricking",
        "paths__manuscripts:leaftabs",
        "paths__manuscripts:kolleseis",
        "paths__manuscripts:kolleseseisdescr",
        "paths__manuscripts:kollno",
        "paths__manuscripts:kolldim",
        "paths__manuscripts:bindings",
        "paths__manuscripts:bindformer",
        "paths__manuscripts:boardw",
        "paths__manuscripts:boardh",
        "paths__manuscripts:boardt",
        "paths__manuscripts:spinew",
        "paths__manuscripts:sewings",
        "paths__manuscripts:sewingtype",
        "paths__manuscripts:sewingstationsno",
        "paths__manuscripts:foldpattern",
        "paths__manuscripts:boardmat",
        "paths__manuscripts:boardfeatures",
        "paths__manuscripts:boardattachment",
        "paths__manuscripts:covers",
        "paths__manuscripts:covermat",
        "paths__manuscripts:turnins",
        "paths__manuscripts:mitres",
        "paths__manuscripts:foreedgeflap",
        "paths__manuscripts:coverdecoration",
        "paths__manuscripts:splinelining",
        "paths__manuscripts:endbandtype",
        "paths__manuscripts:fasteningtype",
        "paths__manuscripts:othertiesposition",
        "paths__manuscripts:marginalnotes",
        "paths__manuscripts:greekminuscule",
        "paths__manuscripts:palimpsest",
        "paths__manuscripts:restancient",
        "paths__manuscripts:restmodern",
        "paths__manuscripts:pgmcol",
        "paths__manuscripts:pgmlocation",
        "paths__manuscripts:blktype",
        "paths__manuscripts:blklocation",
        "paths__manuscripts:decortype",
        "paths__manuscripts:decorsubj",
        "paths__manuscripts:decorationdescr",
        "paths__manuscripts:enlargedinitials",
        "paths__manuscripts:sourceinfo",
        "paths__manuscripts:status",
        "paths__m_hands:handno",
        "paths__m_hands:modulartypology",
        "paths__m_hands:writingaxis",
        "paths__m_hands:thickandthin",
        "paths__m_hands:identification",
        "paths__m_hands:writingnotes",

        "paths__m_biblio:short",
        "paths__m_biblio:details",

        "paths__persons:id",
        "paths__persons:name",
        "paths__persons:type",
        "paths__persons:profession",
        "paths__persons:patronymiccarnal",
        "paths__persons:patronymicspirit",
        "paths__persons:hasbrother",
        "paths__persons:hasfather",
        "paths__persons:placebirth",
        "paths__persons:placeaffiliation",
        "paths__persons:sex",
        "paths__persons:datefrom",
        "paths__persons:dateto",

      ]
};
