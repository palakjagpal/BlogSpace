import { BlogStore } from '../Store/BlogStore.tsx';
import {Link} from 'react-router-dom';
import formatDate from '../util/DateConvert.tsx';
import Tags from './Tags.tsx';
import "../Style.css";

function Blogcard({blog}: {blog : BlogStore}){
    return(
        <>
            <div className="blog-main">
                <div className='blog-card'>
                    <div className='blogtags'>
                        {
                            blog.tags.map((tag: string, index: number) =>(
                                <Tags key={index} tag={tag}/>
                            ))
                        }
                    </div>
                    <h2>{blog.title}</h2>
                    <p className='content'>{blog.content}</p>
                    <div className='blogfootermain'>
                        <div className='blogfooter'>
                            <p>{blog.author}</p>
                            <p>{formatDate(new Date(blog.createdAt || ""))}</p>
                        </div>
                        
                        <div className='blogread'>
                            <button><Link to={`/blog/${blog._id}`}>Read More</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogcard;