# Thư viện lớp: DOM thuần và React

## So sánh Phần A và Phần B

| Tiêu chí | Phần A: DOM thuần | Phần B: React |
| --- | --- | --- |
| **Quản lý trạng thái** | Lập trình viên tự giữ biến JavaScript và đồng bộ thủ công với từng phần tử DOM sau mỗi thao tác. | `useState` lưu trạng thái; khi state thay đổi, React tự re-render phần giao diện liên quan. |
| **Cách dựng giao diện** | Dựng giao diện theo hướng mệnh lệnh (Imperative) bằng `createElement`, `append` hoặc `innerHTML`. | Dùng JSX và Component theo hướng khai báo (Declarative), mô tả UI dựa trên props và state. |
| **Khả năng tái sử dụng** | Các khối UI thường khó chia sẻ, vì logic và thao tác DOM dễ bị gắn chặt với selector cụ thể. | Component được tái sử dụng qua Props; `children` giúp tạo các Section có nội dung linh hoạt. |
| **Hiệu năng và luồng cập nhật** | Thao tác trực tiếp lên Real DOM, cần tự xác định phần tử nào phải cập nhật. | React sử dụng Virtual DOM để so sánh và tối ưu các cập nhật cần áp dụng lên Real DOM. |

## Phạm vi Phần B

Ứng dụng dùng dữ liệu tĩnh trong `src/data/books.js`, không gọi API ngoài. `App` quản lý thể loại đang chọn và danh sách ID sách yêu thích; các component nhận dữ liệu và callback qua props.

Chạy dự án:

```bash
npm install
npm run dev
```
