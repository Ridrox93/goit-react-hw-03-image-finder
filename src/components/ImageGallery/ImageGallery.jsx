import { useState, useEffect, useCallback } from 'react';
import css from './ImadeGallery.module.css';
import { getImages } from 'components/service/service';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import 'photoswipe/dist/photoswipe.css';
import { FaInfoCircle } from 'react-icons/fa';

import { Gallery } from 'react-photoswipe-gallery';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({
  searchPhoto,
  onImagesLoad,
  isImagesLoading,
  images,
  handlImagesAdding,
  handlShowLoadMore,
  showLoadMore,
}) => {
  const [page, setPage] = useState(1);
  const [isImegesPresent, setIsImegesPresent] = useState(null);
  const handleImagesLoad = useCallback(onImagesLoad, [onImagesLoad]);
  const addNewImages = useCallback(handlImagesAdding, [handlImagesAdding]);
  const setLoadMoreStatus = useCallback(handlShowLoadMore, [handlShowLoadMore]);

  useEffect(() => {
    if (!searchPhoto) return;

    if (!images.length) {
      handleImagesLoad(true);
    }
    getImages(searchPhoto, page)
      .then(response => {
        if (response.hits.length < 12) {
          setLoadMoreStatus(false);
        } else {
          setLoadMoreStatus(true);
        }

        if (response.hits.length) {
          addNewImages(response.hits);
          setIsImegesPresent(true);
        } else {
          setIsImegesPresent(false);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        handleImagesLoad(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPhoto, page, handleImagesLoad, addNewImages, setLoadMoreStatus]);

  if (isImagesLoading) {
    return <Loader />;
  }

  if (!isImagesLoading && isImegesPresent === false) {
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
      )}
    </div>
  );
};
