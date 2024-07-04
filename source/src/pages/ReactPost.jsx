import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

function ReactPost() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        // console.log('response', response);
        setPost(response.data);
    }

    if(!post.length) {
        return <h1>...Loading</h1>
    }

    return (
        <div>
            <Header />
            <h1>React api</h1>
            {post?.map((post) => {
                return <p key={post.id}>{post.title}</p>
            })}
        </div>
    )
}

export default ReactPost;