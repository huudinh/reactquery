# Loadmore trong react query

### useInfiniteQuery là gì?

Là một hook trong React Query cho phép bạn truy vấn và phân trang dữ liệu một cách hiệu quả. Nó hoạt động tương tự như hook useQuery nhưng được tối ưu hóa cho việc tải dữ liệu theo từng trang, giúp bạn cải thiện hiệu suất và trải nghiệm người dùng cho các danh sách dữ liệu lớn.

### Lợi ích sử dụng useInfiniteQuery

Tải dữ liệu hiệu quả: useInfiniteQuery chỉ tải một lượng nhỏ dữ liệu mỗi lần, giúp giảm tải cho máy chủ và cải thiện hiệu suất tải trang.

Phân trang dễ dàng: useInfiniteQuery cung cấp các API tích hợp sẵn để quản lý phân trang, giúp bạn dễ dàng hiển thị các trang dữ liệu tiếp theo cho người dùng.

Trải nghiệm người dùng mượt mà: useInfiniteQuery cho phép bạn hiển thị dữ liệu ban đầu ngay lập tức và tải thêm dữ liệu khi người dùng cuộn xuống, mang lại trải nghiệm người dùng mượt mà và đáp ứng.

### Thêm trang Loadmore.jsx

Tạo trang src/pages/Loadmore.jsx

```
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
```

### Sửa file Header.jsx

Sửa file components/Header.jsx

```
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ display:"flex", gap:10}}>
            <Link to="/">Home</Link>
            <Link to="/loadmore">Load More</Link>
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
import LoadMore from './pages/LoadMore';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loadmore" element={<LoadMore />} />
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

Click vào menu Loadmore, khi bạn click vào nút Loadmore thì trang sẽ hiển thị các trang tiếp theo


*Bài tiếp theo [CRUD API trong React Query](session_008_crud.md)*