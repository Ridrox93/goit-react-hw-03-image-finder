import css from './ImageGalleryItem.module.css';
import 'photoswipe/dist/photoswipe.css';

import { Item } from 'react-photoswipe-gallery';

export const ImageGalleryItem = props => {
  return (
    <Item
      original={props.image.largeImageURL}
      thumbnail={props.image.webformatURL}
      width="1024"
      height="768"
    >
      {({ ref, open }) => (
        <li className={css.ImageGalleryItem}>
          <img
            alt={props.image.tags}
            className={css.ImageGalleryItemImage}
            ref={ref}
            onClick={open}
            src={props.image.webformatURL}
          />
        </li>
      )}
    </Item>
  );
};
