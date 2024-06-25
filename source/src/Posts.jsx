import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Posts() {
  const fetchApi = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/postss')
    return response.data
  }

  // Queries
  const query = useQuery({ queryKey: ['posts'], queryFn: fetchApi, retry: 5, retryDelay: 1000 });
  
  console.log(query);

  const { isError, isLoading, data } = query;

  if(isLoading){
    return <p>...Loading</p>
  }

  if(isError){
    return <p>...Error</p>
  }

  return (
    <div>
      {data?.map((post) => {
        return <p key={post.id}>{post.title}</p>
      })}
    </div>
  )
}

export default Posts;
