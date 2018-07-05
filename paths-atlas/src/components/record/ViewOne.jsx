import React, { Component } from 'react';

import Database from '../services/database/database';

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import SubHead from '../subHead/subHead';

import ViewOneTitle from '../titles/ViewOneTitle';

import RecordCell from './recordCell';
import RecordLinks from './recordLinks';
import UserLinks from './UserLinks';
import Files from './Files';
import Plugin from './Plugin';
import MiniMap from './MiniMap';

class ReadTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rec: false
    };
  }

  componentDidMount(){
    const tb = this.props.match.params.table;
    Database.getOne(tb, this.props.match.params.id, (d) =>{
      this.setState({
        rec: d
      });
    });
  }

  renderPlugins(all_plugins) {
    if (typeof allPlugins !== 'undefined') {
      Object.keys(all_plugins).map( (i, k) => {
        return <Plugin name={i} key={k} data={this.state.rec.allPlugins[i]} />
      } );
    }
  }

  renderTemplate(tb, record) {
    switch (tb) {
      case 'titles':
        return (<ViewOneTitle record={ this.state.rec } />);
      default:
        return(
          <div className="container">

            <SubHead tb={ tb } tblabel={this.state.rec.metadata.table_label} text="View record" />

            <Row className="mt-2">
              <Col sm="8">
                <Card>
                  <CardHeader>
                    <h3>paths.{ this.state.rec.metadata.stripped_table }.{ record.core.id }</h3>
                  </CardHeader>
                  <CardBody>
                    {
                      Object.keys(record.fields).map( (i, k) => {
                        return <RecordCell label={record.fields[i]} val={ record.core[i] } key={k} />
                      })
                    }
                    { this.renderPlugins(this.state.rec.allPlugins) }
                  </CardBody>
                </Card>
              </Col>
              <Col xs="4">
                <MiniMap geom={ rec.geodata } />
                <Files files={ rec.files } baseUrl={ Database.getBaseUrl() } />
                <RecordLinks links={ rec.links } backlinks={ rec.backlinks } />
                <UserLinks links={ rec.manualLinks } />
              </Col>
            </Row>
          </div>
        )
    }
  }

  render() {
    if (!this.state.rec) {
      return (<div>Loading...</div>)
    }

    return (
      <div className="mb-5">
        { this.renderTemplate(this.state.rec.metadata.stripped_table, this.state.rec) }
      </div>
    );
  }
}

export default ReadTitle;
