# Dependent Queries trong React Query 

### Dependent Queries (Truy vấn Phụ thuộc)

Là một tính năng mạnh mẽ của React Query giúp bạn quản lý việc truy vấn dữ liệu phụ thuộc lẫn nhau trong ứng dụng React của mình. Nó cho phép bạn xác định các truy vấn nào phụ thuộc vào kết quả của các truy vấn khác và tự động kích hoạt lại các truy vấn phụ thuộc khi dữ liệu cơ bản thay đổi.

### Lợi ích sử dụng Dependent Queries

Giảm thiểu truy vấn không cần thiết: Dependent Queries chỉ thực hiện các truy vấn khi dữ liệu cần thiết thực sự thay đổi, giúp cải thiện hiệu suất và giảm tải cho máy chủ

Giữ cho dữ liệu luôn nhất quán: Dependent Queries đảm bảo rằng dữ liệu được hiển thị trong ứng dụng của bạn luôn nhất quán với dữ liệu mới nhất từ ​​máy chủ

Cải thiện trải nghiệm người dùng: Dependent Queries giúp bạn tạo ra các ứng dụng React nhạy bén và phản hồi nhanh chóng, mang lại trải nghiệm người dùng tốt hơn

### Thêm trang Dependent

Tạo trang src/pages/Dependent.jsx

```
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
```

### Sửa file Header.jsx

Sửa file components/Header.jsx

```
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ display:"flex", gap:10}}>
            <Link to="/">Home</Link>
            <Link to="/dependent">Dependent</Link>
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
import Dependent from './pages/Dependent';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dependent" element={<Dependent />} />
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

### Chạy ứng dụng

Click vào menu Dependent, khi bạn truyền vào các trang tương ứng trong ô input thì các dữ liệu tương ứng sẽ được load ra


*Bài tiếp theo [Paginated với KeepPreviousData](session_005_paginated.md)*