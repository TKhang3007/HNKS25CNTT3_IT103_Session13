let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400,
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920,
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520,
  },
];

// Hàm định dạng tiền Việt Nam
function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN") + " VNĐ";
}

// Hàm chuẩn hóa tên khách hàng và tên phim
function formatName(name) {
    if (!name) {
        return "";
    }

    let words = name.trim().split(/\s+/);

    let capitalizeWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return capitalizeWords.join(" ");
}

// Hàm tìm vị trí đơn đặt vé theo mã
function findBookingIndex(bookingCode) {
  if (bookingCode === null || !bookingCode.trim()) {
    return -1;
  }

  let targetBookingCode = bookingCode.trim().toUpperCase();

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === targetBookingCode) {
      return i;
    }
  }

  return -1;
}

// Hàm kiểm tra mã đặt vé
function validateBookingCode(bookingCode) {
    if (bookingCode === null) {
        return "Hủy thao tác";
    }

    let upperCode = bookingCode.trim().toUpperCase();

    if (upperCode === "") {
        return "Lỗi: Chưa nhập mã đặt vé";
    }

    if (upperCode.length < 6) {
        return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
    }

    if (!upperCode.startsWith("CIN-")) {
        return 'Lỗi: Sai tiền tố "CIN-"';
    }

    if (/\s/.test(upperCode)) {
        return "Lỗi: Mã đặt vé chứa khoảng trắng";
    }

    if (findBookingIndex(upperCode) !== -1) {
        return "Lỗi: Mã đặt vé đã tồn tại";
    }

    return "";
}

// Hàm nhập số nguyên dương
function inputPositiveInteger(message) {
    while (true) {
        let input = prompt(message);

        if (input === null) {
            return null;
        }

        input = input.trim();

        let number = Number(input);

        if (input !== "" && Number.isInteger(number) && number > 0) {
            return number;
        }

        alert("Lỗi: Vui lòng nhập số nguyên lớn hơn 0");
    }
}

// Hàm tính tiền đơn đặt vé
function calculateTotal(ticketCount, pricePerTicket) {
    let baseCost = ticketCount * pricePerTicket;

    let discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;

    let serviceFee = Math.round((baseCost - discount) * 0.08);

    let totalAmount = baseCost - discount + serviceFee;

    return {
        baseCost,
        discount,
        serviceFee,
        totalAmount,
    };
}

// Hàm hiển thị danh sách đơn đặt vé
function displayBookings(bookings) {
    if (!bookings || bookings.length === 0) {
        console.log("Danh sách đơn đặt vé trống");
        return;
    }

    let totalRevenue = 0;

    bookings.forEach((element, index) => {
        totalRevenue += element.totalAmount;

    console.log(`${index + 1}. ${element.bookingCode} - ${element.customerName} - ${element.movieTitle}
        SL: ${element.ticketCount} | Giá: ${formatCurrency(element.pricePerTicket)} | Tổng TT: ${formatCurrency(element.totalAmount)}`
    );
    });

    console.log(`Tổng: ${bookings.length} đơn đặt vé - Doanh thu: ${formatCurrency(totalRevenue)}`);
}

// Hàm nhập tên khách hàng hoặc tên phim
function inputNonEmptyName(message) {
    while (true) {
        let input = prompt(message);

        if (input === null) {
            return null;
        }

        input = input.trim();

        if (input !== "") {
            return formatName(input);
        }

        alert("Lỗi: Không được để trống");
    }
}

// Hàm in hóa đơn
function displayInvoice(booking, total) {
    console.log("========== HÓA ĐƠN ĐẶT VÉ ==========");
    console.log(`Mã đặt vé: ${booking.bookingCode}`);
    console.log(`Khách hàng: ${booking.customerName}`);
    console.log(`Tên phim: ${booking.movieTitle}`);
    console.log(`Số vé: ${booking.ticketCount}`);
    console.log(`Giá mỗi vé: ${formatCurrency(booking.pricePerTicket)}`);
    console.log(`Chi phí cơ sở: ${formatCurrency(total.baseCost)}`);
    console.log(`Giảm giá: ${formatCurrency(total.discount)}`);
    console.log(`Phí dịch vụ: ${formatCurrency(total.serviceFee)}`);
    console.log(`Tổng thanh toán: ${formatCurrency(total.totalAmount)}`);
    console.log("====================================");
}

// 2. Thêm đơn đặt vé mới
function handleCreateBooking() {
    let bookingCode = prompt("Nhập mã đặt vé:");

    let error = validateBookingCode(bookingCode);

    if (error !== "") {
        console.log(error);
        return;
    }

    bookingCode = bookingCode.trim().toUpperCase();

    let customerName = inputNonEmptyName("Nhập tên khách hàng:");

    if (customerName === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let movieTitle = inputNonEmptyName("Nhập tên phim:");

    if (movieTitle === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let ticketCount = inputPositiveInteger("Nhập số vé:");

    if (ticketCount === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé:");

    if (pricePerTicket === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let total = calculateTotal(ticketCount, pricePerTicket);

    let newBooking = {
        bookingCode,
        customerName,
        movieTitle,
        ticketCount,
        pricePerTicket,
        totalAmount: total.totalAmount,
    };

    bookings.push(newBooking);

    console.log("Thêm đơn đặt vé thành công");
    displayInvoice(newBooking, total);
}

// 3. Cập nhật đơn đặt vé
function handleUpdateBooking() {
    let bookingCode = prompt("Nhập mã đặt vé cần cập nhật:");

    if (bookingCode === null || !bookingCode.trim()) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let index = findBookingIndex(bookingCode);

    if (index === -1) {
        console.log(`Không tìm thấy đơn đặt vé có mã ${bookingCode.trim().toUpperCase()}`);
        return;
    }

    let ticketCount = inputPositiveInteger("Nhập số vé mới:");

    if (ticketCount === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé mới:");

    if (pricePerTicket === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let oldAmount = bookings[index].totalAmount;
    let total = calculateTotal(ticketCount, pricePerTicket);

    // Chỉ cập nhật sau khi đã nhập đủ dữ liệu
    bookings[index].ticketCount = ticketCount;
    bookings[index].pricePerTicket = pricePerTicket;
    bookings[index].totalAmount = total.totalAmount;

    console.log("Cập nhật thành công");
    console.log(`Tổng thanh toán cũ: ${formatCurrency(oldAmount)}`);
    console.log(`Tổng thanh toán mới: ${formatCurrency(total.totalAmount)}`);
}

// 4. Xóa đơn đặt vé
function handleDeleteBooking() {
    let bookingCode = prompt("Nhập mã đặt vé cần xóa:");

    if (bookingCode === null || !bookingCode.trim()) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    let index = findBookingIndex(bookingCode);

    if (index === -1) {
        console.log(
        `Không tìm thấy đơn đặt vé có mã ${bookingCode.trim().toUpperCase()}`
        );
        return;
    }

    let confirmDelete = prompt("Bạn có chắc chắn muốn xóa? Nhập Y để xác nhận:");

    if (confirmDelete === null || confirmDelete.trim().toUpperCase() !== "Y") {
        console.log("Đã hủy thao tác xóa");
        console.log(`Còn ${bookings.length} đơn đặt vé`);
        return;
    }

    bookings.splice(index, 1);

    console.log("Xóa đơn đặt vé thành công");
    console.log(`Còn ${bookings.length} đơn đặt vé`);
}

// 5. Tìm kiếm đơn đặt vé theo tên phim
function handleSearchBooking() {
    let keyword = prompt("Nhập từ khóa tìm kiếm tên phim:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = bookings.filter((booking) => {
        return booking.movieTitle.toLowerCase().includes(keyword);
    });

    if (result.length === 0) {
        console.log("Không tìm thấy đơn đặt vé phù hợp");
        return;
    }

    console.log("Kết quả tìm kiếm:");
    displayBookings(result);
}

// Hàm in báo cáo tổng kết khi thoát
function displaySummaryReport() {
    console.log("========== BÁO CÁO TỔNG KẾT ĐƠN ĐẶT VÉ ==========");

    if (bookings.length === 0) {
        console.log("Chưa có đơn đặt vé nào");
        console.log("================================================");
        return;
    }

    let totalRevenue = 0;
    let highestBooking = bookings[0];

    bookings.forEach((booking) => {
        totalRevenue += booking.totalAmount;

        if (booking.totalAmount > highestBooking.totalAmount) {
        highestBooking = booking;
        }
    });

    let averageRevenue = Math.round(totalRevenue / bookings.length);

    console.log(`Tổng số đơn đặt vé: ${bookings.length}`);
    console.log(`Tổng doanh thu: ${formatCurrency(totalRevenue)}`);
    console.log(`Doanh thu trung bình: ${formatCurrency(averageRevenue)}`);
    console.log(
        `Đơn cao nhất: ${highestBooking.bookingCode} - ${formatCurrency(highestBooking.totalAmount)}`
    );

    console.log("================================================");
}

// Hàm chạy chương trình
function main() {
    let choice;

    do {
        let input = prompt(`
===================================
HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
===================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
===================================
Vui lòng nhập lựa chọn của bạn (0 - 5):
`);

    // Kiểm tra Cancel, chuỗi rỗng và lựa chọn không hợp lệ
    if (input === null || input.trim() === "") {
        console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        choice = -1;
        continue;
    }

    choice = Number(input.trim());

    if (!Number.isInteger(choice) || choice < 0 || choice > 5) {
        console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        choice = -1;
        continue;
    }

    switch (choice) {
        case 1:
            displayBookings(bookings);
            break;

        case 2:
            handleCreateBooking();
            break;

        case 3:
            handleUpdateBooking();
            break;

        case 4:
            handleDeleteBooking();
            break;

        case 5:
            handleSearchBooking();
            break;

        case 0:
            displaySummaryReport();
            console.log("Cảm ơn bạn đã sử dụng hệ thống Moonlight Cinema!");
            break;

        default:
            console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
            break;
        }
    } while (choice !== 0);
}

main();