import React, { Component } from 'react';
import css from './Searcbar.module.css';
import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    searchPhoto: '',
  };

  handleNameChange = event => {
    this.setState({
      searchPhoto: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchPhoto.trim() === '') {
      alert('Query something, please!');
      return;
    }
    this.props.onSubmit(this.state.searchPhoto);
    this.setState({ searchPhoto: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <FaSearch />
          </button>

          <input
            name="searchPhoto"
            className={css.searchFormInput}
            type="text"
            value={this.state.searchPhoto}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
