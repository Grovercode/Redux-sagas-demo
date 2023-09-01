import React, { Component } from 'react';
import { loadImages } from '../../../redux/actions';
import { connect } from 'react-redux';
import './styles.css';
import { Button } from '@chakra-ui/react';

const key = 'vso1n52i5tSd7jM0yAgAz-KvnF0E6b6rQrB3lpUlchE';

class ImageGrid extends Component {
  componentDidMount() {
    this.props.loadImages();
  }

  render() {
    const { isLoading, images, loadImages, error, imageStats } = this.props;
    console.log(this.props);
    return (
      <div className="content">
        <section className="grid">
          {images.map((image) => (
            <div
              key={image.id}
              className={`item item-${Math.ceil(image.height / image.width)}`}
            >
              <img src={image.urls.small} alt={image.user.username} />
            </div>
          ))}
        </section>
        {error && <div className="error">{JSON.stringify(error)}</div>}
        <Button onClick={() => !isLoading && loadImages()} loading={isLoading}>
          Load More
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ isLoading, images, error, imageStats }) => ({
  isLoading,
  images,
  error,
  imageStats,
});

const mapDispatchToProps = (dispatch) => ({
  loadImages: () => dispatch(loadImages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid);
