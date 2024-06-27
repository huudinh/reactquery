# Cache trong React Query 

### Cache trong react query là gì

Khi bạn sử dụng React Query, nó tự động lưu trữ dữ liệu đã được gọi từ máy chủ bằng một khóa duy nhất. Khóa này giúp React Query xác định và truy xuất dữ liệu đã lưu trữ cho các yêu cầu sau này. Nếu dữ liệu cho một khóa đã tồn tại trong cache và chưa hết hạn, React Query sẽ trả về dữ liệu đã lưu thay vì thực hiện yêu cầu mạng mới

Mặc định, React Query sẽ lưu trữ dữ liệu trong cache trong khoảng thời gian 5 phút. Sau thời gian này, dữ liệu sẽ được xem xét là hết hạn và có thể bị xóa khỏi cache

React Query đánh dấu dữ liệu là “cũ” sau thời gian staleTime (mặc định là 0 hoặc ngay lập tức). Khi dữ liệu bị đánh dấu là cũ, React Query sẽ thực hiện yêu cầu mạng mới để cập nhật dữ liệu

### Cài đặt React Router

```
npm install react-router-dom@6
```

* Bài tiếp theo [Cache trong React Query](session_003_cache_api.md)