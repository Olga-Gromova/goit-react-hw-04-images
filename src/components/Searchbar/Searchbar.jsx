import { useState } from 'react';
import { Button, Input, SearchForm, Searchbar } from './Searchbar.styled';
import { FaSistrix } from 'react-icons/fa';

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const onChangeInput = e => {
    setValue(e.currentTarget.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    onSubmit(value);

    setValue('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmitForm}>
        <Button type="submit" aria-label="Search Images">
          <FaSistrix size="20px" />
        </Button>

        <Input
          type="text"
          placeholder="Please, enter name of images for searching"
          value={value}
          onChange={onChangeInput}
          name="imageName"
        />
      </SearchForm>
    </Searchbar>
  );
}
