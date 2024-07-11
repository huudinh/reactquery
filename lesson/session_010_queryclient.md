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




<!-- *Bài tiếp theo [useQueryClient trong React Query](session_010_queryclient.md)* -->