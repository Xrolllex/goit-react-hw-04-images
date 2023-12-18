import { Component } from "react";
import PropTypes from "prop-types";
import css from "./imageGallery.module.css"
import getImages from "../Api/Api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";



class ImageGallery extends Component {
   state = {
    images: [],
    status: "idle",
    loading: false,
   }


   componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
        this.setState ({loading: true});
        this.fetchLoad()
    }
    if(prevProps.page !== this.props.page && this.props.page >1) {
        this.fetchLoadMore()
    }
   }

   fetchLoad = () => {
    const { inputValue, page } = this.props;

    this.setState({ loading: true });

    setTimeout(() => {
        getImages(inputValue, page)
            .then(response => {
                this.setState({ images: response.hits, status: "resolved", loading: false });
            })
            .catch(error => this.setState({ status: "rejected", loading: false }));
    }, 2000);
};


fetchLoadMore = () => {
    const { inputValue, page } = this.props;

    getImages(inputValue, page)
        .then(response => {
            this.setState((prevState) => ({ images: [...prevState.images, ...response.hits]}));
        })
        .catch(error => this.setState({ status: "rejected" }));
};


render() {
    const { images, status, loading} = this.state;

    if (loading) {
        return <Loader />;
    }

    if (status === "resolved") {
        return (
            <>
                    <ul className={css.imageGallery}>
                        {images.map(({ id, largeImageURL, tags }) => (
                            <ImageGalleryItem
                                key={id}
                                url={largeImageURL}
                                tags={tags}
                                onClick={this.props.onClick}
                            />
                        ))}
                    </ul>
                    {this.state.images.length !== 0 ? (
                        <div style={{textAlign: 'center'}}><Button onClick={this.props.loadMoreBtn} />
                        </div>
                    ) : (
                        <p>No more images</p>
                    )}

            </>
        );
    }
    return null;
};

}

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
};

export default ImageGallery