import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

function JsonPosts() {
  // Lưu trữ trang thái Create, Delete, postId
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [postId, setPostId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [post, setPost] = useState();

  // Đọc API
  const fetchApi = async () => {
    const response = await axios.get('http://localhost:3100/posts')
    return response.data
  }

  // Thêm mới post
  const fetchCreateApi = async () => {
    const response = await axios.post(`http://localhost:3100/posts`, {
      "title": "json-server",
      "author": "typicode"
    });
    return response.data;
  }

  // Xóa post
  const fetchDeleteApi = async () => {
    const response = await axios.delete(`http://localhost:3100/posts/${postId}`);
    return response.data;
  }

  // Update post
  const fetchUpdateApi = async () => {
    const response = await axios.put(`http://localhost:3100/posts/${post.id}`, post);
    return response.data;
  }

  // Queries
  const query = useQuery({ queryKey: ['posts'], queryFn: fetchApi});
  const queryCreate = useQuery({ queryKey:['create-post'], queryFn: fetchCreateApi, enabled: isCreate });
  const queryDelete = useQuery({ queryKey:['delete-post'], queryFn: fetchDeleteApi, enabled: isDelete });
  const queryUpdate = useQuery({ queryKey:['update-post'], queryFn: fetchUpdateApi, enabled: isUpdate });

  // Sự kiện Create
  const handleCreatePost = () => {
    setIsCreate(true);
  }

  // Sự kiện Xóa
  const handleDeletePost = (id) => {
    setIsDelete(true);
    setPostId(id);
  }

  // Sự kiện Update
  const handleUpdatePost = (id) => {
    const title = prompt('Nhập tiêu đề cần update');
    const author = prompt('Nhập tác giả cần update');
    if(title){
      setIsUpdate(true);
      setPost({
        id: id,
        title: title,
        author: author,
      })
    }
  }

  // Update trạng thái isCreate là false sau khi chay handleCreatePost
  useEffect(() => {
    if(isCreate){
      setTimeout(() => {
        setIsCreate(false);
        query.refetch();
      }, 1000);
    }

    if(isDelete){
      setTimeout(() => {
        setIsDelete(false);
        query.refetch();
      }, 1000);
    }

    if(isUpdate){
      setTimeout(() => {
        setIsUpdate(false);
        query.refetch();
      }, 1000);
    }
  }, [isCreate, isDelete, isUpdate]);

  if (query.isLoading) {
    return <h1>...Loading</h1>
  }

  if (query.isError) {
    return <h1>...Error</h1>
  }

  return (
    <div>
      <Header />
      <h1>React query</h1>
      {query.data?.map((post) => {
        return <p key={post.id}>
          {post.title}-{post.id} 
          &nbsp;
          <span 
            style={{ cursor: 'pointer', color:'blue' }}
            onClick={() => handleUpdatePost(post.id)}
          >
            [Edit]
          </span>
          &nbsp;
          <span 
            style={{ cursor: 'pointer', color:'red' }} 
            onClick={() => handleDeletePost(post.id)}
          >
            [Delete]
          </span>
        </p>
      })}
      <button onClick={handleCreatePost} disabled={!!isCreate}>Create post</button>
    </div>
  )
}

export default JsonPosts;
