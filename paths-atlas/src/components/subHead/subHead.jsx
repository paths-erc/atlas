import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

class SubHead extends Component {


  render(){
    const tblabel = this.props.tblabel;
    const tb = this.props.tb;
    const text = this.props.text;

    return (
      <div>
        <Jumbotron style={ {padding: 10} }>
          <div className="container">
            <h1>{ tblabel } { text ? <span className="subText">| <small>{text}</small></span> : false}
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
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubHead;
