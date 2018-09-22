import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';


export default class ChartView extends Component {

  parseData(data){
    let d = {
      labels: [],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgba(195,31,42,0.8)',
        borderColor: 'rgba(195,31,42,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(195,31,42,1)',
        hoverBorderColor: 'rgba(195,31,42,0.8)',
        data: []
      }]
    }

    data.forEach(row => {
      d.labels.push(row.series_name)
      Object.keys(row).forEach(k =>{
        if (k !== 'series_name'){
          d.datasets[0].data.push(row[k]);
          d.datasets[0].label = k;
        }
      });
    });

    return d;
  }

  render(){
    if (this.props.loading){
      return <p className="lead my-5 text-secondary">Loading chart...</p>;
    }
    if (!this.props.data){
      return null;
    }

    const data = this.parseData(this.props.data);
    return (
      <div className="my-5">
        <h2>{ this.props.name }</h2>
          <Bar data={ data }  width={100}
          height={350}
          options={{
            maintainAspectRatio: false
          }}/>
      </div>
    );
  }
}
