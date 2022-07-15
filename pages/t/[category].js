import axios from "axios";

const Category = ({ search }) => {
  console.log("category------", search);
  return (
    <>
      <h1>fsfd</h1>
    </>
  );
};

export default Category;

export const getServerSideProps = async (context) => {
    const { params } = context;
    const { category } = params;
    const unsplash_id = process.env.NEXT_PUBLIC_UNSPLASH_ID;
  
    const response = await axios.get(
      `https://api.unsplash.com/search?per_page=${per_page}&query=${category}`,
      {
        headers: {
          Authorization: `Client-ID ${unsplash_id}`,
        },
      }
    );
    console.log("------",response);
    return {
      props: { search: response.data },
    };
  };