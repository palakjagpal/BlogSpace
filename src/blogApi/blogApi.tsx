import axios from "axios";

const api =  axios.create({
    baseURL : import.meta.env.VITE_API_URL,
})

export const getBlogs = async()=>{
    try{
        const response =await api.get("/readAll");
        console.log("RAW RESPONSE:", response);
        return response.data;
    }catch(err){
        console.error("Error fetching blogs", err);
    }
}

export const getBlogById = async(id : string) =>{
    try{
        const response = await api.get(`/read/${id}`);
        console.log("RAW RESPONSE:", response);
        return response.data;
    }catch(err){
        console.error("Error fetching blog", err);
    }
}

export const createBlog = async(data :any)=>{
    try{
        const response =await api.post("/createBlog",data);
        console.log("RAW RESPONSE:", response);
        return response.data;
    }catch(err){
        console.error("Error creating blog", err);
    }
}

export const updateBlog = async(id : string, data : any)=>{
    try{
        const response = await api.put(`/updateBlog/${id}`,data);
        console.log("RAW RESPONSE:", response);
        return response.data;
    }catch(err){
        console.error("Error updating blog", err);
    }
}

export const deleteBlog = async(id : string)=>{
    try{
        const response =await api.delete(`/deleteBlog/${id}`);
        console.log("RAW RESPONSE:", response);
        return response.data;
    }catch(err){
        console.error("Error deleting blog", err);
    }
}

export default api;