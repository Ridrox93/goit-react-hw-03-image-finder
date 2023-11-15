import { ModalCustom } from 'components/ModalCustom/ModalCustom';
import css from './ImageGalleryItem.module.css';

import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  togleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const {
      image: { webformatURL, tags, largeImageURL },
    } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <li className={css.ImageGalleryItem} onClick={this.togleModal}>
          <img
            alt={tags}
            className={css.ImageGalleryItemImage}
            src={webformatURL}
          />
        </li>
        <ModalCustom
          modalIsOpen={showModal}
          closeModal={this.togleModal}
          tags={tags}
          largeImageURL={largeImageURL}
        />
      </>
    );
  }
}
