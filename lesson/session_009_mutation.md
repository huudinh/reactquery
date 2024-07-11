# useMutation trong React query

### useMutation trong useQuery là gì

Trong React Query, useMutation và useQuery là hai hook quan trọng để quản lý dữ liệu trong ứng dụng React. Tuy nhiên, chúng phục vụ cho các mục đích khác nhau

### useQuery

Được sử dụng để lấy dữ liệu từ một nguồn dữ liệu (API, database, v.v.).

Trả về một object chứa dữ liệu được truy vấn, trạng thái truy vấn (đang tải, lỗi, v.v.) và các hàm để refetch dữ liệu.

Lưu trữ dữ liệu được truy vấn trong cache của React Query, giúp cải thiện hiệu suất và tránh truy vấn dữ liệu trùng lặp.

### useMutation

Được sử dụng để gửi yêu cầu thay đổi dữ liệu (thêm, sửa, xóa) đến một nguồn dữ liệu.

Trả về một object chứa hàm mutate để thực hiện việc thay đổi dữ liệu, trạng thái mutation (đang thực hiện, lỗi, v.v.) và các hàm để invalidate dữ liệu cache.

Không lưu trữ dữ liệu trong cache, vì dữ liệu có thể đã thay đổi sau khi mutation được thực hiện.

### Sử dụng useMutation trong useQuery

Có một trường hợp đặc biệt khi bạn có thể sử dụng useMutation trong useQuery. Đó là khi bạn muốn tự động cập nhật dữ liệu trong cache sau khi thực hiện mutation.

Bạn có thể sử dụng tùy chọn useMutation trong useQuery để truyền hàm mutate từ useMutation vào useQuery. Khi hàm mutate được gọi, useQuery sẽ tự động invalidate dữ liệu cache và tải lại dữ liệu mới.

### Áp dụng useMutation sửa page JsonPosts

Sửa file src/pages/JsonPosts.jsx

```
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '../components/Header';

function JsonPosts() {

  // Đọc API
  const fetchApi = async () => {
    const response = await axios.get('http://localhost:3100/posts')
    return response.data
  }

  // Thêm mới post
  const fetchCreateApi = async (newPost) => {
    const response = await axios.post(`http://localhost:3100/posts`, newPost);
    return response.data;
  }

  // Xóa post
  const fetchDeleteApi = async (postId) => {
    const response = await axios.delete(`http://localhost:3100/posts/${postId}`);
    return response.data;
  }

  // Update post
  const fetchUpdateApi = async (post) => {
    const response = await axios.put(`http://localhost:3100/posts/${post.id}`, post);
    return response.data;
  }

  // Queries
  const query = useQuery({ queryKey: ['posts'], queryFn: fetchApi});
  
  // Muation Create
  const muationCreate = useMutation({ 
    mutationKey:['create-post'], 
    mutationFn:(newPost) => fetchCreateApi(newPost), 
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('sucess');
    },
    onSettled: () => {
      console.log('settled');
      query.refetch();
    }
  });

  // Muation Delete
  const muationDelete = useMutation({ 
    mutationKey:['delete-post'], 
    mutationFn:(postId) => fetchDeleteApi(postId), 
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('sucess');
    },
    onSettled: () => {
      console.log('settled');
      query.refetch();
    }
  });

  // Muation Delete
  const muationUpdate = useMutation({ 
    mutationKey:['update-post'], 
    mutationFn:(post) => fetchUpdateApi(post), 
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('sucess');
    },
    onSettled: () => {
      console.log('settled');
      query.refetch();
    }
  });

  // Sự kiện Create
  const handleCreatePost = () => {
    muationCreate.mutate({
      "title": "json-server",
      "author": "typicode"
    });
  }

  // Sự kiện Xóa
  const handleDeletePost = (postId) => {
    muationDelete.mutate(postId);
  }

  // Sự kiện Update
  const handleUpdatePost = (id) => {
    const title = prompt('Nhập tiêu đề cần update');
    const author = prompt('Nhập tác giả cần update');
    if(title){
      muationUpdate.mutate({
        id: id,
        title: title,
        author: author,
      });
    }
  }

  if (query.isLoading) {
    return <h1>...Loading</h1>
  }

  if (query.isError) {
    return <h1>...Error</h1>
  }

  return (
    <div>
      <Header />
      <h1>React query</h1>
      {query.data?.map((post) => {
        return <p key={post.id}>
          {post.title}-{post.id} 
          &nbsp;
          <span 
            style={{ cursor: 'pointer', color:'blue' }}
            onClick={() => handleUpdatePost(post.id)}
          >
            [Edit]
          </span>
          &nbsp;
          <span 
            style={{ cursor: 'pointer', color:'red' }} 
            onClick={() => handleDeletePost(post.id)}
          >
            [Delete]
          </span>
        </p>
      })}
      <button onClick={handleCreatePost}>Create post</button>
    </div>
  )
}

export default JsonPosts;
```

### Chạy ứng dụng

Vào menu Json-server

Click vào nút 'Create post' để thêm mới bài viết

Click vào nút Delete để xóa bài viết

Click vào nút Edit, Nhập nội dung cần sửa

Ta thấy việc sử dụng UseMutaion giúp code gọn gàng hơn, và đem lại trải nghiệm mượt mà hơn cho người sử dụng khi chọn các thao tác Thêm mới, Cập nhật, Xóa dữ liệu.


<!-- *Bài tiếp theo [useMutation trong React Query](session_009_mutation.md)* -->