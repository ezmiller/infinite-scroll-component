import React, { Component } from 'react';
import fetch from 'node-fetch';
import InfiniteScroll, { LoadIndicator } from './InfiniteScroll';
import Row from './Row';
import './App.css';

const API_URL = 'https://api.github.com/search/repositories';

class App extends Component {
  state = {
    repos: [],
    nextPage: 1,
    loading: false,
  }

  fetchRepoData(page) {
    const { nextPage } = this.state;

    this.setState({ loading: true });

    const url = `${API_URL}?q=is:public&per_page=10&page=${nextPage}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(`${response.status}: ${response.statusMessage}`);
        }

        return response.json();
      })
      .catch(console.error);
  }

  componentDidMount = () => {
    this.fetchRepoData(this.state.nextPage).then(data => this.setState({
      repos: data.items,
      nextPage: 2,
      loading: false,
    }));
  }

  getNextData = () => {
    if (this.state.loading) {
      console.log('already loading...');
      return;
    }

    this.fetchRepoData(this.state.nextPage).then(data => this.setState({
      repos: this.state.repos.concat(data.items),
      nextPage: this.state.nextPage + 1,
      loading: false,
    }));
  }

  render() {
    const { repos, loading } = this.state;

    return (
      <div className="App" style={{ height: '100vh' }}>
        <InfiniteScroll
          data={repos}
          loader={this.getNextData}
          threshold={100}
          loading={true}
        >
          {({data, loading}) => {
            const rows = data.map(({
              id,
              owner,
              name,
              description,
            }) => (
              <Row
                key={`${id}-${name}`}
                headerText={`Github Project: ${id}`}
                titleText={name}
                descriptionText={description}
              />
            ));
            const loadIndicator =
                  loading ? <LoadIndicator loading={loading} /> : null;

            return (
              <React.Fragment>
                {rows}
                {loadIndicator}
              </React.Fragment>
            );
          }}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
