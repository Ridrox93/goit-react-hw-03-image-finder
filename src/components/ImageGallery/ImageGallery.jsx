import css from './ImadeGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
};
