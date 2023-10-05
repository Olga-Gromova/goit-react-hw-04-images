import { AppStyle } from 'App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/Searchbar/Searchbar';
import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getValuesForm = value => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <AppStyle>
      <SearchBar onSubmit={getValuesForm} />
      <ImageGallery
        searchQuery={searchQuery}
        page={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </AppStyle>
  );
}
