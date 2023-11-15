import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/service';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Error } from './Error/Error';

export class App extends Component {
  state = {
    query: '',
    loading: false,
    images: [],
    loadMore: false,
    error: null,
    page: 1,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  getPhotos = async (query, page) => {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await getImages(query, page);
      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFormSubmit = value => {
    if (value === this.state.query) return;
    this.setState({
      query: value,
      images: [],
      page: 1,
      isEmpty: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, error, loadMore, isEmpty } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {error && <Error text="Something went wrong!" />}
        {images.length !== 0 && <ImageGallery images={images} />}
        {loadMore && !loading && images.length !== 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {isEmpty && <Error text="Not found!" />}
      </>
    );
  }
}
