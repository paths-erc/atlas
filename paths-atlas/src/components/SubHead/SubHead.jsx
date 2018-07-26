import React, { Component } from 'react';
import { Jumbotron, Badge, Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

class SubHead extends Component {


  render(){
    const tblabel = this.props.tblabel;
    const tb = this.props.tb;
    const text = this.props.text;

    return (
      <div>
        <Jumbotron className="p-4">
          <div className="container">
            <h1><Badge color="dark" className="float-right">{ tblabel }</Badge> { text ? <span className="subText"> {text}</span> : false}
            </h1>
          </div>
        </Jumbotron>

        <div className="container">
          <div className="clearfix">
              <div className="btn-group pull-right" role="group">
                <Link to={'/results/' + tb + '/all'} className="btn btn-info">
                  <FontAwesomeIcon icon="list-ul" /> Show all
                </Link>

                <Link to={'/search/' + tb } className="btn btn-primary">
                  <FontAwesomeIcon icon="search" /> Search
                </Link>

                <Button>ciao</Button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubHead;
