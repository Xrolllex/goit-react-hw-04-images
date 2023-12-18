import { useState,useEffect } from "react";
import PropTypes from "prop-types";
import css from "./imageGallery.module.css"
import getImages from "../Api/Api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";



const ImageGallery = ({ onClick, inputValue, page, loadMoreBtn }) => {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState("idle");
    const [loading, setLoading] = useState(false);


    useEffect (() => {
        const fetchLoadMore = async () => {
            setLoading(true)

            try {
                const response = await getImages (inputValue, page)

                if(!mounted.current) return

                if(response.hits.length > 0) {
                    setImages(response.hits)
                    setStatus("resolved")
                } else {
                    setStatus("rejected")
                }
            }
            catch(error) {
                setStatus("rejected")
            }
            finally {
                setLoading (false)
            }
        }


        const mounted = {current: true}


        if(page >1 ) {
            fetchLoadMore()
        }

        return () => {
            mounted.current = false
        }


    }, [inputValue, page])

    if(loading) {
        return <Loader />
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
                                onClick={onClick}
                            />
                        ))}
                    </ul>
                    {this.state.images.length !== 0 ? (
                        <div style={{textAlign: 'center'}}><Button onClick={loadMoreBtn} />
                        </div>
                    ) : (
                        <p>No more images</p>
                    )}

            </>
        );
    }
    return null;
};
    

  
        


ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
};

export default ImageGallery