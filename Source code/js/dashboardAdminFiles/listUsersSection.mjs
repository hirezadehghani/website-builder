let listUsersButtons = document.querySelector("#listUsersButtons");
let usersListTableContent = document.querySelectorAll(
    "#usersListTableContent > div"
);

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
    let defaultValue = e.target.innerHTML;
    Swal.fire({
        title: " ویرایش محتوای جدول کاربران",
        input: "text",
        inputLabel: " مقدار جدید را وارد کنید ",
        inputPlaceholder: defaultValue,
        confirmButtonColor: "#66bb6a",
        confirmButtonText: " تایید ",
        showCancelButton: true,
        cancelButtonText: "انصراف",
        cancelButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            e.target.innerHTML = result.value;
        }
    });
};

// users list section

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
