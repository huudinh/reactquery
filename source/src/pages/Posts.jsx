import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';

function Posts() {
  // Đọc API
  const fetchApi = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
  }

  // Queries
  const query = useQuery({ queryKey: ['posts'], queryFn: fetchApi, retry: 5, retryDelay: 1000 });

  const { isError, isLoading, data, isFetching } = query;

  console.log('check', { isLoading, isFetching });

  if (isLoading) {
    return <h1>...Loading</h1>
  }

  if (isError) {
    return <h1>...Error</h1>
  }

  return (
    <div>
      <Header />
      <h1>React query</h1>
      {data?.map((post) => {
        return <p key={post.id}>{post.title}</p>
      })}
    </div>
  )
}

export default Posts;
