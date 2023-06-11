function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveTemp(numSave) {
    var content = localStorage.getItem("tempNumber");
    var dataArray = [];

    if (content) {
        dataArray = JSON.parse(content);
        
        if (!Array.isArray(dataArray)) {
            dataArray = [];
        }
    }

    dataArray.push(numSave);

    localStorage.setItem("tempNumber", JSON.stringify(dataArray));
}

function roll(min, max) {
    var num = getRndInteger(min, max);
    var zeroString = "";

    if (num.toString().length < max.toString().length) {
        var zeroNum = max.toString().length - num.toString().length;

        for (var i = 0; i < zeroNum; i++) {
            zeroString += "0";
        }

        numSave = zeroString + num;
    } else {
        numSave = num.toString();
    }

    document.getElementById("number").innerHTML = numSave;
    saveTemp(numSave);

    return numSave;
}

function showTemp() {
    var content = localStorage.getItem("tempNumber");
    var dataArray = JSON.parse(content);
    var tableContent = "";
    if(dataArray == null) return;
    for (var i = 0; i < dataArray.length; i++) {
        var data = dataArray[i];
        var row = "<tr><td>" + (i + 1) + "</td><td>" + data + "</td></tr>";
        tableContent += row;
    }

    document.getElementById("data").innerHTML = tableContent;
}

function reload() {
    localStorage.removeItem("tempNumber");
    window.location.reload(true);
}

function exportData() {
    var data = localStorage.getItem("tempNumber"); // Lấy dữ liệu từ localStorage
    var dataArray = JSON.parse(data); // Chuyển chuỗi JSON thành mảng dữ liệu

    var xlsData = []; // Mảng dữ liệu cho file XLS
    xlsData.push(["Index", "Value"]); // Thêm hàng tiêu đề của cột

    // Duyệt qua từng phần tử trong mảng dữ liệu và thêm vào mảng xlsData
    for (var i = 0; i < dataArray.length; i++) {
        var index = i + 1; // Tính chỉ số (index) tăng dần từ 1
        var value = dataArray[i]; // Giá trị data
        xlsData.push([index, value]); // Thêm hàng dữ liệu vào mảng xlsData
    }

    var workbook = XLSX.utils.book_new(); // Tạo workbook mới
    var worksheet = XLSX.utils.aoa_to_sheet(xlsData); // Chuyển mảng dữ liệu thành sheet

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data"); // Thêm sheet vào workbook
    var xlsBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // Ghi workbook vào buffer

    // Tạo blob từ buffer
    var blob = new Blob([xlsBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "Data.xlsx";
    a.click();
}

window.onload = function(){
    showTemp();
}
document.getElementById("btnDraw").addEventListener("click", showTemp);
