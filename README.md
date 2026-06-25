\# HoQuocBaoCMS\_Solution



\## 1. Giới thiệu đề tài



Đây là đồ án môn học Chuyên đề ASP.NET.

Đề tài xây dựng website bán hàng thời trang \*\*QuocBao Fashion\*\* sử dụng ASP.NET Core, SQL Server và ReactJS.



Hệ thống gồm 2 phần chính:



\* \*\*Backend\*\*: ASP.NET Core MVC + Web API dùng để quản trị dữ liệu và cung cấp API cho frontend.

\* \*\*Frontend\*\*: ReactJS client site dùng để hiển thị giao diện bán hàng cho khách hàng.



\## 2. Cấu trúc Solution



Solution được chia theo mô hình 3 tầng:



```text

HoQuocBaoCMS\_Solution

│

├── CMS.Data

│   ├── Entities

│   ├── AppDbContext.cs

│   └── Migrations

│

├── CMS.Backend

│   ├── Controllers

│   ├── Views

│   ├── wwwroot

│   ├── Program.cs

│   └── appsettings.json

│

└── cms.frontend

&#x20;   ├── src

&#x20;   ├── public

&#x20;   ├── package.json

&#x20;   └── README.md

```



\## 3. Công nghệ sử dụng



\* ASP.NET Core MVC

\* ASP.NET Core Web API

\* Entity Framework Core

\* SQL Server

\* ReactJS

\* React Router DOM

\* Axios

\* Bootstrap

\* Font Awesome

\* CKEditor



\## 4. Các chức năng chính



\### 4.1. Backend Admin



\* Đăng nhập quản trị

\* Đăng xuất

\* Quản lý danh mục bài viết

\* Quản lý bài viết

\* Quản lý người dùng

\* Quản lý danh mục sản phẩm

\* Quản lý sản phẩm

\* Quản lý khách hàng

\* Quản lý đơn hàng

\* Quản lý chi tiết đơn hàng

\* Upload hình ảnh

\* Soạn thảo nội dung bài viết bằng CKEditor

\* Cung cấp Web API cho ReactJS



\### 4.2. Frontend ReactJS



\* Trang chủ bán hàng

\* Banner slide

\* Hiển thị danh sách sản phẩm

\* Lọc sản phẩm theo danh mục

\* Lọc sản phẩm theo khoảng giá

\* Tìm kiếm sản phẩm

\* Trang cửa hàng

\* Trang chi tiết sản phẩm

\* Giỏ hàng

\* Trang đăng nhập

\* Trang đăng ký

\* Trang tin tức/blog

\* Trang chi tiết bài viết

\* Trang về chúng tôi



\## 5. Cách chạy Backend bằng Visual Studio



\### Bước 1: Mở Solution



Mở file solution bằng Visual Studio:



```text

HoQuocBaoCMS\_Solution.sln

```



\### Bước 2: Chọn project khởi chạy



Trong Visual Studio, chọn project:



```text

CMS.Backend

```



Sau đó chọn:



```text

Set as Startup Project

```



\### Bước 3: Kiểm tra chuỗi kết nối SQL Server



Mở file:



```text

CMS.Backend/appsettings.json

```



Kiểm tra phần `ConnectionStrings`.



Ví dụ:



```json

{

&#x20; "ConnectionStrings": {

&#x20;   "DefaultConnection": "Server=.;Database=HoQuocBaoCMS\_DB;Trusted\_Connection=True;TrustServerCertificate=True;"

&#x20; }

}

```



Nếu SQL Server của máy khác tên server, cần sửa lại `Server`.



Ví dụ:



```text

Server=localhost

Server=.

Server=DESKTOP-ABC\\\\SQLEXPRESS

```



\### Bước 4: Chạy Migration tạo Database



Mở Package Manager Console trong Visual Studio:



```text

Tools → NuGet Package Manager → Package Manager Console

```



Chọn Default project là:



```text

CMS.Data

```



Sau đó chạy lệnh:



```powershell

Update-Database

```



Lệnh này sẽ tạo database và các bảng dữ liệu trong SQL Server.



\### Bước 5: Chạy Backend



Nhấn:



```text

F5

```



hoặc bấm nút Run trong Visual Studio.



Backend sẽ chạy tại địa chỉ:



```text

https://localhost:7076

```



Swagger API có thể mở tại:



```text

https://localhost:7076/swagger

```



\## 6. Cách chạy Frontend ReactJS



\### Bước 1: Mở terminal tại thư mục gốc project



```bash

cd D:\\CSharp\\HoQuocBaoCMS\_Solution

```



\### Bước 2: Di chuyển vào thư mục frontend



```bash

cd cms.frontend

```



\### Bước 3: Cài đặt thư viện



```bash

npm install

```



\### Bước 4: Chạy frontend



```bash

npm start

```



Frontend sẽ chạy tại địa chỉ:



```text

http://localhost:3000

```



\## 7. Lưu ý khi chạy hệ thống



Backend cần chạy trước bằng Visual Studio:



```text

https://localhost:7076

```



Frontend chạy sau bằng lệnh:



```bash

npm start

```



Frontend gọi API từ Backend thông qua Axios.



Nếu frontend không tải được dữ liệu, cần kiểm tra:



\* Backend đã chạy chưa

\* Port backend có đúng là `7076` không

\* CORS trong `Program.cs` đã cho phép `http://localhost:3000` chưa

\* SQL Server đã có database chưa

\* Dữ liệu sản phẩm, bài viết đã được thêm chưa



\## 8. Tài khoản và dữ liệu mẫu



Tài khoản quản trị được tạo trong hệ thống dùng để đăng nhập trang Admin.



Nếu chưa có dữ liệu, có thể thêm dữ liệu từ trang quản trị hoặc thêm trực tiếp trong SQL Server.



Các nhóm dữ liệu chính:



\* Category

\* Post

\* User

\* CategoryProduct

\* Product

\* Customer

\* Order

\* OrderDetail



\## 9. Git Ignore



Project đã cấu hình `.gitignore` để loại bỏ các thư mục rác và file build không cần thiết khỏi Git:



```text

node\_modules/

bin/

obj/

.vs/

```



Nhờ đó repository trên GitHub chỉ lưu mã nguồn cần thiết, không đẩy các thư mục build hoặc thư viện cài đặt tạm thời.



\## 10. Tác giả



Sinh viên thực hiện: Ho Quoc Bao

Môn học: Chuyên đề ASP.NET

Đề tài: Xây dựng website bán hàng thời trang QuocBao Fashion sử dụng ASP.NET Core Web API và ReactJS



