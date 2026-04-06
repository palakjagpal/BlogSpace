import { useEffect, useState } from "react";
import Search from "../components/Search";
import type { BlogType } from "../Store/BlogStore";
import { getBlogs } from "../blogApi/blogApi";
import toast from "react-hot-toast";
import Blogcard from "../components/Blogcard";
import "../Style.css";
import Footer from "../components/Footer.tsx";


function Home(){
    const [blogs, setblogs] = useState<BlogType[]>([]);
    const [search,setsearch] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);
    const [page, setpage] = useState<number>(1);
    const perPage = 6;

    useEffect(() =>{
        fetchBlogs();
    }, [])

    useEffect(()=>{
        setpage(1);  
    },[search])

    async function fetchBlogs(){
        setloading(true);
        console.log("Fetching blogs...");
        try{
            const response = await getBlogs();
            console.log("API RESPONSE:", response);
            setblogs(response || []);
            console.log("Blogs : ",response);
            setloading(false);
        } catch (error) {
            toast.error("Error fetching blogs");
            setblogs([]);
            console.error("Error fetching blogs", error);
        }finally{
            setloading(false);
        }
    }

    function filter(blogs: BlogType[] = [], search: string) {
    const lowerSearch = search.toLowerCase();
    return blogs.filter(blog => 
        blog.title.toLowerCase().includes(lowerSearch) ||
        blog.content?.toLowerCase().includes(lowerSearch) ||
        blog.author?.toLowerCase().includes(lowerSearch) ||
        (blog.tags && blog.tags.some((tag: string) => tag.toLowerCase().includes(lowerSearch))))
    }


    const filteredBlogs = filter(blogs, search);

    const sortedBlogs = [...filteredBlogs].sort((a,b)=>
        new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
    );
    
    const indexofLastBlog = page * perPage;
    const indexofFirstBlog = indexofLastBlog - perPage;
    const currentBlogs = sortedBlogs.slice(indexofFirstBlog, indexofLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length/perPage);

    const Prev = () =>{
        setpage((prev) => prev-1);
    }

    const Next = () => {
        setpage((prev) => prev+1);
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

            
                <Search setsearch={setsearch}/>
                {
                    loading ? (
                        <div className="loading">
                            <p>Loading Blogs.....</p>
                        </div>
                    ) :
                    (
                        <div className="allBlogs">
                            <div>
                                {currentBlogs.length > 0 ? (
                                    currentBlogs.map((blog: BlogType) => (
                                        <Blogcard key={blog._id} blog={blog} />
                                    ))
                                ) : (
                                    <div className="no-blogs">
                                        <p>No blogs found. Try adjusting your search or create a new blog!</p>
                                    </div>
                                )
                                }
                            </div>
                            {
                                filteredBlogs.length>0 && (
                                    <div className="pagination">
                                        <button onClick={Prev} disabled={page === 1}>
                                            Prev
                                        </button>
                                        <span>{page} of {totalPages}</span>
                                        <button onClick={Next} disabled={page === totalPages}>
                                            Next
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) 
                }
                <Footer />
        </>
    )
}

export default Home;

