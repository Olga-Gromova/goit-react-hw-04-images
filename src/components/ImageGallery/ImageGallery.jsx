import { useState, useEffect } from 'react';
import { getImg } from 'services/api';
import { scrollToBottom } from 'utilits/scroll';
import { GalleryList, StyledText, TitleResults } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import ScrollToTop from 'react-scroll-to-top';
import { FaSistrix } from 'react-icons/fa';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const { IDLE, PENDING, RESOLVED, REJECTED } = STATUS;

export default function ImageGallery({ searchQuery, page, setCurrentPage }) {
  const [status, setStatus] = useState(IDLE);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchPixabayImg = async (name, newPage = 1) => {
      setStatus(PENDING);

      if (!name) return;
      try {
        const { hits, totalHits } = await getImg(name, newPage);
        if (page === 1) {
          setImages(hits);
        } else {
          setImages(prevState => [...prevState, ...hits]);
        }
        setLoadMore(page < Math.ceil(totalHits / 12));
        setStatus(RESOLVED);

        if (totalHits === 0) {
          return await Promise.reject(
            new Error('There are some problems, try again with other name')
          );
        }
      } catch (err) {
        setStatus(REJECTED);
        setError(err.message);
        console.log(err.message);
      }
    };
    fetchPixabayImg(searchQuery, page);
  }, [page, searchQuery]);

  const onClickBtn = () => {
    setCurrentPage(page + 1);
    scrollToBottom();
  };

  const toggleModal = photo => {
    setShowModal(!showModal);
    setPhoto(photo);
  };

  if (status === IDLE) {
    return (
      <TitleResults>
        Hello, if you put some word above & click <FaSistrix /> you will see
        images by this subject
      </TitleResults>
    );
  }

  if (status === RESOLVED) {
    return (
      <>
        <TitleResults>
          These images were found based on your search request: "{searchQuery}"
        </TitleResults>
        <GalleryList>
          <ImageGalleryItem data={images} openModal={toggleModal} />
        </GalleryList>
        {loadMore && <LoadMore onClick={onClickBtn} />}
        {!loadMore && (
          <StyledText>
            👀 Sorry, the set of images by request "{searchQuery}" has ended
          </StyledText>
        )}
        {showModal && <Modal photo={photo} closeModal={toggleModal} />}
        <ScrollToTop smooth />
      </>
    );
  }
  if (status === PENDING) {
    return <Loader />;
  }

  if (status === REJECTED) {
    return <h2>{error}</h2>;
  }
}
