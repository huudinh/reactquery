import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import { useState } from 'react';

function Dependent() {
  const [userId, setUserId] = useState();
  const fetchApi = async (context) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.queryKey[1]}`)
    return response.data
  }

  // Queries
  const query = useQuery({ queryKey: ['posts', userId], queryFn: fetchApi, retry: 5, retryDelay: 1000, enabled: !!userId });

  const { isError, data } = query;

  console.log('data', data);

  if (isError) {
    return <h1>...Error</h1>
  }

  return (
    <div>
      <Header />
      <h1>Dependent</h1>
      <input value={userId} placeholder='user id' onChange={(e) => setUserId(e.target.value)} />
      <div>{data?.title}</div>
    </div>
  )
}

export default Dependent;
