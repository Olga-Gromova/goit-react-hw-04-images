import { Component } from 'react';
import { Button, Input, SearchForm, Searchbar } from './Searchbar.styled';
import { FaSistrix } from 'react-icons/fa';

export default class SearchBar extends Component {
  state = {
    imageName: '',
  };

  onChangeInput = e => {
    this.setState({ imageName: e.currentTarget.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.imageName);

    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmitForm}>
          <Button type="submit" aria-label="Search Images">
            <FaSistrix size="20px" />
          </Button>

          <Input
            type="text"
            placeholder="Please, enter name of images for searching"
            value={this.state.imageName}
            onChange={this.onChangeInput}
            name="imageName"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
