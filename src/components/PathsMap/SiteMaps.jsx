import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';


const getStyle = (f) =>{
  const p = f.properties;

  // Default stroke and fill opacity
  let s = {
    weight: 2,
    fillOpacity: .2
  };

  // Set opacity variable
  let opacity;

  // Reconstructed features have dashed strokes and .4 opacity
  if (p.reconstr){
    s.dashArray = '4 4';
    opacity = 0.4;
  } else {
    // Other features have .8 opacity
    opacity = 0.8
  }

  // Differentiate strike and fill colors by phase
  switch(true){
    case (p.phase < -1):
      s.color = 'rgba(150, 150, 150, ' + opacity + ')';
      s.fillColor = 'rgba(150, 150, 150, .4)';
      break;
    case (p.phase === -1):
      s.color = 'rgba(61, 90, 128, ' + opacity + ')';
      s.fillColor = 'rgba(61, 90, 128, .4)';
      break;
      case (p.phase === 1):
      s.color = 'rgba(247, 110, 1, ' + opacity + ')';
      s.fillColor = 'rgba(247, 110, 1, .4)';
      break;
    case (p.phase === 2):
      s.color = 'rgba(194, 0, 251, ' + opacity + ')';
      s.fillColor = 'rgba(194, 0, 251, .4)';
      break;
    case (p.phase === 3):
      s.color = 'rgba(56, 134, 89, ' + opacity + ')';
      s.fillColor = 'rgba(56, 134, 89, .4)';
      break;
    case (p.phase > 3):
      s.color = 'rgba(80, 47, 76, ' + opacity + ')';
      s.fillColor = 'rgba(56, 134, 89, .4)';
      break;
    default:
      s.color = 'rgba(31, 120, 180, ' + opacity + ')';
      s.fillColor = 'rgba(31, 120, 180, .4)';
      break;
  }

  // Set style for upper projections
  if (p.part && p.part.indexOf('u') > -1) {
    s.fill = false;
    s.color = 'rgba(0, 0, 0, .2)';

  // Set style for lower projections
  } else if (p.part && p.part.indexOf('l') > -1) {
    s.fillColor = 'rgba(0, 0, 0, .1)';
    s.color = 'rgba(0, 0, 0, .2)';

  // Set style for doorways
  } else if (p.part && p.part.indexOf('d') > -1) {
    s.fillColor = 'rgba(171, 221, 164, .8)';
    s.color = 'rgba(171, 221, 164, 1)';
  }

  // finished: return the style object
  return s;
};

const onEachFeature = (feature, layer) => {
  layer.bindPopup(`<a href="https://atlas.paths-erc.eu/places/${feature.properties.place}">paths.places.${feature.properties.place}</a>
  <br />${feature.properties.subplace}
  <br />Vectorized from: <a href="https://www.zotero.org/groups/2189557/erc-paths/items/itemKey/${feature.properties.source}" target="_blank">PAThs Zotero ${feature.properties.source} ${feature.properties.subsource}</a>
  <br />Phase: ${feature.properties.phase}`
  );
}

const list = [
  {
    "n": "paths.places.104-Medinet-Madi/BGQ6JNX2-39",
    "z": 22,
    "c": [29.187713084722045, 30.645887794423942]
  },
  {
    "n": "paths.places.53-Antinoupolis/BGQ6JNX2-53",
    "z": 20,
    "c": [27.804805651118542, 30.884793049007914]
  },
  {
    "n": "paths.places.53-Antinoupolis/BGQ6JNX2-55",
    "z": 20,
    "c": [27.800021344980067, 30.886799300871274]
  },
  {
    "n": "paths.places.53-Antinoupolis/BGQ6JNX2-54",
    "z": 20,
    "c": [27.805697423297435, 30.883554978308435]
  },
  {
    "n": "paths.places.104-Medinet-Madi/BGQ6JNX2-40",
    "z": 21,
    "c": [29.190446292864074, 30.645202184111902]
  },
  {
    "n": "paths.places.104-Medinet-Madi/BGQ6JNX2-41",
    "z": 21,
    "c": [29.190116487098024, 30.64613541004499]
  },
  {
    "n": "paths.places.104-Medinet-Madi/BGQ6JNX2-42",
    "z": 20,
    "c": [29.190972759188547, 30.646467617008607]
  },
  {
    "n": "paths.places.104-Medinet-Madi/BGQ6JNX2-43",
    "z": 21,
    "c": [29.189340490736054, 30.643205744556145]
  },
  {
    "n": "paths.places.104-Medinet-Madi/BGQ6JNX2-44",
    "z": 20,
    "c": [29.192977992608427, 30.645290498255815]
  },
  {
    "n": "paths.places.112-Monastery-of-Shenoute-at-Atripe/BGQ6JNX2-154",
    "z": 20,
    "c": [26.5342036060775, 31.6442502591251]
  },
  {
    "n": "paths.places.113-Red-Monastery-at-Atripe/BGQ6JNX2-156",
    "z": 21,
    "c": [26.55461884509286, 31.61998551365044]
  },
  {
    "n": "paths.places.114-Kellis/BGQ6JNX2-85",
    "z": 21,
    "c": [25.51541409579421, 29.096567848661103]
  },
  {
    "n": "paths.places.115-Bagawat/BGQ6JNX2-86",
    "z": 21,
    "c": [25.48669784573843, 30.555114548921043]
  },
  {
    "n": "paths.places.115-Bagawat/BGQ6JNX2-87",
    "z": 21,
    "c": [25.485700305307027, 30.555148501199593]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-103",
    "z": 21,
    "c": [30.843438195841582, 29.664018532295632]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-104",
    "z": 21,
    "c": [30.843438195841582, 29.664018532295632]
  },
  {
    "n": "paths.places.58-Esna/BGQ6JNX2-169",
    "z": 21,
    "c": [25.25720467312582, 32.54782292766117]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-105",
    "z": 22,
    "c": [30.84353961444547, 29.663716841996493]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-21a1",
    "z": 21,
    "c": [30.84088541628571, 29.66256167706822]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-21a2",
    "z": 21,
    "c": [30.840885601026393, 29.662561570991272]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-21a3",
    "z": 21,
    "c": [30.84088450472146, 29.662561565637592]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-21b",
    "z": 21,
    "c": [30.84088450472146, 29.662561565637592]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-21b1",
    "z": 21,
    "c": [30.84088450472146, 29.662561565637592]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-22",
    "z": 20,
    "c": [30.84785278407858, 29.662086178505934]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-28b",
    "z": 21,
    "c": [30.84195651613142, 29.664850637490858]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-30",
    "z": 21,
    "c": [30.842633232930766, 29.65911461973712]
  },
  {
    "n": "paths.places.116-Abu-Mina/BGQ6JNX2-31",
    "z": 21,
    "c": [30.841368754913667, 29.66300427312458]
  },
  {
    "n": "paths.places.119-Dionysias/BGQ6JNX2-46",
    "z": 22,
    "c": [29.40325610322086, 30.422296439498176]
  },
  {
    "n": "paths.places.122-Hawara/BGQ6JNX2-49",
    "z": 22,
    "c": [29.275638761445162, 30.897718186054327]
  },
  {
    "n": "paths.places.143-Marea/BGQ6JNX2-9",
    "z": 20,
    "c": [30.99640560875678, 29.656863370514802]
  },
  {
    "n": "paths.places.16-Elephantine/BGQ6JNX2-186",
    "z": 19,
    "c": [24.084247780038762, 32.88639600397803]
  },
  {
    "n": "paths.places.16-Elephantine/BGQ6JNX2-77",
    "z": 19,
    "c": [24.084247780038762, 32.88639600397803]
  },
  {
    "n": "paths.places.169-Manqabad/BGQ6JNX2-144",
    "z": 21,
    "c": [27.18215857083099, 31.11543848821127]
  },
  {
    "n": "paths.places.58-Esna/BGQ6JNX2-76",
    "z": 21,
    "c": [25.29353440413271, 32.55645642663842]
  },
  {
    "n": "paths.places.169-Manqabad/BGQ6JNX2-145",
    "z": 21,
    "c": [27.182475722183746, 31.112559788881956]
  },
  {
    "n": "paths.places.173-Dakhleh/BGQ6JNX2-181",
    "z": 21,
    "c": [25.66885216564107, 28.870803633631088]
  },
  {
    "n": "paths.places.176-Deir abu Matta/BGQ6JNX2-180",
    "z": 21,
    "c": [25.59377898002804, 28.9121434938785]
  },
  {
    "n": "paths.places.182-Karnak/BGQ6JNX2-166",
    "z": 19,
    "c": [25.717780361101507, 32.6595160667346]
  },
  {
    "n": "paths.places.182-Karnak/BGQ6JNX2-167",
    "z": 19,
    "c": [25.717780361101507, 32.6595160667346]
  },
  {
    "n": "paths.places.188-Pharan/BGQ6JNX2-96a",
    "z": 22,
    "c": [28.704848982709343, 33.63482147864396]
  },
  {
    "n": "paths.places.188-Pharan/BGQ6JNX2-96b",
    "z": 22,
    "c": [28.704848982709343, 33.63482147864396]
  },
  {
    "n": "paths.places.188-Pharan/BGQ6JNX2-97",
    "z": 20,
    "c": [28.705347801871415, 33.63495371489594]
  },
  {
    "n": "paths.places.19-Luxor-complex/BGQ6JNX2-69",
    "z": 21,
    "c": [25.701256443006596, 32.64115390712226]
  },
  {
    "n": "paths.places.19-Luxor-complex/BGQ6JNX2-70",
    "z": 21,
    "c": [25.699852781295732, 32.63888319155756]
  },
  {
    "n": "paths.places.19-Luxor-complex/BGQ6JNX2-71",
    "z": 20,
    "c": [25.700143901286207, 32.64001806277448]
  },
  {
    "n": "paths.places.20-Koptos/BGQ6JNX2-64",
    "z": 22,
    "c": [25.996230777036267, 32.81373241040219]
  },
  {
    "n": "paths.places.68-Pbou/BGQ6JNX2-162b",
    "z": 20,
    "c": [26.112588250912747, 32.40311080332181]
  },
  {
    "n": "paths.places.74-Naqlun/BGQ6JNX2-131b",
    "z": 22,
    "c": [29.19505890878909, 30.878506347361654]
  },
  {
    "n": "paths.places.74-Naqlun/BGQ6JNX2-131a",
    "z": 22,
    "c": [29.19505890878909, 30.878506347361654]
  },
  {
    "n": "paths.places.74-Naqlun/BGQ6JNX2-131c",
    "z": 22,
    "c": [29.195058998138123, 30.878507159650326]
  },
  {
    "n": "paths.places.78-Kellia/BGQ6JNX2-114",
    "z": 21,
    "c": [30.780959394377504, 30.36481238334848]
  },
  {
    "n": "paths.places.78-Kellia/BGQ6JNX2-115",
    "z": 21,
    "c": [30.78101741247412, 30.367026588603107]
  },
  {
    "n": "paths.places.78-Kellia/BGQ6JNX2-116",
    "z": 20,
    "c": [30.780327477596863, 30.368028812951334]
  },
  {
    "n": "paths.places.78-Kellia/BGQ6JNX2-117",
    "z": 20,
    "c": [30.780327477596863, 30.368028812951334]
  },
  {
    "n": "paths.places.88-Petemout/BGQ6JNX2-66",
    "z": 21,
    "c": [25.734482729225938, 32.70913503127934]
  },
  {
    "n": "paths.places.88-Petemout/BGQ6JNX2-67",
    "z": 21,
    "c": [25.734125554949877, 32.71016965934224]
  },
  {
    "n": "paths.places.96-Philae/BGQ6JNX2-78",
    "z": 20,
    "c": [24.026162711796047, 32.88471292369061]
  },
  {
    "n": "paths.places.96-Philae/BGQ6JNX2-79",
    "z": 20,
    "c": [24.026162711796047, 32.88471292369061]
  },
  {
    "n": "paths.places.96-Philae/BGQ6JNX2-80",
    "z": 21,
    "c": [24.02560660684249, 32.88407618774808]
  },
  {
    "n": "paths.places.21-Dendera/BGQ6JNX2-58",
    "z": 20,
    "c": [27.77922774421122, 30.80270035746382]
  },
  {
    "n": "paths.places.21-Dendera/BGQ6JNX2-63",
    "z": 21,
    "c": [26.142846800838385, 32.67027365056673]
  },
  {
    "n": "paths.places.215-Deir-Abu-Hennes/BGQ6JNX2-141",
    "z": 21,
    "c": [27.786862075230307, 30.90470231457129]
  },
  {
    "n": "paths.places.217-Deir-al-Dik/BGQ6JNX2-51",
    "z": 21,
    "c": [27.829442770562405, 30.86180866253168]
  },
  {
    "n": "paths.places.24-Panopolis/BGQ6JNX2-159",
    "z": 21,
    "c": [26.598300544535153, 31.79157930250137]
  },
  {
    "n": "paths.places.24-Panopolis/BGQ6JNX2-161",
    "z": 21,
    "c": [26.477690475121953, 31.820103846838318]
  },
  {
    "n": "paths.places.338-Taposiris-Magna/BGQ6JNX2-185",
    "z": 18,
    "c": [30.94613861050185, 29.518677935874415]
  },
  {
    "n": "paths.places.338-Taposiris-Magna/BGQ6JNX2-4",
    "z": 20,
    "c": [30.941986991898826, 29.522353874906862]
  },
  {
    "n": "paths.places.338-Taposiris-Magna/BGQ6JNX2-5",
    "z": 19,
    "c": [30.942163347265492, 29.514647906219466]
  },
  {
    "n": "paths.places.338-Taposiris-Magna/taposiris",
    "z": 19,
    "c": [30.942163347265492, 29.514647906219466]
  },
  {
    "n": "paths.places.36-Pelusium/BGQ6JNX2-189",
    "z": 17,
    "c": [31.042570283455497, 32.5400549810067]
  },
  {
    "n": "paths.places.36-Pelusium/BGQ6JNX2-88",
    "z": 17,
    "c": [31.042570283455497, 32.5400549810067]
  },
  {
    "n": "paths.places.36-Pelusium/BGQ6JNX2-89",
    "z": 20,
    "c": [31.042295517396344, 32.55677972073124]
  },
  {
    "n": "paths.places.36-Pelusium/BGQ6JNX2-90",
    "z": 21,
    "c": [31.04182432955881, 32.55712329743325]
  },
  {
    "n": "paths.places.368-Upper-Ansina/BGQ6JNX2-137",
    "z": 20,
    "c": [27.798181397632575, 30.890187864330862]
  },
  {
    "n": "paths.places.368-Upper-Ansina/BGQ6JNX2-138",
    "z": 20,
    "c": [27.798181397632575, 30.890187864330862]
  },
  {
    "n": "paths.places.368-Upper-Ansina/BGQ6JNX2-139",
    "z": 19,
    "c": [27.798209463938218, 30.895134920255376]
  },
  {
    "n": "paths.places.368-Upper-Ansina/BGQ6JNX2-56",
    "z": 20,
    "c": [27.80102610168583, 30.88937311272564]
  },
  {
    "n": "paths.places.374-Deir-el-Matmar/BGQ6JNX2-168",
    "z": 21,
    "c": [25.645374000611568, 32.45618138907984]
  },
  {
    "n": "paths.places.38-Alexandria/BGQ6JNX2-1",
    "z": 20,
    "c": [31.19784616916719, 29.902649609223268]
  },
  {
    "n": "paths.places.53-Antinoupolis/BGQ6JNX2-52",
    "z": 21,
    "c": [27.810324304595852, 30.881748393073345]
  },
  {
    "n": "paths.places.113-Red-Monastery-at-Atripe/BGQ6JNX2-155",
    "z": 20,
    "c": [26.554759495305074, 31.61991702381268]
  },
  {
    "n": "paths.places.70-Hermonthis/BGQ6JNX2-74",
    "z": 20,
    "c": [25.6213456308842, 32.54525094474053]
  },
  {
    "n": "paths.places.24-Panopolis/BGQ6JNX2-160",
    "z": 20,
    "c": [26.548895680414724, 31.815046089715846]
  },
  {
    "n": "paths.places.28-Hermopolis-Magna/BGQ6JNX2-59",
    "z": 20,
    "c": [26.548895680414724, 31.815046089715846]
  }
];



function SiteMaps(props){
  const bounds = props.bounds;
  const zoom = props.zoom;

  const [loadedSites, addLoadedSite] = useState([]);
  const [siteMaps, addSiteMap] = useState([]);


  useEffect( ()=>{
    list.map( e => {
      if (zoom >= e.z - 5 && bounds.contains(e.c)){
        fetch(`https://docs.paths-erc.eu/data/geojson/${e.n}.geojson`).then( function(response){
          response.json().then(function(j){
            if (loadedSites.includes(e.n)){
              return;
            }
            addLoadedSite(loadedSites.concat(e.n));
            addSiteMap(siteMaps.concat(j));
          });
        });
      }
      return true;
    });
  });

  return (
    <React.Fragment>
      { siteMaps.map((e, i)=>{
        return <GeoJSON
            key={i}
            data={e}
            style={ getStyle }
            onEachFeature={ onEachFeature }
          />
      }) }
    </React.Fragment>
  );

}


export default SiteMaps;
