export default {
    "manuscripts": {
        "name": "paths__manuscripts",
        "label": "Manuscripts",
        "order": "id",
        "id_field": "id",
        "preview": [
            "id",
            "cmclid",
            "tm",
            "ldab",
            "bookform",
            "writingsupport"
        ],
        "plugin": [
            "paths__m_biblio",
            "paths__m_quires",
            "paths__m_shelfmarks",
            "paths__m_msplaces",
            "paths__m_hands"
        ],
        "backlinks": [
            "paths__places:paths__m_msplaces:place"
        ],
        "link": [
            {
                "other_tb": "paths__titles",
                "fld": [
                    {
                        "my": "id",
                        "other": "msid"
                    }
                ]
            },
            {
                "other_tb": "paths__colophons",
                "fld": [
                    {
                        "my": "id",
                        "other": "msid"
                    }
                ]
            }
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "Coptic Literary Manuscript (CLM) ID",
                "type": "text",
                "readonly": "1",
                "disabled": "1"
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "readonly": "1",
                "disabled": "1",
                "hide": "1"
            },
            "cmclid": {
                "name": "cmclid",
                "label": "CMCL",
                "type": "text"
            },
            "tm": {
                "name": "tm",
                "label": "TM",
                "type": "text"
            },
            "ldab": {
                "name": "ldab",
                "label": "LDAB",
                "type": "text"
            },
            "lcbm": {
                "name": "lcbm",
                "label": "LCBM",
                "help": "List of Coptic Biblical Manuscripts",
                "type": "text"
            },
            "alias": {
                "name": "alias",
                "label": "Alias",
                "type": "text"
            },
            "issinglefrag": {
                "name": "issinglefrag",
                "label": "Is preserved in a single fragment?",
                "type": "boolean",
                "help": "Set to 1\/yes if manuscript is conserved in only one sigle fragment"
            },
            "stratigraphy": {
                "name": "stratigraphy",
                "label": "Codex stratigraphy",
                "type": "long_text"
            },
            "modernhistory": {
                "name": "modernhistory",
                "label": "Modern history",
                "type": "long_text"
            },
            "contents": {
                "name": "contents",
                "label": "Contents",
                "type": "long_text"
            },
            "dialect": {
                "name": "dialect",
                "label": "Dialects \/ languages",
                "type": "multi_select",
                "vocabulary_set": "dialects"
            },
            "dialectnotes": {
                "name": "dialectnotes",
                "label": "Notes on dialects or languages",
                "type": "long_text"
            },
            "chronofrom": {
                "name": "chronofrom",
                "label": "From",
                "type": "text",
                "check": [
                    "regex"
                ],
                "pattern": "^-?[0-9]{1,4}$",
                "help": "Enter date as an integer indicating year. Negative values stand for BC"
            },
            "chronoto": {
                "name": "chronoto",
                "label": "To",
                "type": "text",
                "check": [
                    "regex"
                ],
                "pattern": "^-?[0-9]{1,4}$",
                "help": "Enter date as an integer indicating year. Negative values stand for BC"
            },
            "datingcriteria": {
                "name": "datingcriteria",
                "label": "Dating criteria",
                "type": "long_text"
            },
            "bookform": {
                "name": "bookform",
                "label": "Book form",
                "type": "select",
                "vocabulary_set": "book_form"
            },
            "writingsupport": {
                "name": "writingsupport",
                "label": "Writing support",
                "type": "select",
                "vocabulary_set": "writing_support"
            },
            "leaftotextant": {
                "name": "leaftotextant",
                "label": "Number of ancient extant leaves\/tablets",
                "type": "text"
            },
            "fragtot": {
                "name": "fragtot",
                "label": "Number of fragments",
                "type": "text"
            },
            "fragdim": {
                "name": "fragdim",
                "label": "Fragment dimensions (mm)",
                "type": "long_text"
            },
            "leaftotestimated": {
                "name": "leaftotestimated",
                "label": "Estimated number of leaves\/tablets",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "quiresextant": {
                "name": "quiresextant",
                "label": "Extant quires",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "gennotes": {
                "name": "gennotes",
                "label": "Notes",
                "type": "long_text"
            },
            "columns": {
                "name": "columns",
                "label": "Columns",
                "type": "select",
                "vocabulary_set": "columns"
            },
            "colnotes": {
                "name": "colnotes",
                "label": "Notes on columns",
                "type": "long_text"
            },
            "linespercolumn": {
                "name": "linespercolumn",
                "label": "Lines per column",
                "type": "text"
            },
            "charsperline": {
                "name": "charsperline",
                "label": "Characters per line",
                "type": "text"
            },
            "alignment": {
                "name": "alignment",
                "label": "Text alignment",
                "type": "select",
                "vocabulary_set": "alignment"
            },
            "alignmentnotes": {
                "name": "alignmentnotes",
                "label": "Notes on alignment",
                "type": "long_text"
            },
            "leafw": {
                "name": "leafw",
                "label": "Leaf or tablet width",
                "type": "text"
            },
            "leafh": {
                "name": "leafh",
                "label": "Leaf or tablet height",
                "type": "text"
            },
            "framew": {
                "name": "framew",
                "label": "Writing frame width (average)",
                "type": "text"
            },
            "frameh": {
                "name": "frameh",
                "label": "Writing frame height (average)",
                "type": "text"
            },
            "intercolumnium": {
                "name": "intercolumnium",
                "label": "Intercolumnium",
                "type": "text"
            },
            "marginup": {
                "name": "marginup",
                "label": "Upper margin",
                "type": "text"
            },
            "marginlow": {
                "name": "marginlow",
                "label": "Lower margin",
                "type": "text"
            },
            "marginout": {
                "name": "marginout",
                "label": "Outer margin",
                "type": "text"
            },
            "marginin": {
                "name": "marginin",
                "label": "Inner margin",
                "type": "text"
            },
            "marginleft": {
                "name": "marginleft",
                "label": "Left margin",
                "type": "text"
            },
            "marginright": {
                "name": "marginright",
                "label": "Right margin",
                "type": "text"
            },
            "heighttenlines": {
                "name": "heighttenlines",
                "label": "Height of ten lines of text and related interlinear spaces",
                "type": "text"
            },
            "prophw": {
                "name": "prophw",
                "label": "Proportion height\/width",
                "type": "text"
            },
            "propwt": {
                "name": "propwt",
                "label": "Proportion written\/total page space",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "dimnotes": {
                "name": "dimnotes",
                "label": "Notes on dimensions and proportions",
                "type": "long_text"
            },
            "quirenotes": {
                "name": "quirenotes",
                "label": "Notes on quires",
                "type": "long_text"
            },
            "quiresig": {
                "name": "quiresig",
                "label": "Quire signature",
                "type": "boolean"
            },
            "quiretype": {
                "name": "quiretype",
                "label": "Quire signature type",
                "type": "select",
                "vocabulary_set": "regular_irregular"
            },
            "quireposition": {
                "name": "quireposition",
                "label": "Quire signature position",
                "type": "multi_select",
                "vocabulary_set": "position_in_page"
            },
            "quirenrnotes": {
                "name": "quirenrnotes",
                "label": "Notes on quire signature",
                "type": "long_text"
            },
            "pagination": {
                "name": "pagination",
                "label": "Presence of pagination",
                "type": "boolean"
            },
            "pagtype": {
                "name": "pagtype",
                "label": "Pagination type",
                "type": "select",
                "vocabulary_set": "regular_irregular"
            },
            "pagposition": {
                "name": "pagposition",
                "label": "Pagination position",
                "type": "multi_select",
                "vocabulary_set": "position_in_page"
            },
            "pagnote": {
                "name": "pagnote",
                "label": "Notes on pagination",
                "type": "long_text"
            },
            "foliation": {
                "name": "foliation",
                "label": "Presence of foliation",
                "type": "boolean"
            },
            "foltype": {
                "name": "foltype",
                "label": "Type of foliation",
                "type": "select",
                "vocabulary_set": "regular_irregular"
            },
            "folposition": {
                "name": "folposition",
                "label": "Position of foliation",
                "type": "multi_select",
                "vocabulary_set": "position_in_page"
            },
            "folnotes": {
                "name": "folnotes",
                "label": "Notes on foliation",
                "type": "long_text"
            },
            "handstot": {
                "name": "handstot",
                "label": "Number of hands",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "lectionalsigns": {
                "name": "lectionalsigns",
                "label": "Lectional signs",
                "type": "multi_select",
                "vocabulary_set": "lectional_signs"
            },
            "structuralsigns": {
                "name": "structuralsigns",
                "label": "Punctuation and structural\/logical signs",
                "type": "multi_select",
                "vocabulary_set": "punctuation_signs"
            },
            "signsnotes": {
                "name": "signsnotes",
                "label": "Notes on signs",
                "type": "long_text"
            },
            "abbreviations": {
                "name": "abbreviations",
                "label": "Abbreviations",
                "type": "multi_select",
                "vocabulary_set": "abbreviations"
            },
            "abbrnotes": {
                "name": "abbrnotes",
                "label": "Abbreviation notes",
                "type": "long_text"
            },
            "ruling": {
                "name": "ruling",
                "label": "Ruling",
                "type": "boolean"
            },
            "rulingtype": {
                "name": "rulingtype",
                "label": "Ruling type",
                "type": "select",
                "vocabulary_set": "ruling_types"
            },
            "rulingtool": {
                "name": "rulingtool",
                "label": "Ruling tool",
                "type": "select",
                "vocabulary_set": "ruling_tool"
            },
            "pricking": {
                "name": "pricking",
                "label": "Pricking",
                "type": "boolean"
            },
            "rulingnotes": {
                "name": "rulingnotes",
                "label": "Notes on ruling",
                "type": "long_text"
            },
            "leaftabs": {
                "name": "leaftabs",
                "label": "Leaf tabs",
                "type": "boolean"
            },
            "leaftabsnotes": {
                "name": "leaftabsnotes",
                "label": "Notes on leaf tabs",
                "type": "long_text"
            },
            "kolleseis": {
                "name": "kolleseis",
                "label": "Kollēseis",
                "type": "boolean"
            },
            "kolleseseisdescr": {
                "name": "kolleseseisdescr",
                "label": "Kollēseis description",
                "type": "long_text"
            },
            "tracesnotes": {
                "name": "tracesnotes",
                "label": "Notes",
                "type": "long_text"
            },
            "kollno": {
                "name": "kollno",
                "label": "Number of kollēmata",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "kolldim": {
                "name": "kolldim",
                "label": "Kollēmata dimensions",
                "type": "text"
            },
            "bindings": {
                "name": "bindings",
                "label": "Presence of bindings",
                "type": "boolean",
                "check": [
                    "int"
                ]
            },
            "sewings": {
                "name": "sewings",
                "label": "Presence of sewings",
                "type": "boolean"
            },
            "sewingtype": {
                "name": "sewingtype",
                "label": "Type of sewing",
                "type": "multi_select",
                "vocabulary_set": "sewing_types"
            },
            "covers": {
                "name": "covers",
                "label": "Covers",
                "type": "multi_select",
                "vocabulary_set": "covers"
            },
            "coversnotes": {
                "name": "coversnotes",
                "label": "Notes on covers",
                "type": "long_text"
            },
            "holesno": {
                "name": "holesno",
                "label": "No. of holes",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "holesarrangement": {
                "name": "holesarrangement",
                "label": "Arrangement of holes",
                "type": "select",
                "vocabulary_set": "holes_arrangement"
            },
            "holesnotes": {
                "name": "holesnotes",
                "label": "Notes on holes",
                "type": "long_text"
            },
            "marginalnotes": {
                "name": "marginalnotes",
                "label": "Marginal notes",
                "type": "long_text"
            },
            "palimpsest": {
                "name": "palimpsest",
                "label": "Palimpsest",
                "type": "boolean"
            },
            "palimpsestnotes": {
                "name": "palimpsestnotes",
                "label": "Notes on palimpsest",
                "type": "long_text"
            },
            "restancient": {
                "name": "restancient",
                "label": "Ancient restorations",
                "type": "long_text"
            },
            "restmodern": {
                "name": "restmodern",
                "label": "Modern restorations",
                "type": "long_text"
            },
            "inks": {
                "name": "inks",
                "label": "Inks",
                "type": "multi_select",
                "vocabulary_set": "ink_types"
            },
            "redink": {
                "name": "redink",
                "label": "Red ink",
                "type": "boolean"
            },
            "redinknotes": {
                "name": "redinknotes",
                "label": "Notes on red ink",
                "type": "long_text"
            },
            "decortype": {
                "name": "decortype",
                "label": "Decoration types",
                "type": "multi_select",
                "vocabulary_set": "decor_types"
            },
            "decorsubj": {
                "name": "decorsubj",
                "label": "Decoration subjects",
                "type": "multi_select",
                "vocabulary_set": "decor_subj"
            },
            "decorationdescr": {
                "name": "decorationdescr",
                "label": "Decoration description",
                "type": "long_text"
            },
            "enlargedinitials": {
                "name": "enlargedinitials",
                "label": "Enlarged initials",
                "type": "long_text"
            },
            "sourceinfo": {
                "name": "sourceinfo",
                "label": "Source of information about this record",
                "type": "long_text"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            },
            "status": {
                "name": "status",
                "label": "Status",
                "type": "select",
                "vocabulary_set": "status"
            }
        }
    },
    "collections": {
        "name": "paths__collections",
        "label": "Collections",
        "order": "fullname",
        "id_field": "fullname",
        "preview": [
            "id",
            "fullname",
            "cmclname",
            "country",
            "town",
            "institution",
            "name",
            "notes"
        ],
        "plugin": [
            "paths__m_biblio"
        ],
        "backlinks": [
            "paths__manuscripts:paths__m_shelfmarks:collection"
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "disabled": "1"
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "readonly": "1",
                "disabled": "1",
                "hide": "1"
            },
            "fullname": {
                "name": "fullname",
                "label": "Full collection name",
                "type": "text",
                "check": [
                    "no_dupl"
                ]
            },
            "cmclname": {
                "name": "cmclname",
                "label": "CMCL name",
                "type": "text"
            },
            "country": {
                "name": "country",
                "label": "Country",
                "type": "combo_select",
                "get_values_from_tb": "paths__collections:country"
            },
            "town": {
                "name": "town",
                "label": "Town",
                "type": "combo_select",
                "get_values_from_tb": "paths__collections:town"
            },
            "institution": {
                "name": "institution",
                "label": "Institution",
                "type": "combo_select",
                "get_values_from_tb": "paths__collections:institution"
            },
            "name": {
                "name": "name",
                "label": "Name",
                "type": "text"
            },
            "notes": {
                "name": "notes",
                "label": "Notes",
                "type": "long_text"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            }
        }
    },
    "works": {
        "name": "paths__works",
        "label": "Works",
        "order": "cmcl",
        "id_field": "cmcl",
        "preview": [
            "id",
            "cmcl",
            "title",
            "cpg"
        ],
        "plugin": [
            "paths__m_biblio",
            "paths__m_wkauthors"
        ],
        "link": [
            {
                "other_tb": "paths__titles",
                "fld": [
                    {
                        "my": "cmcl",
                        "other": "workcc"
                    }
                ]
            }
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "Unique ID",
                "type": "text",
                "readonly": "1",
                "disabled": "1",
                "hide": "1"
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "readonly": "1",
                "disabled": "1",
                "hide": "1"
            },
            "cmcl": {
                "name": "cmcl",
                "label": "CC",
                "type": "text",
                "check": [
                    "no_dupl"
                ],
                "help": "Clavis Coptica (CMCL)"
            },
            "title": {
                "name": "title",
                "label": "Conventional title",
                "type": "text"
            },
            "cpg": {
                "name": "cpg",
                "label": "CPG",
                "type": "text",
                "help": "Clavis Patrum Graecorum"
            },
            "cant": {
                "name": "cant",
                "label": "CANT",
                "type": "text",
                "help": "Clavis Apocryphorum Novi Testamenti"
            },
            "cavt": {
                "name": "cavt",
                "label": "CAVT",
                "type": "text",
                "help": "Clavis Apocryphorum Veteris Testamenti"
            },
            "bho": {
                "name": "bho",
                "label": "BHO",
                "type": "text",
                "help": "Bibliotheca Hagiographica Orientalis"
            },
            "bhg": {
                "name": "bhg",
                "label": "BHG",
                "type": "text",
                "help": "Bibliotheca Hagiographica Graeca"
            },
            "bhl": {
                "name": "bhl",
                "label": "BHL",
                "type": "text",
                "help": "Bibliotheca Hagiographica Latina"
            },
            "cae": {
                "name": "cae",
                "label": "CAe",
                "type": "text",
                "help": "Clavis Aethiopica"
            },
            "period": {
                "name": "period",
                "label": "Period",
                "type": "multi_select",
                "vocabulary_set": "period"
            },
            "problems": {
                "name": "problems",
                "label": "Problems",
                "type": "long_text"
            },
            "shelfmarks": {
                "name": "shelfmarks",
                "label": "Cmcl's shelfmarks",
                "type": "multi_select"
            },
            "notes": {
                "name": "notes",
                "label": "Notes",
                "type": "long_text"
            },
            "litperiod": {
                "name": "litperiod",
                "label": "Literary period",
                "type": "select",
                "vocabulary_set": "literary_period"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            },
            "status": {
                "name": "status",
                "label": "Status",
                "type": "select",
                "vocabulary_set": "status"
            }
        }
    },
    "titles": {
        "name": "paths__titles",
        "label": "Titles",
        "order": "cc",
        "id_field": "cc",
        "preview": [
            "cc",
            "type",
            "workcc",
            "msid"
        ],
        "plugin": [
            "paths__m_biblio"
        ],
        "link": [
            {
                "other_tb": "paths__works",
                "fld": [
                    {
                        "my": "workcc",
                        "other": "cmcl"
                    }
                ]
            },
            {
                "other_tb": "paths__manuscripts",
                "fld": [
                    {
                        "my": "msid",
                        "other": "id"
                    }
                ]
            }
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "ready": true
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "hide": "1"
            },
            "cc": {
                "name": "cc",
                "label": "Clavis Coptica attributed to the title",
                "type": "text",
                "check": [
                    "no_dupl"
                ]
            },
            "workcc": {
                "name": "workcc",
                "label": "Clavis Coptica attributed to the work",
                "type": "select",
                "get_values_from_tb": "paths__works:cmcl",
                "check": [
                    "not_empty"
                ]
            },
            "msid": {
                "name": "msid",
                "label": "CLM id",
                "type": "select",
                "get_values_from_tb": "paths__manuscripts:id",
                "check": [
                    "not_empty"
                ]
            },
            "type": {
                "name": "type",
                "label": "Type",
                "type": "select",
                "vocabulary_set": "title_type"
            },
            "description": {
                "name": "description",
                "label": "Description",
                "type": "long_text"
            },
            "modulartypology": {
                "name": "modulartypology",
                "label": "Modular typology",
                "type": "select",
                "vocabulary_set": "modular_typology"
            },
            "writingaxis": {
                "name": "writingaxis",
                "label": "Axis",
                "type": "select",
                "vocabulary_set": "axis"
            },
            "thickandthin": {
                "name": "thickandthin",
                "label": "Thick-and-thin style",
                "type": "boolean"
            },
            "text": {
                "name": "text",
                "label": "Text",
                "type": "long_text"
            },
            "translation": {
                "name": "translation",
                "label": "Translation",
                "type": "long_text"
            },
            "taggedtext": {
                "name": "taggedtext",
                "label": "Tagged text",
                "type": "long_text"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            },
            "status": {
                "name": "status",
                "label": "Status",
                "type": "select",
                "vocabulary_set": "status"
            }
        }
    },
    "colophons": {
        "name": "paths__colophons",
        "label": "Colophons",
        "order": "id",
        "id_field": "id",
        "preview": [
            "id",
            "dialect",
            "chronofrom",
            "chronoto",
            "datingcriteria"
        ],
        "plugin": [
            "paths__m_biblio"
        ],
        "link": [
            {
                "other_tb": "paths__manuscripts",
                "fld": [
                    {
                        "my": "msid",
                        "other": "id"
                    }
                ]
            }
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "Colophon ID",
                "readonly": true
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "hide": "1"
            },
            "msid": {
                "name": "msid",
                "label": "Manuscript CLM",
                "type": "select",
                "get_values_from_tb": "paths__manuscripts:id",
                "check": [
                    "not_empty"
                ]
            },
            "chronofrom": {
                "name": "chronofrom",
                "label": "Date from",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "chronoto": {
                "name": "chronoto",
                "label": "Date to",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "datingcriteria": {
                "name": "datingcriteria",
                "label": "Dating criteria",
                "type": "long_text"
            },
            "dialect": {
                "name": "dialect",
                "label": "Dialects \/ Languages",
                "type": "multi_select",
                "vocabulary_set": "dialects"
            },
            "dialectnotes": {
                "name": "dialectnotes",
                "label": "Notes on dialects or languages",
                "type": "long_text"
            },
            "greektext": {
                "name": "greektext",
                "label": "Greek text",
                "type": "boolean"
            },
            "writingaxis": {
                "name": "writingaxis",
                "label": "Axis",
                "type": "select",
                "vocabulary_set": "axis"
            },
            "thickandthin": {
                "name": "thickandthin",
                "label": "Thick-and-thin style",
                "type": "boolean"
            },
            "cryptography": {
                "name": "cryptography",
                "label": "Cryptography",
                "type": "boolean"
            },
            "minusculecopitc": {
                "name": "minusculecopitc",
                "label": "Coptic minuscule script",
                "type": "boolean"
            },
            "minusculegreek": {
                "name": "minusculegreek",
                "label": "Greek minuscule script",
                "type": "boolean"
            },
            "description": {
                "name": "description",
                "label": "Description",
                "type": "long_text"
            },
            "text": {
                "name": "text",
                "label": "Text",
                "type": "long_text"
            },
            "translation": {
                "name": "translation",
                "label": "Translation",
                "type": "long_text"
            },
            "taggedtext": {
                "name": "taggedtext",
                "label": "Tagged text",
                "type": "long_text"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            },
            "status": {
                "name": "status",
                "label": "Status",
                "type": "select",
                "vocabulary_set": "status"
            }
        }
    },
    "authors": {
        "name": "paths__authors",
        "label": "Authors",
        "order": "name",
        "id_field": "name",
        "preview": [
            "name",
            "title",
            "copticname",
            "greekname",
            "cmclname"
        ],
        "plugin": [
            "paths__m_biblio"
        ],
        "backlinks": [
            "paths__works:paths__m_wkauthors:author"
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "check": [
                    "primary key"
                ],
                "readonly": true,
                "disabled": true
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "readonly": "1",
                "disabled": "1",
                "hide": true
            },
            "name": {
                "name": "name",
                "label": "Name",
                "type": "text",
                "check": [
                    "no_dupl"
                ]
            },
            "copticname": {
                "name": "copticname",
                "label": "Name in Coptic",
                "type": "text",
                "check": [
                    "no_dupl"
                ]
            },
            "greekname": {
                "name": "greekname",
                "label": "Name in Greek",
                "type": "text",
                "check": [
                    "no_dupl"
                ]
            },
            "viaf": {
                "name": "viaf",
                "label": "VIAF ID",
                "type": "text",
                "check": [
                    "no_dupl"
                ]
            },
            "title": {
                "name": "title",
                "label": "Title",
                "type": "select",
                "vocabulary_set": "titles"
            },
            "cmclname": {
                "name": "cmclname",
                "label": "CMCL name",
                "type": "text"
            },
            "bio": {
                "name": "bio",
                "label": "Short biography of the “Author”",
                "type": "long_text"
            },
            "birth": {
                "name": "birth",
                "label": "Year of birth",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "death": {
                "name": "death",
                "label": "Year of death",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            },
            "status": {
                "name": "status",
                "label": "Status",
                "type": "select",
                "vocabulary_set": "status"
            }
        }
    },
    "places": {
        "name": "paths__places",
        "label": "Places",
        "order": "name",
        "id_field": "name",
        "preview": [
            "id",
            "name",
            "copticname",
            "greekname",
            "arabictranslname",
            "egyptianname",
            "tm",
            "pleiades"
        ],
        "plugin": {
            "0": "paths__m_biblio",
            "1": "paths__m_toponyms",
            "3": "paths__m_placefase"
        },
        "backlinks": [
            "paths__manuscripts:paths__m_msplaces:place"
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": 1
            },
            "creator": {
                "name": "creator",
                "label": "Creator",
                "type": "text",
                "hide": "1"
            },
            "name": {
                "name": "name",
                "label": "Site name",
                "type": "text",
                "help": "English version of best known place name",
                "check": [
                    "no_dupl"
                ]
            },
            "copticname": {
                "name": "copticname",
                "label": "Coptic Name(s)",
                "type": "text",
                "help": "Comma separated list of different versions of Coptic name(s)"
            },
            "greekname": {
                "name": "greekname",
                "label": "Greek name(s)",
                "type": "text",
                "help": "Comma separated list of different versions of Greek name(s)"
            },
            "arabicname": {
                "name": "arabicname",
                "label": "Arabic name(s)",
                "type": "text",
                "help": "Comma separated list of different versions of Arabic name(s)"
            },
            "arabictranslname": {
                "name": "arabictranslname",
                "label": "Transliteration of Arabic name(s)",
                "type": "text",
                "help": "Comma separated list of translitteration of Arabic name(s)"
            },
            "egyptianname": {
                "name": "egyptianname",
                "label": "Egyptian name(s)",
                "type": "text",
                "help": "Comma separated list of different versions of Egyptian name(s)"
            },
            "tm": {
                "name": "tm",
                "label": "Trismegistos GeoID",
                "type": "text"
            },
            "pleiades": {
                "name": "pleiades",
                "label": "Pleiades Id",
                "type": "text"
            },
            "timm": {
                "name": "timm",
                "label": "Timm references",
                "type": "text"
            },
            "region": {
                "name": "region",
                "label": "Region",
                "type": "select",
                "vocabulary_set": "region"
            },
            "area": {
                "name": "area",
                "label": "Area",
                "type": "combo_select",
                "get_values_from_tb": "paths__places:area"
            },
            "nomos": {
                "name": "nomos",
                "label": "Nomòs",
                "type": "select",
                "vocabulary_set": "nomos"
            },
            "province": {
                "name": "province",
                "label": "Province",
                "type": "select",
                "vocabulary_set": "provinces"
            },
            "episcopalsee": {
                "name": "episcopalsee",
                "label": "Episcopal see",
                "type": "boolean",
                "help": "True if the site has ever been an episcopal see"
            },
            "episcopalseefrom": {
                "name": "episcopalseefrom",
                "label": "Episcopal see from year",
                "type": "text"
            },
            "notesepiscopalsee": {
                "name": "notesepiscopalsee",
                "label": "Notes on episcopal see",
                "type": "long_text"
            },
            "typology": {
                "name": "typology",
                "label": "Typology",
                "type": "select",
                "vocabulary_set": "site_typology"
            },
            "toporeferredto": {
                "name": "toporeferredto",
                "label": "Topographically referred to",
                "type": "select",
                "id_from_tb": "paths__places"
            },
            "notestoporeferredto": {
                "name": "notestoporeferredto",
                "label": "Notes on topographical reference",
                "type": "long_text"
            },
            "historicalreference": {
                "name": "historicalreference",
                "label": "Historical connections \/ references",
                "type": "long_text"
            },
            "datefrom": {
                "name": "datefrom",
                "label": "Date from",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "dateto": {
                "name": "dateto",
                "label": "Date to",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "datingcriteria": {
                "name": "datingcriteria",
                "label": "Dating criteria and notes",
                "type": "long_text"
            },
            "description": {
                "name": "description",
                "label": "Description",
                "type": "long_text"
            },
            "hasplans": {
                "name": "hasplans",
                "label": "Plans",
                "type": "boolean"
            },
            "hasphotos": {
                "name": "hasphotos",
                "label": "Photos",
                "type": "boolean"
            },
            "ismonastery": {
                "name": "ismonastery",
                "label": "Monastery",
                "type": "boolean"
            },
            "monasterynotes": {
                "name": "monasterynotes",
                "label": "Notes on monastery",
                "type": "long_text"
            },
            "isnomoscapital": {
                "name": "isnomoscapital",
                "label": "Capital of nomòs",
                "type": "boolean"
            },
            "accuracy": {
                "name": "accuracy",
                "label": "Position accuracy",
                "type": "text",
                "help": "TODO!"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            },
            "status": {
                "name": "status",
                "label": "Status",
                "type": "select",
                "vocabulary_set": "status"
            }
        }
    },
    "persons": {
        "name": "paths__persons",
        "label": "Persons attested in colophons",
        "order": "name",
        "id_field": "name",
        "preview": [
            "id",
            "name",
            "type",
            "profession",
            "patronymic"
        ],
        "plugin": [
            "paths__m_nameforms",
            "paths__m_biblio"
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "check": [
                    "primary key"
                ],
                "readonly": true,
                "disabled": true,
                "hide": true
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "readonly": true,
                "disabled": true,
                "hide": true
            },
            "name": {
                "name": "name",
                "label": "Name",
                "type": "text"
            },
            "type": {
                "name": "type",
                "label": "Type",
                "type": "select",
                "vocabulary_set": "persons_type"
            },
            "profession": {
                "name": "profession",
                "label": "Profession",
                "type": "select",
                "vocabulary_set": "profession"
            },
            "patronymic": {
                "name": "patronymic",
                "label": "Patronymic",
                "type": "text"
            },
            "origin": {
                "name": "origin",
                "label": "Origin",
                "type": "select",
                "id_from_tb": "paths__places"
            },
            "sex": {
                "name": "sex",
                "label": "Sex",
                "type": "select",
                "vocabulary_set": "sex"
            },
            "datefrom": {
                "name": "datefrom",
                "label": "Date range from year",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "dateto": {
                "name": "dateto",
                "label": "Date range to year",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "datenotes": {
                "name": "datenotes",
                "label": "Notes on date",
                "type": "long_text"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            },
            "status": {
                "name": "status",
                "label": "Status",
                "type": "select",
                "vocabulary_set": "status"
            }
        }
    },
    "biblio": {
        "name": "paths__biblio",
        "label": "Bibliographic database",
        "order": "short",
        "id_field": "short",
        "preview": [
            "short",
            "title",
            "year"
        ],
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "hide": true
            },
            "creator": {
                "name": "creator",
                "label": "Record creator",
                "type": "text",
                "hide": "1"
            },
            "short": {
                "name": "short",
                "label": "Short form",
                "type": "text",
                "check": [
                    "no_dupl",
                    "not_empty"
                ]
            },
            "authors": {
                "name": "authors",
                "label": "Authors",
                "type": "text"
            },
            "title": {
                "name": "title",
                "label": "Title",
                "type": "text"
            },
            "journal": {
                "name": "journal",
                "label": "Journal\/book",
                "type": "combo_select",
                "get_values_from_tb": "paths__biblio:journal"
            },
            "volume": {
                "name": "volume",
                "label": "Volume",
                "type": "text"
            },
            "issue": {
                "name": "issue",
                "label": "Issue",
                "type": "text"
            },
            "voleditors": {
                "name": "voleditors",
                "label": "Volume editors(s)",
                "type": "combo_select",
                "get_values_from_tb": "paths__biblio:voleditors"
            },
            "series": {
                "name": "series",
                "label": "Series",
                "type": "combo_select",
                "get_values_from_tb": "paths__biblio:series"
            },
            "seriesvol": {
                "name": "seriesvol",
                "label": "Series volume",
                "type": "text"
            },
            "year": {
                "name": "year",
                "label": "Year",
                "type": "text"
            },
            "place": {
                "name": "place",
                "label": "Place",
                "type": "combo_select",
                "get_values_from_tb": "paths__biblio:place"
            },
            "pages": {
                "name": "pages",
                "label": "Pages",
                "type": "text"
            },
            "isbn": {
                "name": "isbn",
                "label": "ISBN(s)",
                "type": "long_text"
            },
            "issn": {
                "name": "issn",
                "label": "ISSN(s)",
                "type": "long_text"
            },
            "doi": {
                "name": "doi",
                "label": "DOI",
                "type": "text"
            },
            "url": {
                "name": "url",
                "label": "URL",
                "type": "long_text"
            },
            "notes": {
                "name": "notes",
                "label": "Notes",
                "type": "long_text"
            },
            "worldcat": {
                "name": "worldcat",
                "label": "Worldcat",
                "type": "text"
            },
            "editors": {
                "name": "editors",
                "label": "Editors",
                "type": "multi_select",
                "vocabulary_set": "persons"
            }
        }
    },
    "files": {
        "name": "paths__files",
        "label": "Files",
        "order": "id",
        "preview": [
            "id",
            "filename",
            "ext",
            "keywords"
        ],
        "tmpl_edit": "files",
        "tmpl_read": "files",
        "id_field": "id",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": true
            },
            "ext": {
                "name": "ext",
                "label": "Extension",
                "type": "text",
                "check": [
                    "not_empty"
                ],
                "readonly": true
            },
            "filename": {
                "name": "filename",
                "label": "Filename",
                "type": "text",
                "check": [
                    "not_empty"
                ],
                "readonly": true
            },
            "keywords": {
                "name": "keywords",
                "label": "Keywords",
                "type": "text"
            },
            "description": {
                "name": "description",
                "label": "Description",
                "type": "long_text"
            },
            "printable": {
                "name": "printable",
                "label": "Printable",
                "type": "boolean"
            }
        }
    },
    "m_biblio": {
        "name": "paths__m_biblio",
        "label": "Bibliography",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "short": {
                "name": "short",
                "label": "Short reference",
                "type": "select",
                "id_from_tb": "paths__biblio"
            },
            "details": {
                "name": "details",
                "label": "Specific details",
                "type": "text"
            },
            "images": {
                "name": "images",
                "label": "Details about images",
                "type": "long_text"
            }
        }
    },
    "m_hands": {
        "name": "paths__m_hands",
        "label": "Hands",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "handno": {
                "name": "handno",
                "label": "Hand number",
                "type": "text",
                "check": [
                    "int"
                ]
            },
            "modulartypology": {
                "name": "modulartypology",
                "label": "Modular typology",
                "type": "select",
                "vocabulary_set": "modular_typology"
            },
            "writingaxis": {
                "name": "writingaxis",
                "label": "Axis",
                "type": "select",
                "vocabulary_set": "axis"
            },
            "thickandthin": {
                "name": "thickandthin",
                "label": "Thick-and-thin style",
                "type": "boolean"
            },
            "writingnotes": {
                "name": "writingnotes",
                "label": "Notes on writing",
                "type": "long_text"
            }
        }
    },
    "m_msplaces": {
        "name": "paths__m_msplaces",
        "label": "Relevant places",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "type": {
                "name": "type",
                "label": "Type",
                "type": "select",
                "vocabulary_set": "place_types"
            },
            "place": {
                "name": "place",
                "label": "Place",
                "type": "select",
                "id_from_tb": "paths__places"
            },
            "sourceinfo": {
                "name": "sourceinfo",
                "label": "Source of information",
                "type": "select",
                "vocabulary_set": "production_info_source"
            },
            "sourcenotes": {
                "name": "sourcenotes",
                "label": "Notes on source",
                "type": "long_text"
            },
            "sort": {
                "name": "sort",
                "label": "Sort",
                "type": "text",
                "check": [
                    "int"
                ]
            }
        }
    },
    "m_quires": {
        "name": "paths__m_quires",
        "label": "Reconstructed quire layout",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "quireno": {
                "name": "quireno",
                "label": "Quire no.",
                "type": "text"
            },
            "quirelayout": {
                "name": "quirelayout",
                "label": "Quire layout",
                "type": "text",
                "help": "Describe only first half, using: 1 for singleton; 1+ for singleton with stub; 1x for union; 1* for union with lost second leaf; 0* for union with lost first leaf; 1x* for lost union; 2 for union all in one side, etc. Such as 1 faces 0; 1+ faces 0+; 1* faces 0*; 1x faces 1x; 2 faces 0; etc."
            },
            "quireayoutnotes": {
                "name": "quireayoutnotes",
                "label": "Notes on quire layout",
                "type": "long_text"
            },
            "quirepaptype": {
                "name": "quirepaptype",
                "label": "Papyrus quire typology",
                "type": "select",
                "vocabulary_set": "pap_quire_typologies"
            },
            "quirepartype": {
                "name": "quirepartype",
                "label": "Parchment quire typology",
                "type": "select",
                "vocabulary_set": "par_quire_typologies"
            },
            "quirenotes": {
                "name": "quirenotes",
                "label": "Quire notes",
                "type": "long_text"
            }
        }
    },
    "m_wkauthors": {
        "name": "paths__m_wkauthors",
        "label": "Authorship",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "type": {
                "name": "type",
                "label": "Author type",
                "type": "select",
                "vocabulary_set": "author_type"
            },
            "author": {
                "name": "author",
                "label": "Author name",
                "type": "select",
                "id_from_tb": "paths__authors"
            },
            "source": {
                "name": "source",
                "label": "Source of information",
                "type": "select",
                "vocabulary_set": "text_part"
            },
            "notes": {
                "name": "notes",
                "label": "Notes on authorship",
                "type": "long_text"
            },
            "sort": {
                "name": "sort",
                "label": "Sort",
                "type": "text",
                "check": [
                    "int"
                ]
            }
        }
    },
    "m_placefase": {
        "name": "paths__m_placefase",
        "label": "Other periods",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": 1,
                "hide": 1
            },
            "fperiod": {
                "name": "fperiod",
                "label": "Period",
                "type": "select",
                "vocabulary_set": "site_periods"
            },
            "fperiodnote": {
                "name": "fperiodnote",
                "label": "Notes on period",
                "type": "long_text"
            },
            "ftypology": {
                "name": "ftypology",
                "label": "Typology",
                "type": "select",
                "vocabulary_set": "site_typology"
            },
            "fdescription": {
                "name": "fdescription",
                "label": "Description",
                "type": "long_text"
            }
        }
    },
    "m_shelfmarks": {
        "name": "paths__m_shelfmarks",
        "label": "Shelfmarks",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "fullsegnat": {
                "name": "fullsegnat",
                "label": "CMCL's full segnat",
                "type": "text"
            },
            "segnatid": {
                "name": "segnatid",
                "label": "CMCL segnat",
                "type": "text"
            },
            "collection": {
                "name": "collection",
                "label": "Collection",
                "type": "select",
                "id_from_tb": "paths__collections"
            },
            "shelfmark": {
                "name": "shelfmark",
                "label": "Shelfmark",
                "type": "text"
            },
            "pp": {
                "name": "pp",
                "label": "f.\/ff. and\/or p.\/pp.",
                "type": "text"
            },
            "sort": {
                "name": "sort",
                "label": "Sort",
                "type": "text",
                "check": [
                    "int"
                ]
            }
        }
    },
    "m_toponyms": {
        "name": "paths__m_toponyms",
        "label": "Place names",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "toponym": {
                "name": "toponym",
                "label": "Place name",
                "type": "text"
            },
            "language": {
                "name": "language",
                "label": "Language",
                "type": "combo_select",
                "get_values_from_tb": "paths__m_toponyms:language"
            },
            "transcription": {
                "name": "transcription",
                "label": "Transcription",
                "type": "text"
            },
            "reference": {
                "name": "reference",
                "label": "Reference",
                "type": "combo_select",
                "get_values_from_tb": "paths__biblio:short"
            },
            "referencedetails": {
                "name": "referencedetails",
                "label": "Reference details",
                "type": "text"
            },
            "datefrom": {
                "name": "datefrom",
                "label": "Date from",
                "type": "text",
                "check": [
                    "regex"
                ],
                "pattern": "^-?[0-9]{1,4}$"
            },
            "dateto": {
                "name": "dateto",
                "label": "Date to",
                "type": "text",
                "check": [
                    "regex"
                ],
                "pattern": "^-?[0-9]{1,4}$"
            }
        }
    },
    "m_nameforms": {
        "name": "paths__m_nameforms",
        "label": "Other name forms attestation",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "nameform": {
                "name": "nameform",
                "label": "Name form",
                "type": "text"
            },
            "language": {
                "name": "language",
                "label": "Language",
                "type": "combo_select",
                "get_values_from_tb": "paths__m_nameforms:language"
            },
            "transliteration": {
                "name": "transliteration",
                "label": "Transliteration",
                "type": "text"
            }
        }
    },
    "geodata": {
        "name": "paths__geodata",
        "label": "Geographical coordinates",
        "is_plugin": "1",
        "fields": {
            "id": {
                "name": "id",
                "label": "ID",
                "type": "text",
                "readonly": "1",
                "hide": "1"
            },
            "geometry": {
                "name": "geometry",
                "label": "Coordinates (WKT format)",
                "type": "text"
            }
        }
    }
};
