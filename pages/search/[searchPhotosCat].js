import axios from "axios";
import Modal from "react-modal";
import Masonry from "react-masonry-component";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";

const masonryOptions = {
  fitWidth: false,
  columnWidth: 250,
  gutter: 0,
  itemSelector: ".photo-item",
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "80%",
    height: "90%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

const SearchPhotosId = ({ search, cat }) => {
  const [imageModal, setImageModal] = useState({
    ImageUrl: "",
    ImageDesc: "",
    ImageWidth: 0,
    imageHeight: 0,
    modalIsOpen: false,
  });

  function closeModal() {
    setImageModal({ ...imageModal, modalIsOpen: false });
  }
  return (
    <>
      <Head >
        <title> {search.meta.keyword} | Unsplash </title>
        <meta
          name={search.meta.keyword}
          content={search.meta.title && search.meta.keyword}
          description={
            search.meta.description
              ? search.meta.description
              : `This is the photos of ${search.meta.keyword}`
          }
        />
      </Head>
      {/* <h1 className="heading text-green-600">Results for {`"${cat}"`}</h1> */}
      <Masonry
        className={"photo-list"}
        elementType={"div"}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {search.photos.results &&
          search.photos.results.map((images, i) => (
            <div className="photo-item" key={i}>
              <Image
                src={images.urls.regular}
                alt={images.description ? images.description : "Photos"}
                width={images.width}
                height={images.height}
                placeholder="blur"
                blurDataURL={images.urls.regular}
                onClick={() => {
                  setImageModal({
                    ImageUrl: images.urls.regular,
                    ImageDesc: images.description
                      ? images.description
                      : "Unsplash Photo",
                    ImageWidth: images.width,
                    imageHeight: images.height,
                    modalIsOpen: true,
                  });
                }}
              />
            </div>
          ))}
      </Masonry>
      <div>
        <Modal
          isOpen={imageModal.modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="model-show-image">
            <Image
              src={imageModal.ImageUrl}
              alt={imageModal.ImageDesc}
              width={imageModal.ImageWidth / 6}
              height={imageModal.imageHeight / 6}
              placeholder="blur"
              blurDataURL={imageModal.ImageUrl}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SearchPhotosId;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { searchPhotosCat } = params;
  const client_ID = process.env.NEXT_PUBLIC_UNSPLASH_ID;

  const response = await axios.get(
    `https://api.unsplash.com/search?per_page=30&query=${searchPhotosCat}`,
    {
      headers: {
        Authorization: `Client-ID ${client_ID}`,
      },
    }
  );
  return {
    props: { search: response.data, cat: searchPhotosCat },
  };
};
