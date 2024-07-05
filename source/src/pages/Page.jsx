import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Header from '../components/Header';
import { useState } from 'react';

function Page() {
  const [page, setPage] = useState(1);
  const fetchApi = async (context) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.queryKey[1]}`)
    return response.data
  }

  // Queries
  const query = useQuery({ queryKey: ['posts', page], queryFn: fetchApi, placeholderData: keepPreviousData});

  const { isError, isLoading, data, isPlaceholderData  } = query;

  console.log('data', data);

  if (isLoading) {
    return <h1>...Loading</h1>
  }

  if (isError) {
    return <h1>...Error</h1>
  }

  return (
    <div>
      <Header />
      <h1>Page</h1>
      <div>{data?.title}</div>
      <p>Current page: {page}</p>
      <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1 || isPlaceholderData}>
        Previos
      </button>
      <button onClick={() => setPage(prev => prev + 1)} disabled={page === 100}>
        Next
      </button>
    </div>
  )
}

export default Page;
