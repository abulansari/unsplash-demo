import axios from "axios";
import { FETCH_IMAGES, FETCH_SINGLE_IMAGE } from "../actionTypes";

export const fetchImages = (pageNo) => async (dispatch) => {
  const unsplash_id = process.env.NEXT_PUBLIC_UNSPLASH_ID;
  // console.log("unsplash_id", unsplash_id);
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos?client_id=${unsplash_id}&page=${pageNo}`
    );
    // console.log(response);
    dispatch({ type: FETCH_IMAGES, payload: response.data });
  } catch (error) {
    console.log("error from Fetch Images",error);
  }
};

export const fetchSingleImage = () => async () =>{
  const unsplash_id = process.env.NEXT_PUBLIC_UNSPLASH_ID;
  
  try{
    const response = await axios.get(`https://api.unsplash.com/photos?client_id=${unsplash_id}`);
    dispatch({type:FETCH_SINGLE_IMAGE,payload:response.data})
  }
  catch(error){
    console.log("error from Fetch Single Image",error);
  }

}
