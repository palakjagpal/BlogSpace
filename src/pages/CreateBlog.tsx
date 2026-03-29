import { useState } from "react";
import { BlogStore } from "../Store/BlogStore";
import { createBlog } from "../blogApi/blogApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../Style.css";

function CreateBlog(){
    const [form, setform] = useState<BlogStore>({
        title : "",
        content : "",
        author : "",
        tags : [],
    });

    const navigate = useNavigate();

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            await createBlog(form);
            toast.success("Blog created successfully");
            console.log(form);
            console.log("Blog created successfully");
            navigate("/");
        }catch (error) { 
            toast.error("Error creating blog");
            console.error("Error creating blog", error);
        }
    }

    
    
    return(
        <>
            <div className="create-main">
                <div className="intro">
                    <h1>Create a new Blog</h1>
                    <p>Share your thoughts and ideas with the community.....</p>
                </div>
                <form onSubmit={handleSubmit}>
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
                            <button>Cancel</button>
                        </div>
                        <div className="publish">
                            <button>Publish Blog</button>
                        </div>
                    </div>
                </form>
                
            </div>
        
        </>
    )
}

export default CreateBlog;