# useInfiniteQuery trong react query

### useInfiniteQuery là gì?

Là một hook trong React Query cho phép bạn truy vấn và phân trang dữ liệu một cách hiệu quả. Nó hoạt động tương tự như hook useQuery nhưng được tối ưu hóa cho việc tải dữ liệu theo từng trang, giúp bạn cải thiện hiệu suất và trải nghiệm người dùng cho các danh sách dữ liệu lớn.

### Lợi ích sử dụng useInfiniteQuery

Tải dữ liệu hiệu quả: useInfiniteQuery chỉ tải một lượng nhỏ dữ liệu mỗi lần, giúp giảm tải cho máy chủ và cải thiện hiệu suất tải trang.

Phân trang dễ dàng: useInfiniteQuery cung cấp các API tích hợp sẵn để quản lý phân trang, giúp bạn dễ dàng hiển thị các trang dữ liệu tiếp theo cho người dùng.

Trải nghiệm người dùng mượt mà: useInfiniteQuery cho phép bạn hiển thị dữ liệu ban đầu ngay lập tức và tải thêm dữ liệu khi người dùng cuộn xuống, mang lại trải nghiệm người dùng mượt mà và đáp ứng.

### Thêm trang Loadmore.jsx

Tạo trang src/pages/Loadmore.jsx

```

```

### Sửa file Header.jsx

Sửa file components/Header.jsx

```

```

### Sửa file App.jsx

```

```

### Chạy ứng dụng




<!-- *Bài tiếp theo [useInfiniteQuery trong react query](session_008_loadmore.md)* -->