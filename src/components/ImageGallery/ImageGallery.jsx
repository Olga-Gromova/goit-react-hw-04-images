import { Component } from 'react';
import { fetchPixabayImg } from 'services/api';
import { scrollToBottom } from 'utilits/scroll';
import { GalleryList, TitleResults } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';


const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const { IDLE, PENDING, RESOLVED, REJECTED } = STATUS;
export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: IDLE,
    showModal: false,
    photo: '',
    totalImages: 0,
    loadMore: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;
    const prevName = prevProps.imageName;
    const prevPage = prevState.page;

    if (prevName !== imageName) {
      this.setState({ images: [] });
      this.fetchPixabayImg(imageName);
    }

    if (prevPage !== page && this.state.status === RESOLVED) {
      this.fetchPixabayImg(imageName, page);
    }
  }

  fetchPixabayImg = async (name, page) => {
    this.setState({ status: PENDING });
    if (!name) return;
    try {
      const { hits, totalHits } = await fetchPixabayImg(name, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
        status: RESOLVED,
        totalImages: prevState.totalImages + hits.length,
      }));
      
      if (totalHits === 0) {
        return await Promise.reject(
          new Error('There are some problems, try again later')
        );
      }
    } catch (err) {
      this.setState({ status: REJECTED, error: err.message });
      console.log(err.message);
    }
  };

  onClickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    scrollToBottom();
  };

  openModal = photo => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      photo,
    }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { status, error, showModal, photo, loadMore } = this.state;
    if (status === IDLE) {
      return;
    }

    if (status === RESOLVED) {
      return (
        <>
          <TitleResults>
            These images were found based on your search request: "
            {this.props.imageName}"
          </TitleResults>
          <GalleryList>
            <ImageGalleryItem
              data={this.state.images}
              openModal={this.openModal}
            />
          </GalleryList>
          {loadMore && <LoadMore onClick={this.onClickBtn} />}
          {!loadMore && <p>The selection of selected images has ended</p>}
          {showModal && <Modal photo={photo} closeModal={this.closeModal} />}
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
}
