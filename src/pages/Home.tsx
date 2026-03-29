import { useEffect, useState } from "react";
import Search from "../components/Search";
import { BlogStore } from "../Store/BlogStore";
import { getBlogs } from "../blogApi/blogApi";
import toast from "react-hot-toast";
import Blogcard from "../components/Blogcard";
import "../Style.css";


function Home(){
    const [blogs, setblogs] = useState<BlogStore[]>([]);
    const [search,setsearch] = useState<string>("");

    useEffect(() =>{
        fetchBlogs();
    }, [])

    async function fetchBlogs(){
        try{
            const response = await getBlogs();
            console.log("API RESPONSE:", response);
            setblogs(response || []);
            console.log("Blogs : ",response);
        } catch (error) {
            toast.error("Error fetching blogs");
            setblogs([]);
            console.error("Error fetching blogs", error);
        }
    }

    function filter(blogs: BlogStore[] = [], search: string) {
    const lowerSearch = search.toLowerCase();
    return blogs.filter(blog => 
        blog.title.toLowerCase().includes(lowerSearch) ||
        blog.content?.toLowerCase().includes(lowerSearch) ||
        blog.author?.toLowerCase().includes(lowerSearch) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(lowerSearch)))
    );
    }


    return(
        <>

            <div className="home-intro">
                <h1 className="title-home">
                    Discover Amazing{" "}
                    <span className="highlight">
                    Stories
                    </span>
                </h1>
                <p className="subtitle-home">
                    Explore a collection of insightful articles, tutorials, and stories
                    from our community of writers.
                </p>
            </div>

            <div className="allBlogs">
                <Search setsearch={setsearch}/>
            <div>
                {(blogs || []).length > 0 &&
                    filter(blogs, search).map((blog: BlogStore) => (
                        <Blogcard key={blog._id} blog={blog} />
                    ))
                }
            </div>
            </div>
        </>
    )
}

export default Home;