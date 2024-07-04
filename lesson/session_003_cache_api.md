# Cache trong React Query 

### Cache trong react query là gì

Khi bạn sử dụng React Query, nó tự động lưu trữ dữ liệu đã được gọi từ máy chủ bằng một khóa duy nhất. Khóa này giúp React Query xác định và truy xuất dữ liệu đã lưu trữ cho các yêu cầu sau này. Nếu dữ liệu cho một khóa đã tồn tại trong cache và chưa hết hạn, React Query sẽ trả về dữ liệu đã lưu thay vì thực hiện yêu cầu mạng mới

Mặc định, React Query sẽ lưu trữ dữ liệu trong cache trong khoảng thời gian 5 phút. Sau thời gian này, dữ liệu sẽ được xem xét là hết hạn và có thể bị xóa khỏi cache

React Query đánh dấu dữ liệu là “cũ” sau thời gian staleTime (mặc định là 0 hoặc ngay lập tức). Khi dữ liệu bị đánh dấu là cũ, React Query sẽ thực hiện yêu cầu mạng mới để cập nhật dữ liệu

### Cài đặt React Router

```
npm install react-router-dom@6
```

### Tạo Header

Tạo file components/Header.jsx

```
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ display:"flex", gap:10}}>
            <Link to="/">Home</Link>
            <Link to="/react-query">React query</Link>
            <Link to="/react">React api</Link>
        </div>
    )
}

export default Header;
```

### Tạo trang Home

Tạo file pages/Home.jsx
```
import Header from "../components/Header";

const Home = () => {
    return (
        <div>
            <Header />
            <h1>Home Page</h1>
        </div>
    )
}

export default Home;
```

### Tạo trang Posts.jsx

Đây là trang sử dụng ReactQuery

Tạo file pages/Posts.jsx

```
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';

function Posts() {
  const fetchApi = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
  }

  // Queries
  const query = useQuery({ queryKey: ['posts'], queryFn: fetchApi, retry: 5, retryDelay: 1000 });

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

export default Posts;
```

### Tạo trang ReactPost

Đây là trang fetch API theo cách thông thường

Tạo file pages/ReactPost.jsx

```
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

function ReactPost() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        // console.log('response', response);
        setPost(response.data);
    }

    if(!post.length) {
        return <h1>...Loading</h1>
    }

    return (
        <div>
            <Header />
            <h1>React api</h1>
            {post?.map((post) => {
                return <p key={post.id}>{post.title}</p>
            })}
        </div>
    )
}

export default ReactPost;
```

### Sửa trang App.jsx

```
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Posts from './pages/Posts';
import ReactPost from './pages/ReactPost';
import './App.css'

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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

### Kiểm tra sự khác biệt giữa fetch api thông thường và qua react query

Chuột phải chọn Inspect 

Chọn Network 

Chọn Disable cache / Fast 3G (để thấy rõ sự khác biệt)

Khi ta click vào menu React api Loading sẽ bị gọi lại mỗi lần click lại trang

Khi ta click vào menu React query Loading sẽ bị gọi chỉ 1 lần đầu mỗi lần click lại trang

=> Khi sử dụng react query data chỉ lấy từ api lần đầu tiên, các lần tiếp theo data sẽ lấy từ cache ra

*Bài tiếp theo [Json-Server](session_004_jsonserver.md)*