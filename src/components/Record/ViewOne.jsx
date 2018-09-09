import React, { Component } from 'react';
import Database from '../Services/Database/Database';
import Cfg from '../Services/Cfg/Cfg';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import SubHead from '../SubHead/SubHead';
import ViewOneTitle from '../Titles/ViewOneTitle';
import RecordCell from './RecordCell';
import RecordLinks from './RecordLinks';
import UserLinks from './UserLinks';
import Files from './Files';
import Plugin from './Plugin';
import MiniMap from './MiniMap';
import Loading from '../Loading/Loading';
import Timeline from './Timeline';

class ReadTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rec: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps !== this.props ){
      this.setState({
        rec: null
      });

      Database.getOne(nextProps.match.params.table, nextProps.match.params.id, (d) =>{
        this.setState({
          rec: d
        });
      });
    }
  }

  componentDidMount(){
    Database.getOne(this.props.match.params.table, this.props.match.params.id, (d) =>{
      this.setState({
        rec: d
      });
    });
  }

  renderTemplate(rec) {

    if (rec.type === 'error'){
      return (<pre className="text-danger p-5">{ rec.text }</pre>)
    }

    switch (rec.metadata.tb_stripped) {
      case 'titles':
        return (<ViewOneTitle record={ rec } />);
      default:
        if (rec.core.length < 1){
          return (
            <div className="container">
              <SubHead tb={ rec.metadata.tb_stripped } tblabel={rec.metadata.tb_label} text="View record" />
                <Card className="mt-2">
                  <CardHeader>
                    <h3 className="text-danger">Record paths.{ rec.metadata.tb_stripped }.{ this.props.match.params.id }  not found!</h3>
                  </CardHeader>
                </Card>
            </div>
          )
        }
        return(
          <div className="container">

            <SubHead tb={ rec.metadata.tb_stripped } tblabel={rec.metadata.tb_label} text="View record" />

            <Row className="mt-2">
              <Col sm="8">
                <Card>
                  <CardHeader>
                    <h3>paths.{ rec.metadata.tb_stripped }.{ rec.core.id.val }</h3>
                  </CardHeader>
                  <CardBody>
                    {
                      Object.values(rec.core).map( (i, k) => {
                        return <RecordCell
                            coptic= { Cfg.coptic.indexOf(rec.metadata.tb_id + '.' + i.name) > -1}
                            greek= { Cfg.greek.indexOf(rec.metadata.tb_id + '.' + i.name) > -1}
                            label={ i.label }
                            val={ i.val_label ? i.val_label : i.val}
                            key={k} />
                      })
                    }
                    {
                      Object.keys(rec.plugins).map( (t, k) => {
                        return  <Plugin key={k} data={rec.plugins[t]} />
                      })
                    }
                  </CardBody>
                </Card>
              </Col>
              <Col sm="4">
                <MiniMap geom={ rec.geodata } />
                <Timeline placefase={ rec.plugins.paths__m_placefase } />
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
      return <div className="m-5 p-5"><Loading /></div>;
    }

    return (
      <div className="mb-5">
        { this.renderTemplate(this.state.rec) }
      </div>
    );
  }
}

export default ReadTitle;
