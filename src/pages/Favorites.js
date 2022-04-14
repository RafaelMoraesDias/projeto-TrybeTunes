import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      preferidas: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.Getpreferidas();
  }

Getpreferidas = async () => {
  this.setState({ loading: true });
  const myMusics = await getFavoriteSongs();
  this.setState({
    preferidas: myMusics,
    loading: false,
  });
}

render() {
  const { preferidas } = this.state;
  console.log(preferidas);
  return (
    <div data-testid="page-favorites">
      <Header />
      { preferidas.map((el) => (
        <MusicCard
          { ...el }
        />))}
    </div>
  );
}
}
export default Favorites;
