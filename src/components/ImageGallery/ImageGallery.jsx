import { useState, useEffect } from 'react';
import css from './ImadeGallery.module.css';
import { getImages } from 'components/service/service';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import 'photoswipe/dist/photoswipe.css';
import { FaInfoCircle } from 'react-icons/fa';

import { Gallery } from 'react-photoswipe-gallery';
import { Button } from 'components/Button/Button';

export const ImageGallery = props => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isImegesPresent, setIsImegesPresent] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!props.searchPhoto) return;
    getImages(props.searchPhoto, page)
      .then(response => {
        props.onImagesLoad();

        if (response.hits.length < 12) {
          setShowLoadMore(false);
        } else {
          setShowLoadMore(true);
        }

        if (response.hits.length) {
          setImages(prevImages => {
            return [...prevImages, ...response.hits];
          });
          setIsImegesPresent(true);
        } else {
          setIsImegesPresent(false);
        }
      })

      .catch(error => {
        console.error(error);
      });
  }, [props.searchPhoto, page]);

  if (props.isImagesLoading) {
    return <Loader />;
  }

  if (!props.isImagesLoading && isImegesPresent === false) {
    return (
      <div className={css.info}>
        <FaInfoCircle size={45} color="red" />
        <div className={css.infoText}>Not found</div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <Gallery>
        <ul className={css.gallery}>
          {images.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />;
          })}
        </ul>
      </Gallery>

      {showLoadMore && (
        <Button
          onClick={() => {
            setPage(prevPage => {
              return prevPage + 1;
            });
          }}
        />
        // <button
        //   type="button"
        //   onClick={() => {
        //     setPage(prevPage => {
        //       return prevPage + 1;
        //     });
        //   }}
        // >
        //   Load more
        // </button>
      )}
    </div>
  );
};
