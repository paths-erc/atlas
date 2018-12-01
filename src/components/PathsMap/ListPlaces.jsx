import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ListPlaces extends Component {

  render() {

    if (!this.props.places || !this.props.places.features) {
      return null;
    }

    return (
      <div className="mt-3">
        <h5>Found { this.props.places.features.length } places</h5>
        <ol>
          {
            this.props.places.features.map( (e, i)=>{
              return <li key={i} className="border-bottom border-info mb-3 pb-1">
                <strong>{ e.properties.name }</strong>
                <br /><small><span className="coptic">{e.properties.copticname}</span></small>
                {
                  ['greekname', 'egyptianname'].map( (ee, ii)=>{
                    if (e[ee]){
                      return (<div key={ii}><small>{e.properties[ee]}</small></div>);
                    } else {
                      return null;
                    }
                  } )
                }

                {
                  e.properties['count(mp.id_link)'] ?  <div className="text-right"><Badge color="secondary">{ e.properties['count(mp.id_link)'] } manuscripts related</Badge></div>  : null
                }

                <div><small><FontAwesomeIcon icon="id-badge" /> <Link to={ '/places/' + e.properties.id }>paths.places.{e.properties.id}</Link></small></div>
              </li>
            } )
          }
        </ol>
      </div>
    );
  }
}
