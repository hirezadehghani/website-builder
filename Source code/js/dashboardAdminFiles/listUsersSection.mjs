let listUsersButtons = document.querySelector("#listUsersButtons");
let usersListTableContent = document.querySelectorAll(
    "#usersListTableContent > div"
);

function convertPersianNumbersToEnglish(num) {
    // an object for maping persian number to english number
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

    let result = "";
    // convert persian number to English number
    for (let i = 0; i < num.length; i++) {
        result += persianNumber[num[i]];
    }
    return result;
}

function phoneNumberValidation(value) {
    let phoneNumber = value;
    // check for persian digits that has 10 length
    let persianNumberRegex = /^[\u06F0-\u06F9]{10}$/;
    // check for english digits that has 10 length
    let englishNumberRegex = /^\d{10}$/;

    // this regex is for all Iran's phone numbers such as Irancell,Hamrahe Aval,Rightel
    let regexForPhoneNumber1 =
        /^\u06F9(\u06F0[\u06F1-\u06F9]|\u06F1[\u06F0-\u06F9]|\u06F2[\u06F0-\u06F2]|\u06F3[\u06F0-\u06F9]|\u06F9[\u06F0-\u06F4]|\u06F4\u06F1)[\u06F0-\u06F9]{7}$/;
    let regexForPhoneNumber2 =
        /^9(0[1-9]|1[0-9]|2[0-2]|3[0-9]|9[0-4]|41)[0-9]{7}$/;

    if (
        persianNumberRegex.test(phoneNumber) &&
        regexForPhoneNumber1.test(phoneNumber)
    ) {
        phoneNumber = convertPersianNumbersToEnglish(phoneNumber);
        return phoneNumber;
    } else if (
        englishNumberRegex.test(phoneNumber) &&
        regexForPhoneNumber2.test(phoneNumber)
    ) {
        return phoneNumber;
    } else {
        return null;
    }
}

function deleteUsersListTableItem(e) {
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
}

function searchUsersListTable(e) {
    let userName = [];
    let userLastName = [];
    let result = [];
    let inputValue = e.target.value.trim();
    usersListTableContent.forEach((tableItem) => {
        userName.push(tableItem.children[0].innerHTML.trim());
        userLastName.push(tableItem.children[1].innerHTML.trim());
    });

    // selecting user names that corresponds to admin search
    userName.filter((Name) => {
        if (Name.includes(inputValue)) {
            result.push(Name);
        }
    });
    // selecting user family that corresponds to admin search
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
}

function editUsersListTableItem(e) {
    let tableItemContent = e.target;
    Swal.fire({
        title: " ویرایش محتوای جدول کاربران",
        input: "text",
        inputLabel: " مقدار جدید را وارد کنید ",
        inputPlaceholder: tableItemContent.innerHTML.trim(),
        confirmButtonColor: "#66bb6a",
        confirmButtonText: " تایید ",
        showCancelButton: true,
        cancelButtonText: "انصراف",
        cancelButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            if (
                tableItemContent.hasAttribute("data-firstName") ||
                tableItemContent.hasAttribute("data-lastName")
            ) {
                // if our target is name of user
                let regexForName =
                    /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]{2,}[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]*)+$/;
                if (regexForName.test(result.value)) {
                    e.target.innerHTML = result.value;
                } else {
                    Swal.fire({
                        title: " اخطار ",
                        text: " مقدار وارد شده معتبر نمی باشد.\nباید مقدار وارد شده شامل فقط حروف فارسی و حداقل ۳ حرف باشد.",
                        icon: "warning",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#65bb6a",
                    });
                }
            } else if (tableItemContent.hasAttribute("data-phone")) {
                // if our target is phone number of user
                if (phoneNumberValidation(result.value)) {
                    e.target.innerHTML = phoneNumberValidation(result.value);
                } else {
                    Swal.fire({
                        title: " اخطار ",
                        text: " شماره تماس معتبری را بدون احتساب صفر وارد کنید ",
                        icon: "warning",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#65bb6a",
                    });
                }
            } else if (tableItemContent.hasAttribute("data-mail")) {
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
}

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
    "input",
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
