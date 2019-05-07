import React, { Component } from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Card from './card';
import './style.css';
    
library.add(faUserEdit);

class App extends Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
    this.sortEmail = this.sortEmail.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = {
      filterText: "",
      results: [],
      originalResults: [],
      sortAsc: true
    };
  }

  sortEmail() {
    let sortedResults = this.state.results;
    let sortOrder = this.state.sortAsc;
    //sort by email ascending
    sortedResults.sort(function(a, b) { 
      let comparison = (a.email > b.email) && sortOrder ? 1 : -1;
      return comparison;
    });

    this.setState({
      results: sortedResults,
      sortAsc: !sortOrder // Toggle between ASC and DESC
    });
  }

  search(e) {
    const searchBar = document.getElementById("search");
    if(this.state.originalResults === undefined 
      || this.state.originalResults.length == 0) {
        this.setState({ originalResults: this.state.results });
    }
    // If search bar has a value
    if (searchBar.value != "") {
      this.setState({
        filterText: searchBar.value
      });

      // filter results
      let filteredResults = this.state.results.filter((user) => {
        let userName = user.name.last.toLowerCase()
        return userName.indexOf(
          this.state.filterText.toLowerCase()) !== -1
      })
      // set the state for results
      this.setState({
        results: filteredResults
      });
      
    } else {
      // reset the list once input is clear
      this.setState({
        results: this.state.originalResults
      });

    }
  }
  
  clearSearch(e){
    const searchBar = document.getElementById("search");
    searchBar.value = "";
    this.setState({
        results: this.state.originalResults
    });
  }

  render() {      
    return (
      <div>
        <div className="searchBar">
          <input type="text" placeholder="Enter last name.." id="search" onChange={this.search}/>
          <button type="button" onClick={this.clearSearch}>Clear</button>
          <button type="button" onClick={this.sortEmail}>Sort by email</button>
        </div>
        <ul>
          {this.state.results.map(result =>
            <li key={ result.phone }>
              <Card name={result.name.first + " " + result.name.last} picture={result.picture.large} email={result.email} city={result.location.city} state={result.location.state} phone={result.phone}
              />
            </li>
          )}
          <li>
          <h1> {this.state.name} </h1>
          </li>
        </ul>
      </div>
    );
  }

  componentWillMount() {
    // pull down random users from api
    fetch('https://randomuser.me/api?results=20')
      .then(response => response.json())
      .then(data => this.setState({ results: data.results, originalResults: data.results }));
  }
  componentDidUpdate() {
  }
}

render(<App />, document.getElementById('root'));
