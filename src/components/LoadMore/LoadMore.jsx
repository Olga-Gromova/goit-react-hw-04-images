import { StyledButtonMore } from './LoadMore.styled';

const LoadMore = ({ onClick }) => {
  return (
    <StyledButtonMore type="button" onClick={() => onClick()}>
      Load more
    </StyledButtonMore>
  );
};

export default LoadMore;
