# chat-app-socket ver 1.0
--- Các chức năng chính của phiên bản này ---
1. đăng kí/ đăng nhập tài khoản chat
2. tìm kiếm tài khoản theo email của họ, ấn vào kết quả để tạo boxchat với họ
3. chat realtime hiển thị xem người đó có đang chat với mình hay không
4. xem thông tin của mình hoặc của người khác (chỉ hiển thị email và ảnh đại diện)
5. hiển thị thông báo khi có tin nhắn mới
6. tạo groupchat với các chức năng: đổi trên group chat, thêm thành viên vào groupchat, xoá thành viên khỏi groupchat, xem thành viên có trong groupchat (chỉ admin)

--- Install ---
1. cd thư mục clone về, sau đó npm install để install node module cho backend
2. cd frontend, sau đó npm i để install node module cho frontend (reactjs)
3. ở thư mục clone về, npm start để chạy backend, npm start ở thư mục frontend để chạy frontend

--- Lưu ý ---
1. để chạy realtime cần phải tra ip của máy mình và thay vào phần proxy trong package.json của folder frontend và ENDPOINT trong file singlechat.js trong folder components
- vd: thay "http://localhost:5000" bằng "http://192.168.1.7:5000"
2. sau bước 1, để realtime những người khác cũng phải clone project này và làm như bước 1 nhưng ip là máy của người chạy server, chỉ cần chạy phần frontend

--- Cảm ơn --- 
<br> cảm ơn mọi người đã tham khảo project này. hi vọng mọi người có thể cho mình 1 star khi dùng project này <3 </br>

--- happy hacking!!! ---
