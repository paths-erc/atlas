import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class ListPlaces extends Component {

  render() {

    if (!this.props.filteredPlaces) {
      return null;
    }

    return (
      <div className="mt-3">
        <h4>Found { this.props.filteredPlaces.length } places</h4>
        <ol>
          {
            this.props.filteredPlaces.map( (e, i)=>{
              return <li key={i}>
                <strong>{ e.name }</strong>
                <br /><small><span className="coptic">{e.copticname}</span></small>
                {
                  ['greekname', 'egyptianname'].map( (ee, ii)=>{
                    if (e[ee]){
                      return (<div key={ii}><small>{e[ee]}</small></div>);
                    } else {
                      return null;
                    }
                  } )
                }
                <small><FontAwesomeIcon icon="id-badge" /> <Link to={ 'read/places/' + e.id }>paths.places.{e.id}</Link></small>
              </li>
            } )
          }
        </ol>
      </div>
    );
  }
}
