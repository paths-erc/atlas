import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const m = {
  'Predynastic Egypt (4500 BC - 2950 BC)':                  {s: -4500, e:-2950},
  'Early Dynastic Egypt (2950 BC - 2670 BC)':               {s: -2950, e:-2760},
  'Old Kingdom Egypt (2670 BC - 2168 BC)':                  {s: -2760, e:-2168},
  'First Intermediate Period Egypt (2168 BC - 2010 BC)':    {s: -2168, e:-2010},
  'Middle Kingdom Egypt (2010 BC - 1640 BC)':               {s: -2010, e:-1640},
  'Second Intermediate Period Egypt (1640 BC - 1548 BC)':   {s: -1640, e:-1548},
  'New Kingdom Egypt (1548 BC - 1086 BC)':                  {s: -1548, e:-1086},
  'Third Intermediate Period Egypt (1086 BC - 664 BC)':     {s: -1086, e:-664},
  'Late Period Egypt (664 BC - 332 BC)':                    {s: -664,  e:-332},
  'Macedonian Egypt (332 BC - 304 BC)':                     {s: -332,  e:-304},
  'Ptolemaic Egypt (304 BC - 30 BC)':                       {s: -304,  e:-30},
  'Ptolemaic-Roman Egypt (304 BC - AD 640)':                {s: -306,  e:640},
  'Roman, early Empire (30 BC - AD 300)':                   {s: -30,   e:300},
  'Late Antique (AD 300 - AD 640)':                         {s: 300,   e:640},
  'Early Byzantine (AD 650 - AD 850)':                      {s: 650,   e:850},
  'Middle Byzantine (AD 850 - AD 1200)':                    {s: 850,   e:1200},
  'Late Byzantine Period (AD 1200 - AD 1450)':              {s: 1200,  e:1450},
  'Early Ottoman Empire (AD 1453 - AD 1683)':               {s: 1453,  e:1683},
  'Ottoman Empire (AD 1513 - AD 1918)':                     {s: 1513,  e:1918}
};

const options = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      stacked: true
    }],
    xAxes: [{
      ticks:{
        stepSize: 100,
        max: 1918
      }
    }]
  }
};

// let used_cols = [];
//
// function getRandomColor() {
//   let letters = '0123456789ABCDEF';
//   let color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   if (used_cols.indexOf(color) > -1){
//     color = getRandomColor();
//   } else {
//     used_cols.push(color);
//     return color;
//   }
// }


export default class Timeline extends Component {



  render() {
    if (!this.props.placephase || this.props.placephase.length < 1) {
      return null;
    }

    let data = {
      labels: [],
      datasets: [
        {
          backgroundColor: '#fff',
          hoverBackgroundColor: '#fff',
          data: []
        },
        {
          backgroundColor: '#B5353C',
          borderColor: '#B5353C',
          borderWidth: 1,
          hoverBackgroundColor: '#B5353C',
          hoverBorderColor: '#B5353C',
          data: []
        }
      ]
    };

    this.props.placephase.data.forEach(e => {
      data.labels.push(e.fperiod.val.replace(/\s*\([^)]+\)/gi, ''));
      if (m[e.fperiod.val]){
        // end BCE => white: e; red: s
        if (m[e.fperiod.val].e < 0){
          data.datasets[0].data.push(m[e.fperiod.val].e);
          data.datasets[1].data.push(m[e.fperiod.val].s);
        } else if (m[e.fperiod.val].e > 0 && m[e.fperiod.val].s < 0){
        // end CE, start BCE => white:
          data.datasets[1].data.push(m[e.fperiod.val].s);
          data.datasets[1].data.push(m[e.fperiod.val].e);
          data.datasets[0].data.push(0);
          data.datasets[0].data.push(0);
          data.labels.push(e.fperiod.val.replace(/\s*\([^)]+\)/gi, ''));
        }
      }
    });

    // const dataT = {
    //   "labels":[
    //     ""
    //   ],
    //   "datasets":[
    //     {
    //       "backgroundColor":"#fff",
    //       "borderColor":"#B5353C",
    //       "hoverBackgroundColor":"#fff",
    //       "data":[0]
    //     },
    //     {
    //       "backgroundColor":"#ff00ff",
    //       "borderColor":"#B5353C",
    //       "hoverBackgroundColor":"#ff00ff",
    //       "data":[-2550]
    //     },
    //     {
    //       "backgroundColor":"#ff0000",
    //       "borderColor":"#B5353C",
    //       "hoverBackgroundColor":"#ff0000",
    //       "data":[-3550]
    //     },
    //     {
    //       "backgroundColor":"#B5353C",
    //       "hoverBackgroundColor":"#B5353C",
    //       "data":[-4500]
    //     }
    //     ]}


    return <div className="mt-5">
      <h5>Other phases overview</h5>
      <HorizontalBar data={data} options={options} />
    </div>
  }
}

// export default MiniMap;
