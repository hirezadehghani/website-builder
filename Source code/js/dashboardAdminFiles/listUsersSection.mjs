let listUsersButtons = document.querySelector("#listUsersButtons");
let usersListTableContent = document.querySelectorAll(
    "#usersListTableContent > div"
);

let persianNumber = {
    "۰": 0,
    "۱": 1,
    "۲": 2,
    "۳": 3,
    "۴": 4,
    "۵": 5,
    "۶": 6,
    "۷": 7,
    "۸": 8,
    "۹": 9,
};

let isAllpersianNumbers = (NC) => {
    if (NC === "") {
        return false;
    }
    for (let i = 0; i < NC.length; i++) {
        if (persianNumber[NC[i]] === undefined) {
            return false;
        }
    }
    return true;
};

let phoneNumberValidation = (value) => {
    let phoneNumber = value;
    let pn;
    if (isAllpersianNumbers(phoneNumber)) {
        // convert persian number to English number
        for (let i = 0; i < phoneNumber.length; i++) {
            pn += persianNumber[phoneNumber[i]];
        }
        // checks if phoneNumber's values are all English numbers
    } else if (parseInt(phoneNumber)) {
        pn = phoneNumber;
    } else {
        return false;
    }

    if (pn.length === 10) {
        // this regex is for all Iran's phone numbers such as Irancell,Hamrahe Aval,Rightel
        let regexForPhoneNumber =
            /^9(0[1-9]|1[0-9]|2[0-2]|3[0-9]|9[0-4]|41)[0-9]{7}$/;
        if (regexForPhoneNumber.test(parseInt(pn))) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

let deleteUsersListTableItem = (e) => {
    let tableItem = e.target.parentElement;
    Swal.fire({
        title: "حذف",
        text: "آیا از حذف این کاربر از لیست کاربران مطمئن هستید؟ ",
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
};

let searchUsersListTable = (e) => {
    let userName = [];
    let userLastName = [];
    let result = [];
    let inputValue = e.target.value.trim();
    usersListTableContent.forEach((tableItem) => {
        userName.push(tableItem.children[0].innerHTML.trim());
        userLastName.push(tableItem.children[1].innerHTML.trim());
    });

    // selecting user names that scorresponds to admin search
    userName.filter((Name) => {
        if (Name.includes(inputValue)) {
            result.push(Name);
        }
    });
    // selecting user family that scorresponds to admin search
    userLastName.filter((Family) => {
        if (Family.includes(inputValue)) {
            result.push(Family);
        }
    });

    usersListTableContent.forEach((tableItem) => {
        /* if any item from result array matches with name or
           family in users table it will be shown to user
        */
        if (
            result.indexOf(tableItem.children[0].innerHTML.trim()) != -1 ||
            result.indexOf(tableItem.children[1].innerHTML.trim()) != -1
        ) {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    });
};

let editUsersListTableItem = (e) => {
    let tableItemContent = e.target;
    Swal.fire({
        title: " ویرایش محتوای جدول کاربران",
        input: "text",
        inputLabel: " مقدار جدید را وارد کنید ",
        inputPlaceholder: tableItemContent.innerHTML.trim(), // trim function removes whitespace from end and begining
        confirmButtonColor: "#66bb6a",
        confirmButtonText: " تایید ",
        showCancelButton: true,
        cancelButtonText: "انصراف",
        cancelButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            if (
                tableItemContent.getAttribute("data-firstName") ||
                tableItemContent.getAttribute("data-lastName")
            ) {
                // if our target is name of user
                let regexForName = /^[آ-ی]{4,}\s*[آ-ی]*/;
                if (regexForName.test(result.value)) {
                    e.target.innerHTML = result.value;
                } else {
                    Swal.fire({
                        title: " اخطار ",
                        text: " مقدار وارد شده معتبر نمی باشد.\nباید مقدار وارد شده شامل فقط حروف فارسی و حداقل ۴ حرف باشد.",
                        icon: "warning",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#65bb6a",
                    });
                }
            } else if (tableItemContent.getAttribute("data-phone")) {
                // if our target is phone number of user
                if (phoneNumberValidation(result.value)) {
                    e.target.innerHTML = result.value;
                } else {
                    Swal.fire({
                        title: " اخطار ",
                        text: " شماره تماس معتبری را بدون احتساب صفر وارد کنید ",
                        icon: "warning",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#65bb6a",
                    });
                }
            } else if (tableItemContent.getAttribute("data-mail")) {
                // if our target is email of user
                let regexFormail =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (regexFormail.test(result.value)) {
                    e.target.innerHTML = result.value;
                } else {
                    Swal.fire({
                        title: " اخطار ",
                        text: " ایمیل معتبر نمی باشد ",
                        icon: "warning",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#65bb6a",
                    });
                }
            }
        }
    });
};

// 'حذف' button in users list section
listUsersButtons.children[0].addEventListener("click", () => {
    listUsersButtons.children[0].classList.remove("bg-opacity-20");
    listUsersButtons.children[0].classList.add("text-slate-100");
    listUsersButtons.children[1].classList.add("hidden");
    listUsersButtons.children[3].classList.remove("hidden");

    usersListTableContent.forEach((tableItem) => {
        tableItem.addEventListener("click", deleteUsersListTableItem);
    });
});

// 'انصراف' button in users list section for delete a table item
listUsersButtons.children[3].addEventListener("click", () => {
    listUsersButtons.children[0].classList.add("bg-opacity-20");
    listUsersButtons.children[0].classList.remove("text-slate-100");
    listUsersButtons.children[1].classList.remove("hidden");
    listUsersButtons.children[3].classList.add("hidden");

    usersListTableContent.forEach((tableItem) => {
        tableItem.removeEventListener("click", deleteUsersListTableItem);
    });
});

// 'جستجوی کاربر' button in users list section
listUsersButtons.children[2].children[0].addEventListener(
    "keyup",
    searchUsersListTable
);

// 'ویرایش' button in users list section
listUsersButtons.children[1].addEventListener("click", () => {
    listUsersButtons.children[0].classList.add("hidden");
    listUsersButtons.children[1].classList.remove("bg-opacity-20");
    listUsersButtons.children[1].classList.add("text-slate-100");
    listUsersButtons.children[3].classList.remove("hidden");

    usersListTableContent.forEach((tableItem) => {
        tableItem.querySelectorAll(".table-cell").forEach((tableCell) => {
            tableCell.classList.add("hover:bg-blue-500");
        });
        tableItem.classList.remove("hover:bg-blue-500");

        tableItem.addEventListener("click", editUsersListTableItem);
    });
});

// 'انصراف' button in users list section for editing a table item
listUsersButtons.children[3].addEventListener("click", () => {
    listUsersButtons.children[0].classList.remove("hidden");
    listUsersButtons.children[1].classList.add("bg-opacity-20");
    listUsersButtons.children[1].classList.remove("text-slate-100");
    listUsersButtons.children[3].classList.add("hidden");

    usersListTableContent.forEach((tableItem) => {
        tableItem.querySelectorAll(".table-cell").forEach((tableCell) => {
            tableCell.classList.remove("hover:bg-blue-500");
        });
        tableItem.classList.add("hover:bg-blue-500");

        tableItem.removeEventListener("click", editUsersListTableItem);
    });
});
