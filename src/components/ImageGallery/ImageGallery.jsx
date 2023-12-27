import { useState,useEffect,useRef } from "react";
import PropTypes from "prop-types";
import css from "./imageGallery.module.css"
import getImages from "../Api/Api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";



const ImageGallery = ({ onClick, inputValue, loadMoreBtn }) => {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState("idle");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const prevInputValue = useRef("");

    useEffect(() => {
        if (inputValue !== prevInputValue.current) {
            setImages([]);
            setPage(1);
            prevInputValue.current = inputValue;
        }
    }, [inputValue]);

    useEffect (() => {
        const fetchLoadMore = async () => {
            setLoading(true)

            try {
                const response = await getImages (inputValue, page)

                if(!mounted.current) return

                if(response.hits.length > 0) {
                    setImages((prevImages) => [...prevImages, ...response.hits]);
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


        if(page >=1 ) {
            fetchLoadMore()
        }

        return () => {
            mounted.current = false
        }


    }, [inputValue, page])

    const loadMoreHandler = () => {
        setPage((prevPage) => prevPage + 1);
        loadMoreBtn();
    };


    if (loading && images.length === 0) {
        return <Loader />;
    }


   
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
                    {status === "resolved" && images.length !== 0 && (
                        <div style={{ textAlign: "center" }}>
                            <Button onClick={loadMoreHandler} />
                        </div>
                    )}
                    {status === "rejected" && <p>No more images</p>}
                </>
            );
        };
   
    

  
        


ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
};

export default ImageGallery