# reactquery
### Khởi tạo dự án
Vào thư mục dự án gõ lệnh
```
npm create vite@latest
```
Làm theo hướng dẫn trong cmd để tạo thư mục source

Vào thư mục source theo hướng dẫn gõ lênh

```
npm install
```

Để chạy dự án gõ lênh

```
npm run dev
```

### Cài đặt React Query

Link hướng dẫn cài đặt 
https://tanstack.com/query/latest/docs/framework/react/installation

Download React Query và Axios bằng lệnh

```
npm i @tanstack/react-query axios
```

Lấy nguồn API 
https://jsonplaceholder.typicode.com/posts

### Fetch dữ liệu với Axios thông thường

Sửa file App.jsx

```
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
```

### Fetch dữ liệu với React Query

Sửa file App.jsx

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

Tạo file Posts.jsx

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

retry: 5 là số lần gọi API nếu không thành công

retryDelay: là thời gian mỗi lần gọi