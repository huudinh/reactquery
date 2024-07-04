## React Query

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

*Bài tiếp theo [Fetch dữ liệu với React Query](session_002_fetch_api_reactquery.md)