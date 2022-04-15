let transactionsListContent = document.querySelectorAll(
    "#transactionsListContent > div"
);
let transactionDeleteButtons = document.querySelectorAll(
    "#transactionDeleteButtons > div"
);
let filterTransaction = document.querySelector("#filterTransaction");

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

function filterTransactionsItem(e) {
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
        console.log("price");
    } else if (option == "date") {
        console.log("date");
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
