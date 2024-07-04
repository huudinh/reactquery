# React Query tự động tải lại dữ liệu

Khi dữ liệu thay đổi trên máy chủ, React Query sẽ tự động tải dữ liệu mới và cập nhật giao diện người dùng mà không cần thêm công việc từ phía bạn.

React Query cho phép bạn tự động tìm nạp dữ liệu khi cần thiết, giúp giảm thiểu sự phức tạp khi phải quản lý việc tìm nạp bằng tay

### Cài đặt json server

Link thư viện: https://www.npmjs.com/package/json-server/v/0.17.4

Để cài đặt json-server, bạn có thể sử dụng lệnh sau

```
npm install -g json-server
```

Để chạy json-server bạn gõ lệnh

```
npx json-server --watch db.json --port 3100
```

Sau khi gõ code ta sẽ có link api là http://localhost:3100/posts

Trong đó bạn cần tạo file db.json bên ngoài thư mục src

```
{
"posts": [
    {
        "id": 1,
        "title": "json-server",
        "author": "typicode"
    },
    {
        "id": 2,
        "title": "json-server",
        "author": "typicode"
    },
    {
        "id": 3,
        "title": "json-server",
        "author": "typicode"
    }
]
}
```

### Thêm trang Json-server

Nhân bản component Posts chỉ thay đường dẫn api http://localhost:3100/posts

Tạo file JsonPosts.jsx

```
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';

function JsonPosts() {
  const fetchApi = async () => {
    const response = await axios.get('http://localhost:3100/posts')
    return response.data
  }

  // Queries
  const query = useQuery({ queryKey: ['posts'], queryFn: fetchApi, retry: 5, retryDelay: 1000, cacheTime: 10000 });

  const { isError, isLoading, data, isFetching } = query;
  
  console.log('check', {isLoading, isFetching});

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

export default JsonPosts;
```

### Sửa file Header.jsx

Sửa file components/Header.jsx

```
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ display:"flex", gap:10}}>
            <Link to="/">Home</Link>
            <Link to="/json-server">Json-server</Link>
            <Link to="/react-query">React query</Link>
            <Link to="/react">React api</Link>
        </div>
    )
}

export default Header;
```

### Sửa file App.jsx

```
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Posts from './pages/Posts';
import ReactPost from './pages/ReactPost';
import './App.css'
import JsonPosts from './pages/JsonPosts';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-server" element={<JsonPosts />} />
          <Route path="/react-query" element={<Posts />} />
          <Route path="/react" element={<ReactPost />} />
        </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App;
```

=> Chạy ứng dụng, bây giờ ta thay đổi data trong file db.json, thì data trong trang json-server sẽ tự động được cập nhật


* Bài tiếp theo [Json-Server](session_004_jsonserver.md)