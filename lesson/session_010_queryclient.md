# useQueryClient trong React Query

### useQueryClient là gì

useQueryClient là một hook giúp bạn tương tác với cache của các query. Nó trả về một instance của QueryClient hiện tại trong ứng dụng.

Đầu tiên, bạn cần import useQueryClient từ react-query:

```
import { useQueryClient } from 'react-query';
```

Sau đó, bạn có thể sử dụng useQueryClient() để lấy instance của QueryClient

```
const queryClient = useQueryClient();
```

Bạn có thể sử dụng các phương thức từ queryClient để tương tác với cache.

### Lấy dữ liệu từ cache

Để lấy dữ liệu từ cache, bạn có thể sử dụng phương thức getQueryData(queryKey)

```
const data = queryClient.getQueryData(queryKey);
```

queryKey là một mảng chứa khóa của query bạn muốn lấy dữ liệu (ví dụ: ['todos'])

### Sửa file Header.jsx

```
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Header = () => {
    // Gọi QueryClient
    const queryClient = useQueryClient();
    // Lấy data
    const data = queryClient.getQueriesData(['post']);
    // Lấy trạng thái fetching
    const isFetching = useIsFetching(['create-post'])
    console.log(data);
    console.log(isFetching);

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


<!-- *Bài tiếp theo [useQueryClient trong React Query](session_010_queryclient.md)* -->