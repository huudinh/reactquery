# Fetch dữ liệu với React Query

### Sửa file App.jsx

```
import './App.css'
import Posts from './Posts';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <Posts />
      </QueryClientProvider>
    </div>
  )
}

export default App;
```

### Thêm mới file Post.jsx

```
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
```

Ở phần này ta sẽ sửa để API bị lỗi https://jsonplaceholder.typicode.com/postss

retry: Giới hạn số lần load API nếu bị lỗi

retryDelay: Giới hạn thời gian mỗi lần load lại API

*Bài tiếp theo [Cache trong React Query](session_003_cache_api.md)*
