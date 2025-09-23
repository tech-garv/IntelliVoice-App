import axios from "axios";

export const getToken = async () => {
  const result = await axios.post("/api/getToken"); // ✅ POST method is required
  return result.data;
};
//ai add in the project
export const AIModel=()=>{
  
}