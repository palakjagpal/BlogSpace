import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getBlogById, updateBlog} from "../blogApi/blogApi";
import toast from "react-hot-toast";
import "../Style.css";
import type { BlogType } from "../Store/BlogStore";


function EditBlog(){
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        if(id){
            fetchBlogs();
        }
    }, [id])

    const [form,setform] = useState<BlogType>({
        title: "",
        content: "",
        tags: [],
        author : ""
    }) 

    async function fetchBlogs(){
        if(!id) return
        try{
            const response = await getBlogById(id);
            console.log("API RESPONSE:", response);
            console.log("Blogs : ",response);
            if(!response) return;
            setform({
                title: response.title,
                content: response.content,
                tags: response.tags,
                author : response.author
            })
        } catch (error) {
            toast.error("Error fetching blogs");
            console.error("Error fetching blogs", error);
        }
    }

    async function UpdateBlog(e: any){
        e.preventDefault();
        if(!id){
            console.error("Blog is missing");
            toast.error("Blog is missing");
            return;
        }
        try{
            await updateBlog(id, form);
            toast.success("Blog updated successfully");
            console.log("Blog updated successfully");
            navigate(`/blog/${id}`); 
        }catch(err){
            console.error("Error updating blog", err);
            toast.error("Error updating blog");
        }
    }

    return(
        <>
            <div className="create-main">
                <div className="intro">
                    <h1>Edit Blog</h1>
                    <p>Update your blog post content and details</p>
                </div>
                <form onSubmit={UpdateBlog}>
                    <div className="input">
                        <label>Title</label>
                        <input type="text" value={form.title} onChange={(e) => setform({...form, title : e.target.value})}/>
                    </div>
                    <div className="input">
                        <label>Author Name</label>
                        <input type="text" value={form.author} onChange={(e) => setform({...form, author : e.target.value})}/>
                    </div>
                    <div className="input">
                        <label>Tags</label>
                        <input type="text" value={form.tags.join(", ")} onChange={(e) => setform({...form, tags : e.target.value.split(", ").map((tag) => tag.trim())})}/>
                    </div>
                    <div className="input">
                        <label>Content</label>
                        <textarea value={form.content} onChange={(e) => setform({...form, content : e.target.value})}/>
                    </div>
                    <div className="input buttons">
                        <div className="cancel">
                            <button onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                        <div className="update">
                            <button>Update Blog</button>
                        </div>
                    </div>
                </form>
                
            </div>
        </>
    )
}

export default EditBlog;