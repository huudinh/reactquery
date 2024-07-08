import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import { useState } from 'react';

function LoadMore() {
  const [page, setPage] = useState(1);
  const fetchApi = async ({pageParam = 1}) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${pageParam}`)
    return response.data
  }

  // Queries
  const query = useInfiniteQuery({ queryKey: ['posts', page], queryFn: fetchApi, getNextPageParam:(lastPage, pages) =>{
    console.log('pages',pages)
    if(pages.length < 100){
      return pages.length + 1;
    }
    return undefined;
  }});

  const { isError, isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage  } = query;

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
      <h1>Loadmore</h1>
      {data.pages.map((page)=> {
        return <p key={page.id}>{page.id} - {page.title}</p>
      })}
      <button 
        onClick={()=> fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        {
          isFetchingNextPage ? 'Loading more...' :
          !hasNextPage ? 'No data' : 
          'Loadmore'
        }
        
      </button>
    </div>
  )
}

export default LoadMore;
