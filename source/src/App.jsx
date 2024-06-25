import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [post, setPost] = useState([]);

  useEffect(()=> {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('response', response);
    setPost(response.data);
  }

  return (
    <div className='App'>
      {post?.map((post) => {
        return <p key={post.id}>{post.title}</p>
      })}
    </div>
  )
}

export default App;
