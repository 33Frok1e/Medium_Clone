import { useEffect, useState } from "react"
import axios from "Axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in localStorage");
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blog:", error);
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blog
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}