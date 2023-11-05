import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchPhoto: '',
    isImagesLoading: false,
    images: [],
    showLoadMore: false,
  };

  handleFormSubmit = newSearchPhoto => {
    if (!newSearchPhoto) return;
    if (newSearchPhoto === this.state.searchPhoto) return;
    this.setState({
      searchPhoto: newSearchPhoto,
      images: [],
      showLoadMore: false,
    });
  };

  handleLoadingStatus = status => {
    this.setState({ isImagesLoading: status });
  };

  handlImagesAdding = newImages => {
    this.setState({ images: [...this.state.images, ...newImages] });
  };

  handlShowLoadMore = show => {
    this.setState({ showLoadMore: show });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          showLoadMore={this.state.showLoadMore}
          handlShowLoadMore={this.handlShowLoadMore}
          handlImagesAdding={this.handlImagesAdding}
          images={this.state.images}
          searchPhoto={this.state.searchPhoto}
          onImagesLoad={this.handleLoadingStatus}
          isImagesLoading={this.state.isImagesLoading}
        />
      </div>
    );
  }
}
