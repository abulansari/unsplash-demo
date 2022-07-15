import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../store/actions/userAction";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "react-modal";
import Masonry from "react-masonry-component";

const masonryOptions = {
  fitWidth: false,
  columnWidth: 250,
  gutter: 0,
  itemSelector: ".photo-item",
};

/* model */
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
/* model */

const ImagesData = () => {
  /* model */
  const router = useRouter();

  function closeModal() {
    router.push("/", undefined, { shallow: true });

    setImageModal({ ...imageModal, modalIsOpen: false });
  }
  /* model */

  const [allData, setAllData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [imageModal, setImageModal] = useState({
    ImageUrl: "",
    ImageDesc: "",
    ImageWidth: 0,
    imageHeight: 0,
    modalIsOpen: false,
  });

  const { image } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getData = (pageNo) => {
    dispatch(fetchImages(pageNo));
  };

  useEffect(() => {
    setAllData([...allData, ...image]);
  }, [image]);

  useEffect(() => {
    dispatch(fetchImages(pageNo));
  }, []);

  const fetchData = () => {
    setPageNo(pageNo + 1);
    getData(pageNo + 1);
  };

  const refresh = () => {
    console.log("refresh.....");
  };

  return (
    <>
      <InfiniteScroll
        dataLength={allData.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading......</h4>}
        endMessage={<h2>Yaa! You have seen it all</h2>}
        refreshFunction={refresh}
      >
        {/* <ul className="photo-list"> */}
        <Masonry
          className={"photo-list"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {allData &&
            allData.map((images, i) => (
              <div className="photo-item" key={i}>
                <Link
                  href={""}
                  as={`/photos/${images.id}`}
                  passHref
                  scroll={false}
                >
                  <Image
                    src={images.urls.regular}
                    alt={"Photos"}
                    width={images.width}
                    height={images.height}
                    placeholder="blur"
                    blurDataURL={images.urls.small}
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
                </Link>
              </div>
            ))}
          {/* </ul> */}
        </Masonry>
      </InfiniteScroll>
      {/* model */}
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
              width={imageModal.ImageWidth}
              height={imageModal.imageHeight }
              placeholder="blur"
              blurDataURL={imageModal.ImageUrl}
            />
          </div>
        </Modal>
      </div>

      {/* model */}
    </>
  );
};

export default ImagesData;
