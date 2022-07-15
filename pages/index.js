import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import ImageData from "../components/ImagesData";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useRouter } from "next/router";

const Home = ({ image }) => {
  const [searchCat, setSearchCat] = useState("");

  const router = useRouter();
  const query = () => {
    router.push(`/search/${searchCat}`);
  };
  return (
    <>
      <Head>
        <title>Unsplash | Home Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="unsplash" content="unsplash-photo, width=device-width" />
        <meta name="photo" content="nature-photo, width=device-width" />
        <meta name="images" content="images-wallpaper, width=device-width" />
        <meta
          name="description"
          content="Neoistone is a reliable, fast and robust platform for all the needs of Hosting and Domain name development tools is so easy to use that litespeed it makes fast site"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best Photos Gallery." />
        <meta
          property="og:description"
          content="This is best photo gallery website,This website cover almost all over photos and that is good to finding best photos."
        />
        <meta property="og:url" content="http://localhost/" />
        <meta
          property="og:site_name"
          content="Neoistone: Best Web Development and Hosting services"
        />
        <meta name="theme-color" content="#ee5b3e" />
      </Head>

      <div className="main-container">
        <div className="home-image relative">
          <Image
            src={image?.urls?.regular}
            alt={"Home Page Image"}
            width={image.width}
            height={2400}
            placeholder="blur"
            blurDataURL={image?.urls?.regular}
          ></Image>
          <div className="home-image-content absolute inset-1/3 text-white w-full">
            <h1>Unsplash</h1>
            <p>
              The internet source of freely-usable images.
              <br />
              Powered by creators everywhere.
            </p>
            <InputGroup className="mt-8">
              <InputGroup.Text id="basic-addon1" onClick={query}>
                <SearchIcon />
              </InputGroup.Text>
              <FormControl
                placeholder="Search free high-resolution photos"
                aria-label="Search"
                onChange={(e) => {
                  setSearchCat(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
        <ImageData />
      </div>
    </>
  );
};
export default Home;

export const getStaticProps = async () => {
  const client_ID = process.env.NEXT_PUBLIC_UNSPLASH_ID;
  const response = await axios.get(
    "https://api.unsplash.com/photos/cRi_VYej6lE",
    {
      headers: {
        Authorization: `Client-ID ${client_ID}`,
      },
    }
  );
  return {
    props: {
      image: response.data,
    },
  };
};
