import { useState } from "react";
import SearchBar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal"



const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);



  const getInputValue = (handleValue) => {
    setInputValue(handleValue);
            setPage(1);
}


const toggleModal = () => {
    setShowModal((showModal) => !showModal);
}

const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
}

const loadMoreBtn = () => {
  setPage((prevState) => prevState + 1);
    }




        return (
            <>
                <SearchBar getInputValue={getInputValue}/>
                <ImageGallery inputValue={inputValue} onClick={getLargeImg} loadMoreBtn={loadMoreBtn} page={ page}/>
                {showModal && <Modal url={modalImg} onClose={toggleModal} />} 
            </>
        )
    }



export default App;