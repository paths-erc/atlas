import React, { Component } from 'react';
import { Button } from 'reactstrap';

import AdvSearchRow from './AdvSearchRow';


class AdvSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: ['aa']
    };
  }

  onAdd(){
    const k = 'aa' + new Date().getTime();
    this.setState({ rows: this.state.rows.concat(k)});
  }

  onRemove(k){
    let newArr = this.state.rows;
    newArr.splice(k, 1);
    if (this.state.rows.length > 0) {
      this.setState({ rows: newArr });
    }
  }

  render() {
    return (
      <div>
        <form action={`${this.props.base}/results/${this.props.tb}/adv`} method="get" id="searchTitles" className="form">
          {
            this.state.rows.map((e, i)=>{
              return <AdvSearchRow
                key={i}
                indexKey={i}
                indexValue={e}
                fields={this.props.fields}
                onAdd={ this.onAdd.bind(this) }
                onRemove={ this.onRemove.bind(this) }
                rows={this.state.rows}
                />
            })
          }

          <Button type="submit" color="success" block>Search!</Button>
        </form>
      </div>
    );
  }
}

export default AdvSearchForm;
