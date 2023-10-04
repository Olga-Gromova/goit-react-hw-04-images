import { AppStyle } from 'App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/Searchbar/Searchbar';
import { Component } from 'react';

export default class App extends Component {
  state = {
    imageName: '',
  };

  getValuesForm = val => {
    this.setState({ imageName: val });
  };

  render() {
    return (
      <AppStyle>
        <SearchBar onSubmit={this.getValuesForm} />
        <ImageGallery imageName={this.state.imageName} />
      </AppStyle>
    );
  }
}
