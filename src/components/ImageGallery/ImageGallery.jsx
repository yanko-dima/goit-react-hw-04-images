import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

class ImageGallery extends Component {
  srate = {};

  componentDidMount() {
    const imgName = this.props.imgName;
    // const KEY = 27888292 - ee7badc36537d4c81fc58ae14;
    fetch(
      `https://pixabay.com/api/?q=${imgName}&page=1&key=27888292-ee7badc36537d4c81fc58ae14&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(result => console.log(result));
  }

  render() {
    return (
      <ul className={css.imageGallery}>
        {}
        <ImageGalleryItem />
      </ul>
    );
  }
}

export default ImageGallery;
