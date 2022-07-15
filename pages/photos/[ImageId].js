import axios from "axios";
import Image from "next/image";

const ShowImage = ({ image }) => {
  return (
    <>
      <Image
        src={image.urls.regular}
        alt={image.alt_description ? image.alt_description : "Image" }
        width={image.width }
        height={image.height}
      />
    </>
  );
};

export default ShowImage;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { ImageId } = params;

  const client_ID = process.env.NEXT_PUBLIC_UNSPLASH_ID;
  const response = await axios.get(
    `https://api.unsplash.com/photos/${ImageId}`,
    {
      headers: {
        Authorization: `Client-ID ${client_ID}`,
      },
    }
  );
  return {
    props: { image: response.data, images: "bhhdg" },
  };
};
