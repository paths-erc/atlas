import React, { Component } from 'react';
import { Button, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

import Database from '../Services/Database/Database';
import ChartView from './ChartView';
import Loading from '../Loading/Loading';

export default class ChartList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: false,
      data: false,
      loading: false
    };
  }

  loadChart(id){
    this.setState({ loading: true });
    Database.getChart(id, d => {
      this.setState({ name: d.name });
      this.setState({ data: d.data });
      this.setState({ loading: false });
    });

  }

  render(){
    if (!this.props.charts){
      return <Loading>Loading chart list...</Loading>;
    }
    if (this.props.charts.type === 'error'){
      return (
        <div className="text-danger mt-5 px-5">Sorry! There was an error getting list of chart from the database...</div>
      );
    }
    return (
      <div className="mt-5">
        <ChartView name={this.state.name} data={this.state.data} loading={this.state.loading}/>
        <Card>
          <CardBody>
            <ListGroup>
              { this.props.charts.map( (c, i) => {
                return (
                  <ListGroupItem
                    key={i}
                    tag={Button}
                    onClick={ () => this.loadChart(c.id) } className="mb-3"

                    color="secondary">
                    { c.name }
                  </ListGroupItem>
                );
              } ) }
            </ListGroup>
          </CardBody>
        </Card>

      </div>
    );
  }
}
