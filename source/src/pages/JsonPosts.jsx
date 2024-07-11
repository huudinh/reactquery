import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '../components/Header';

function JsonPosts() {

  // Đọc API
  const fetchApi = async () => {
    const response = await axios.get('http://localhost:3100/posts')
    return response.data
  }

  // Thêm mới post
  const fetchCreateApi = async (newPost) => {
    const response = await axios.post(`http://localhost:3100/posts`, newPost);
    return response.data;
  }

  // Xóa post
  const fetchDeleteApi = async (postId) => {
    const response = await axios.delete(`http://localhost:3100/posts/${postId}`);
    return response.data;
  }

  // Update post
  const fetchUpdateApi = async (post) => {
    const response = await axios.put(`http://localhost:3100/posts/${post.id}`, post);
    return response.data;
  }

  // Queries
  const query = useQuery({ queryKey: ['posts'], queryFn: fetchApi});
  
  // Muation Create
  const muationCreate = useMutation({ 
    mutationKey:['create-post'], 
    mutationFn:(newPost) => fetchCreateApi(newPost), 
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('sucess');
    },
    onSettled: () => {
      console.log('settled');
      query.refetch();
    }
  });

  // Muation Delete
  const muationDelete = useMutation({ 
    mutationKey:['delete-post'], 
    mutationFn:(postId) => fetchDeleteApi(postId), 
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('sucess');
    },
    onSettled: () => {
      console.log('settled');
      query.refetch();
    }
  });

  // Muation Delete
  const muationUpdate = useMutation({ 
    mutationKey:['update-post'], 
    mutationFn:(post) => fetchUpdateApi(post), 
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('sucess');
    },
    onSettled: () => {
      console.log('settled');
      query.refetch();
    }
  });

  // Sự kiện Create
  const handleCreatePost = () => {
    muationCreate.mutate({
      "title": "json-server",
      "author": "typicode"
    });
  }

  // Sự kiện Xóa
  const handleDeletePost = (postId) => {
    muationDelete.mutate(postId);
  }

  // Sự kiện Update
  const handleUpdatePost = (id) => {
    const title = prompt('Nhập tiêu đề cần update');
    const author = prompt('Nhập tác giả cần update');
    if(title){
      muationUpdate.mutate({
        id: id,
        title: title,
        author: author,
      });
    }
  }

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
      <button onClick={handleCreatePost}>Create post</button>
    </div>
  )
}

export default JsonPosts;