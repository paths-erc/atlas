import fs from "fs";
import axios from "axios";

const csmap = await axios.get(
  "https://raw.githubusercontent.com/CopticScriptorium/corpora/dev/meta.json"
);

const paths_map = {
  manuscripts: {},
  works: {},
  authors: {},
};

const add2obj = (tb, id, cs_id) => {
  if (!paths_map[tb].hasOwnProperty(id)) {
    paths_map[tb][id] = [];
  }
  if (paths_map[tb][id].includes(cs_id)) {
    console.log(`Error: ${tb} . ${id} already includes ${cs_id}`);
  }
  paths_map[tb][id].push(cs_id);
};

for (let [key, value] of Object.entries(csmap.data)) {
  if (value.paths_authors && value.paths_authors !== '') {
    add2obj("authors", value.paths_authors, value.document_cts_urn);
  } else if (value.paths_manuscripts && value.paths_manuscripts !== '') {
    add2obj("manuscripts", value.paths_manuscripts, value.document_cts_urn);
  } else if (value.paths_works && value.paths_works !== '') {
    add2obj("works", value.paths_works, value.document_cts_urn);
  }
}

fs.writeFileSync(
  "./src/components/Services/CSMap.js",
  `export default ${JSON.stringify(paths_map, null, 2)};`
);
