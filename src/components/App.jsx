import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchPhoto: '',
    isImagesLoading: false,
  };

  handleFormSubmit = searchPhoto => {
    this.setState({ searchPhoto });
    if (searchPhoto) {
      this.setState({ isImagesLoading: true });
    }
  };

  handleLoadingStatus = () => {
    this.setState({ isImagesLoading: false });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchPhoto={this.state.searchPhoto}
          onImagesLoad={this.handleLoadingStatus}
          isImagesLoading={this.state.isImagesLoading}
        />
      </div>
    );
  }
}
