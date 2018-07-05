import React, { Component } from 'react';
import { FormGroup, Input, Button, Row, Col } from 'reactstrap';
import Database from '../Services/Database/Database';
import SubHead from '../SubHead/SubHead';
import AdvSearchRow from './AdvSearchRow';



class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tb: null,
      tb_label: null,
      tb_stripped: null,
      fields: null,
      rows: ['aa'],
      context: 'Simple search'
    };
  }

  componentDidMount(){
    const tb = this.props.match.params.table;

    Database.inspect(tb, data => {
      this.setState({ fields: data.fields });
      this.setState({ tb: data.name });
      this.setState({ tb_label: data.label });
      this.setState({ tb_stripped: data.stripped_name });
    });
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

  toggleSearch(){
    this.setState({
      context: this.state.context === 'Simple search' ? 'Advanced search': 'Simple search'
    });
  }

  reverseContext(){
    return this.state.context === 'Simple search' ? 'Advanced search': 'Simple search';
  }

  showSearch(){
    if(this.state.context === 'Simple search') {
      return this.simpleSearch();
    } else {
      return this.advancedSearch();
    }
  }

  simpleSearch(){
    return (
      <div>
        <form action={'/results/' + this.state.tb_stripped + '/simple'} method="get" id="searchTitles" className="form">
          <Row>
            <Col xs={8}>
              <FormGroup>
                <Input type="input" placeholder="Enter value" name="string" autoComplete="off" />
              </FormGroup>
            </Col>
            <Col xs={4}>
              <Button type="submit" color="success" block >Search!</Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }

  advancedSearch(){

    return (<form action={'/results/' + this.state.tb_stripped + '/adv'} method="get" id="searchTitles" className="form">
      {
        this.state.rows.map((e, i)=>{
          return <AdvSearchRow
            key={i}
            indexKey={i}
            indexValue={e}
            fields={this.state.fields}
            onAdd={ this.onAdd.bind(this) }
            onRemove={ this.onRemove.bind(this) }
            rows={this.state.rows}
            />
        })
      }

      <Button type="submit" color="success" block>Search!</Button>
    </form>)
  }

  render() {
    if (! this.state.fields) {
      return <div className="m-5 p-5">Loading... </div>;
    }

    return (
      <div>
        <SubHead tb={ this.state.tb_stripped } tblabel={ this.state.label } text={ this.state.context } />


      	<div className="mt-3 container">
          { this.showSearch() }
          <hr />
          <Button type="button" color="warning" onClick={ this.toggleSearch.bind(this) }>{ this.reverseContext() }</Button>
  		  </div>
      </div>
    );
  }
}

export default SearchForm;
