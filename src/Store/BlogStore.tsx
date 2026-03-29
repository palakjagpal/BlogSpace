import {create} from 'zustand';

export type BlogType = {
    _id ?: string;
    title : string;
    content : string;
    author : string;
    tags : string[];
    createdAt ?: string;
}

type BlogState = {
    blogs : BlogType[];
    setBlogs : (Blogs : BlogType[]) => void;
}

export const BlogStore = create<BlogState>((set) => (
    {
        blogs : [],
        setBlogs : (blogs) => set({blogs}),
    }
));