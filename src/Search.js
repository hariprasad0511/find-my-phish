import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: "",
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    var searchUrl = `https://5cltihqao9.execute-api.eu-west-1.amazonaws.com/dev/check_url?url=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ result: jsonData.message });
      });
  };

  render() {
    return (
      <div id="main">
        <h1>find-my-Phish</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.result ? (
          <div id="result-container">
            <h2>{this.state.result}</h2>
          </div>
        ) : (
          <p>Try searching for a URL</p>
        )}
      </div>
    );
  }
}

export default Search;
