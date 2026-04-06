import { useState } from "react";
import type { BlogType } from "../Store/BlogStore";
import { createBlog } from "../blogApi/blogApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../Style.css";
import Footer from "../components/Footer.tsx";

function CreateBlog(){
    const [form, setform] = useState<BlogType>({
        title : "",
        content : "",
        author : "",
        tags : [],
    });

    type value_type={
        title ?: string;
        content ?: string;
        author ?: string;
        tags ?: string;
    }

    const [error, seterror] = useState<value_type>({});

    const title_regex = /^[A-Za-z0-9 "]+$/;
    const author_regex = /^[A-Za-z ]+$/;
    const content_regex = /^[A-Za-z0-9 .,!?'"()-]+$/;
    const tag_regex = /^[A-Za-z0-9 ]+$/;

    const navigate = useNavigate();

    function validateForm(){
        const newError : value_type = {};
        if(!form.title) {
            newError.title = "Title is required";
        }else if(!title_regex.test(form.title)){
            newError.title = "Title can only contain letters, numbers, spaces and double quotes";
        }

        if(!form.author) {
            newError.author = "Author name is required";
        }else if(!author_regex.test(form.author)){
            newError.author = "Author name can only contain letters and spaces";
        }

        if(form.tags.length === 0){
            newError.tags = "At least one tag is required";
        }else if(!form.tags.every(tag => tag_regex.test(tag))){
            newError.tags = "Tags can only contain letters, numbers and spaces";
        }

        if(!form.content) {
            newError.content = "Content is required";
        }else if(!content_regex.test(form.content)){
            newError.content = "Content can only contain letters, numbers, spaces and basic punctuation";
        }

        seterror(newError);
        return Object.keys(newError).length === 0;
    }

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(validateForm()){
            try{
                await createBlog(form);
                console.log(form);
                console.log("Blog created successfully");
                toast.success("Blog created successfully");
                setform({
                    title : "",
                    content : "",
                    author : "",
                    tags : [],  
                })
                navigate("/");
            }catch (error) { 
                toast.error("Error creating blog");
                console.error("Error creating blog", error);
            }     
        }
    }

    function onCancel(){
        navigate("/");
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
                        <input
                            type="text"
                            value={form.title}
                            placeholder="Enter you blog title"
                            onChange={(e) => {
                                setform({ ...form, title: e.target.value });
                                seterror((prev) => ({ ...prev, title: undefined }));
                            }}
                        />
                        {error.title && <span className="error">{error.title}</span>}
                    </div>
                    <div className="input">
                        <label>Author Name</label>
                        <input
                            type="text"
                            value={form.author}
                            placeholder="Enter author's name"
                            onChange={(e) => {
                                setform({ ...form, author: e.target.value });
                                seterror((prev) => ({ ...prev, author: undefined }));
                            }}
                        />
                        {error.author && <span className="error">{error.author}</span>}
                    </div>
                    <div className="input">
                        <label>Tags</label>
                        <input
                            type="text"
                            value={form.tags.join(", ")}
                            placeholder="tag1, tag2, tag3,....."
                            onChange={(e) => {
                                setform({
                                    ...form,
                                    tags: e.target.value.split(", ").map((tag) => tag.trim()),
                                });
                                seterror((prev) => ({ ...prev, tags: undefined }));
                            }}
                        />
                        {error.tags && <span className="error">{error.tags}</span>}
                    </div>
                    <div className="input">
                        <label>Content</label>
                        <textarea
                            value={form.content}
                            placeholder="Enter your blog content here..."
                            onChange={(e) => {
                                setform({ ...form, content: e.target.value });
                                seterror((prev) => ({ ...prev, content: undefined }));
                            }}
                        />
                        {error.content && <span className="error">{error.content}</span>}
                    </div>
                    <div className="input buttons">
                        <div className="cancel" >
                            <button onClick={onCancel}>Cancel</button>
                        </div>
                        <div className="publish">
                            <button>Publish Blog</button>
                        </div>
                    </div>
                </form>
                
            </div>
        
            <Footer />
        </>
    )
}

export default CreateBlog;