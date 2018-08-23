import React, { Component } from 'react';
import { Jumbotron, Badge, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SavedQueriesList from './SavedQueriesList';
import SavedQueries from '../Services/SavedQueries';


class SubHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSaved: false
    };
  }

  toggleSaved(){
    this.setState({
      showSaved: !this.state.showSaved
    });
  }

  render(){
    const tblabel = this.props.tblabel;
    const tb = this.props.tb;
    const text = this.props.text ? <span className="subText">{this.props.text}</span> : false;

    return (
      <div>
        <Jumbotron className="p-4">
          <div className="container">
            <h2>
              <Badge color="dark" className="float-right">{ tblabel }</Badge>
              {text}
            </h2>
          </div>
        </Jumbotron>

        <div className="container">
          <div className="clearfix">
              <div className="btn-group float-right" role="group">
                <Link to={'/results/' + tb + '/all'} className="btn btn-info">
                  <FontAwesomeIcon icon="list-ul" /> Show all
                </Link>

                <Link to={'/search/' + tb } className="btn btn-primary">
                  <FontAwesomeIcon icon="search" /> Search
                </Link>

                { SavedQueries[tb] && (<Button color="success" onClick={this.toggleSaved.bind(this)}>
                  <FontAwesomeIcon icon="save" /> Saved queries
                </Button>)}
              </div>
          </div>

          {this.state.showSaved && <SavedQueriesList  tb={tb} tblabel={tblabel} closeFn={this.toggleSaved.bind(this)}/>}
        </div>
      </div>
    );
  }
}

export default SubHead;
