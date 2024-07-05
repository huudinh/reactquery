# Paginated với KeepPreviousData

### KeepPreviousData 

Là một tùy chọn của hook useQuery trong React Query cho phép bạn giữ lại dữ liệu cũ của truy vấn khi dữ liệu mới được tải.

### Lợi ích sử dụng

Tránh mất dữ liệu: KeepPreviousData đảm bảo rằng dữ liệu cũ của truy vấn sẽ không bị mất khi dữ liệu mới được tải. Điều này có thể hữu ích trong các trường hợp bạn muốn hiển thị dữ liệu cũ trong khi dữ liệu mới đang được tải

Cải thiện trải nghiệm người dùng: KeepPreviousData có thể giúp cải thiện trải nghiệm người dùng bằng cách ngăn chặn giao diện người dùng bị trống hoặc cập nhật đột ngột khi dữ liệu mới được tải

Tăng hiệu suất: KeepPreviousData có thể giúp tăng hiệu suất bằng cách tránh việc tải lại dữ liệu cũ không cần thiết

### Thêm trang Page.jsx

Tạo trang src/pages/Page.jsx

```
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
```

### Sửa file Header.jsx

Sửa file components/Header.jsx

```
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ display:"flex", gap:10}}>
            <Link to="/">Home</Link>
            <Link to="/page">Page</Link>
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
import Page from './pages/Page';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<Page />} />
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

Click vào menu Page, khi bạn click vào nút Next hoặc Previos thì trang sẽ không bị loading lại bởi chúng ta đã thêm tham số `placeholderData: keepPreviousData`


*Bài tiếp theo [useInfiniteQuery trong react query](session_007_loadmore.md)*