import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getBlogById, deleteBlog} from "../blogApi/blogApi";
import toast from "react-hot-toast";
import Tags from '../components/Tags';
import Confirm from "../components/Confirm.tsx";
import type { BlogType } from "../Store/BlogStore";
import "../Style.css";
import Footer from "../components/Footer.tsx";


function BlogDetail(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [blog, setblog] = useState<BlogType | null>(null);
    const [open, setopen] = useState<boolean>(false);

    useEffect(()=>{
        readBlog();
    }, [id])

    const readBlog = async()=>{
        if(!id){
            toast.error("Blog is missing");
            console.error("Blog is missing");
            return;
        }
        try{
            const response = await getBlogById(id);
            if(response){
                setblog(response);
            }
            console.log("API RESPONSE:", response);
            console.log("Blog : ",response);
        }
        catch(error){
            console.error("Error fetching blog:", error);
            toast.error("Error fetching blog");
        }
    }

    const Del_Blog = async()=>{
        if(!id){
            toast.error("Blog is missing");
            console.error("Blog is missing");
            return;
        }
        try{
            await deleteBlog(id);
            toast.success("Blog deleted successfully");
            console.log("Blog deleted successfully");
            navigate("/");
        }
        catch(error){
            console.error("Error deleting blog:", error);
            toast.error("Error deleting blog");
        }
    }

    function handleEdit() {
        if (blog) {
            navigate(`/updateBlog/${blog._id}`);
        }
    }

    function handleDelete() {
        setopen(true);
    }

    return(
        <>
            {
                !blog ? (
                    <p className="loading">Loading Blog....</p>
                ) :
                (
                    <div className="blogs">
                        <div>
                            <button onClick={() => navigate("/")}>Back to all blogs</button>
                        </div>
                        <div className="blog-detail">

                            <div className="blogtags">
                                {blog.tags.map((tag: string, i: number) =>(
                                    <Tags key={i} tag={tag}/>
                                ))}
                            </div>

                            <h1>{blog.title}</h1>

                            <div className="author-read-more">
                                <div className="author">
                                    <p>{blog.author}</p>
                                </div>
                                <div className="blog-actions">
                                    <button onClick={handleEdit}>Edit</button>
                                    <button onClick={handleDelete}>Delete</button>
                                </div>
                            </div>

                            <p className="content">{blog.content}</p>
                            <Confirm open={open} onCancel={()=> {setopen(false)}}  onConfirm={Del_Blog} />
                        </div>
                    </div>
                )
            }

            <Footer />
                
        </>
    )
}

export default BlogDetail;