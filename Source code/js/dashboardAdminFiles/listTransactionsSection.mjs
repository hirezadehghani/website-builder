let transactionsListContent = document.querySelectorAll(
    "#transactionsListContent > div"
);
let transactionDeleteButtons = document.querySelectorAll(
    "#transactionDeleteButtons > div"
);
let filterTransaction = document.querySelector("#filterTransaction");
// variable for Price range
let filterPriceRange = document.querySelector("#filterPriceRange");
let resultPriceRange = filterPriceRange.querySelector("div:nth-child(2)");
let inputPriceRange1 = document.querySelector("#inputPriceRange1");
let inputPriceRange2 = document.querySelector("#inputPriceRange2");

// variable for date range
let filterDateRange = document.querySelector("#filterDateRange");
let dateMonthStart = document.querySelector("#dateMonthStart");
let dateDayStart = document.querySelector("#dateDayStart");
let dateYearStart = document.querySelector("#dateYearStart");
let dateMonthEnd = document.querySelector("#dateMonthEnd");
let dateDayEnd = document.querySelector("#dateDayEnd");
let dateYearEnd = document.querySelector("#dateYearEnd");

function deleteTransactionItem(e) {
    let tableItem = e.target.parentElement;
    /* if user clicks on status of transaction then
       parent is different and should get it
    */
    if (tableItem.classList.contains("table-cell")) {
        tableItem = tableItem.parentElement;
    }

    Swal.fire({
        title: "حذف",
        text: " آیا از حذف این تراکنش از لیست تراکنش ها مطمئن هستید ؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            tableItem.remove();
        }
    });
}

function showBaseOnSuccess(tableItem, value) {
    if (value == "successStatus") {
        // if transaction is successful
        if (tableItem.children[4].getAttribute("data-success")) {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    } else {
        // if transaction is unsuccessful
        if (!tableItem.children[4].getAttribute("data-success")) {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    }
}

function showBaseOnDeposit(tableItem, value) {
    if (value == "deposit") {
        // if type was deposit
        if (tableItem.children[3].getAttribute("data-type") == "deposit") {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    } else {
        // if type was withdraw
        if (tableItem.children[3].getAttribute("data-type") == "withdraw") {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    }
}

function setValuePriceRange1() {
    let gapLimitPrice = 50000;
    if (parseInt(inputPriceRange1.value) <= parseInt(inputPriceRange2.value)) {
        inputPriceRange1.value =
            parseInt(inputPriceRange2.value) + gapLimitPrice;
    }
}

function setValuePriceRange2() {
    let gapLimitPrice = 50000;

    if (parseInt(inputPriceRange2.value) >= parseInt(inputPriceRange1.value)) {
        inputPriceRange2.value =
            parseInt(inputPriceRange1.value) - gapLimitPrice;
    }
}

function showBaseOnPrice(tableItem) {
    filterPriceRange.classList.remove("hidden");
    // show value of range price to user
    resultPriceRange.children[0].innerHTML = parseInt(inputPriceRange1.value);
    resultPriceRange.children[1].innerHTML = parseInt(inputPriceRange2.value);

    let tableItemPrice = parseInt(tableItem.children[2].innerHTML);

    if (
        parseInt(inputPriceRange2.value) <= tableItemPrice &&
        tableItemPrice <= parseInt(inputPriceRange1.value)
    ) {
        tableItem.classList.remove("hidden");
    } else {
        tableItem.classList.add("hidden");
    }
}

function validateRangeDate1(e) {
    let element = e.target;

    // if user choose from first six month
    dateDayStart.children[dateDayStart.children.length - 1].removeAttribute(
        "disabled"
    );
    dateDayStart.children[dateDayStart.children.length - 2].removeAttribute(
        "disabled"
    );
    // if user choose last month, days should be decreased to 30
    if (element.value >= 7) {
        dateDayStart.children[dateDayStart.children.length - 1].setAttribute(
            "disabled",
            true
        );
    }
    // if user choose last month, days should be decreased to 29
    if (element.value == 12) {
        dateDayStart.children[dateDayStart.children.length - 2].setAttribute(
            "disabled",
            true
        );
    }
    dateDayStart.value = "1";
}

function validateRangeDate2(e) {
    let element = e.target;

    // if user choose from first six month
    dateDayEnd.children[dateDayEnd.children.length - 1].removeAttribute(
        "disabled"
    );
    dateDayEnd.children[dateDayEnd.children.length - 2].removeAttribute(
        "disabled"
    );
    // if user choose last month, days should be decreased to 30
    if (element.value >= 7) {
        dateDayEnd.children[dateDayEnd.children.length - 1].setAttribute(
            "disabled",
            true
        );
    }
    // if user choose last month, days should be decreased to 29
    if (element.value == 12) {
        dateDayEnd.children[dateDayEnd.children.length - 2].setAttribute(
            "disabled",
            true
        );
    }
    dateDayEnd.value = "1";
}

function showBaseOnDate(tableItem) {
    filterDateRange.classList.remove("hidden");

    // get persian date for start date range
    let startDateArray = [];
    startDateArray.push(parseInt(dateYearStart.value));
    startDateArray.push(parseInt(dateMonthStart.value));
    startDateArray.push(parseInt(dateDayStart.value));
    let startDate = new persianDate(startDateArray).format();

    // get persian date for end date range
    let endDateArray = [];
    endDateArray.push(parseInt(dateYearEnd.value));
    endDateArray.push(parseInt(dateMonthEnd.value));
    endDateArray.push(parseInt(dateDayEnd.value));
    let endDate = new persianDate(endDateArray).format();

    // get persian date for current table Item
    let tableItemDate = tableItem.children[1].innerHTML.trim();
    let regexDateMonth = /\/(\d*)\//;
    let regexDateYear = /\d{4}/;
    let regexDateDay = /\d*$/;
    let tableItemYear = regexDateYear.exec(tableItemDate)[0];
    let tableItemMonth = regexDateMonth.exec(tableItemDate)[1];
    let tableItemDay = regexDateDay.exec(tableItemDate)[0];

    let itemDateArray = [];
    itemDateArray.push(parseInt(tableItemYear));
    itemDateArray.push(parseInt(tableItemMonth));
    itemDateArray.push(parseInt(tableItemDay));
    tableItemDate = new persianDate(itemDateArray).format();

    if (startDate <= tableItemDate && tableItemDate <= endDate) {
        tableItem.classList.remove("hidden");
    } else {
        tableItem.classList.add("hidden");
    }
}

function filterTransactionsItem(e) {
    /* range price and date should not be displayed to user if
       user choose filter base on other things
    */
    filterPriceRange.classList.add("hidden");
    filterDateRange.classList.add("hidden");

    let option = e.target.value;
    if (option == "...") {
        transactionsListContent.forEach((tableItem) => {
            tableItem.classList.remove("hidden");
        });
    } else if (option == "successStatus" || option == "failStatus") {
        transactionsListContent.forEach((tableItem) => {
            showBaseOnSuccess(tableItem, option);
        });
    } else if (option == "deposit" || option == "withdraw") {
        transactionsListContent.forEach((tableItem) => {
            showBaseOnDeposit(tableItem, option);
        });
    } else if (option == "price") {
        transactionsListContent.forEach((tableItem) => {
            showBaseOnPrice(tableItem);
        });
    } else if (option == "date") {
        transactionsListContent.forEach((tableItem) => {
            showBaseOnDate(tableItem);
        });
    }
}

// ' حذف ' button
transactionDeleteButtons[0].addEventListener("click", () => {
    transactionDeleteButtons[0].classList.remove("bg-opacity-20");
    transactionDeleteButtons[0].classList.add("text-slate-100");
    transactionDeleteButtons[1].classList.remove("hidden");

    transactionsListContent.forEach((tableItem) => {
        tableItem.addEventListener("click", deleteTransactionItem);
    });
});

// ' انصراف ' button
transactionDeleteButtons[1].addEventListener("click", () => {
    transactionDeleteButtons[0].classList.add("bg-opacity-20");
    transactionDeleteButtons[0].classList.remove("text-slate-100");
    transactionDeleteButtons[1].classList.add("hidden");

    transactionsListContent.forEach((tableItem) => {
        tableItem.removeEventListener("click", deleteTransactionItem);
    });
});

// ' فیلتر ' button
filterTransaction.addEventListener("change", filterTransactionsItem);

transactionsListContent.forEach((tableItem) => {
    inputPriceRange1.addEventListener("input", () => {
        setValuePriceRange1();
        showBaseOnPrice(tableItem);
    });
    inputPriceRange2.addEventListener("input", () => {
        setValuePriceRange2();
        showBaseOnPrice(tableItem);
    });

    // Date range
    filterDateRange.addEventListener("submit", (e) => {
        e.preventDefault();
        showBaseOnDate(tableItem);
    });
});

// validate date range
dateMonthStart.addEventListener("input", validateRangeDate1);
dateMonthEnd.addEventListener("input", validateRangeDate2);
