import React, { Component } from 'react';
import css from './Searcbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { Error } from 'components/Error/Error';

export class Searchbar extends Component {
  state = {
    query: '',
    isEmpty: false,
  };

  handleNameChange = event => {
    this.setState({
      query: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      this.setState({ isEmpty: true });
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '', isEmpty: false });
  };

  render() {
    const { query, isEmpty } = this.state;

    return (
      <>
        <header className={css.searchbar}>
          <form onSubmit={this.handleSubmit} className={css.searchForm}>
            <button type="submit" className={css.searchFormButton}>
              <FaSearch />
            </button>

            <input
              name="searchPhoto"
              className={css.searchFormInput}
              type="text"
              value={query}
              onChange={this.handleNameChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
        {isEmpty && <Error text="Query something!" />}
      </>
    );
  }
}
