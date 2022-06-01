let categoryItems = document.querySelector("#categoryItems");
let editCategoryBtn = document.querySelector("#editCategoryButton");
let adCategoryBtn = document.querySelector("#addDeleteCategoryButtons");

// edit category item' content
function editCategoryItemFunc(label) {
    let inputCategory = label.nextElementSibling.nextElementSibling;

    /* if condition uses for preventing user from clicking on other
       category item when
       the user is already editing an item
    */
    if (editCategoryBtn.children[0].classList.contains("hidden")) {
        label.nextElementSibling.nextElementSibling.removeAttribute("disabled");
        editCategoryBtn.children[0].classList.remove("hidden"); // 'تایید' button
        editCategoryBtn.children[1].classList.remove("hidden"); // 'منصرف شدن' button
        inputCategory.value = null;
    }

    /* if user click on 'منصرف شدن' then two button should be
       disappeared
    */

    editCategoryBtn.children[1].addEventListener("click", () => {
        if (
            !label.nextElementSibling.nextElementSibling.hasAttribute(
                "disabled"
            )
        ) {
            label.nextElementSibling.nextElementSibling.setAttribute(
                "disabled",
                true
            ); // input element
            editCategoryBtn.children[0].classList.add("hidden");
            editCategoryBtn.children[1].classList.add("hidden");
            // return the default input value
            inputCategory.value = inputCategory.defaultValue;
        }
    });

    /* if user click on 'تایید' then an warning alert should be
       disappeared
    */
    editCategoryBtn.children[0].addEventListener("click", () => {
        // using sweetalert2 for create a beautiful alert
        Swal.fire({
            title: "تایید",
            text: "آیا از صحت اطلاعات مطمئن هستید؟ ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            confirmButtonColor: "#66bb6a",
            cancelButtonColor: "#d33",
            cancelButtonText: "خیر",
            reverseButtons: true,
        }).then((result) => {
            /* if user click on 'بله' then two button should be
               disappeared and this changes will be applied to
               input
            */
            if (result.isConfirmed) {
                /* this regex is all standard persian
                   letter that contains at least 2 letter
                   and no English letter,special character,digits,and so on
                */
                let regexForEditCategoryItems =
                    /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]{2,}[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]*)+$/;
                if (regexForEditCategoryItems.test(inputCategory.value)) {
                    label.nextElementSibling.nextElementSibling.setAttribute(
                        "disabled",
                        true
                    ); // input element
                    editCategoryBtn.children[0].classList.add("hidden");
                    editCategoryBtn.children[1].classList.add("hidden");

                    /* I we should update default value of input and
                   and also placeholder
                */
                    inputCategory.defaultValue = inputCategory.value;
                    inputCategory.placeholder = inputCategory.value;

                    // this new information should be saved in server
                } else {
                    Swal.fire({
                        title: " اخطار ",
                        text: " مقدار وارد شده معتبر نمی باشد.\nباید مقدار وارد شده شامل فقط حروف فارسی و حداقل ۳ حرف باشد.",
                        icon: "warning",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#65bb6a",
                    });
                }
            }
        });
    });
}

// add category item
function addCategoryItemFunc() {
    // check if another process haven't been activated by user
    if (editCategoryBtn.children[0].classList.contains("hidden")) {
        let tempValue;
        Swal.fire({
            title: "افزودن یک دسته بندی جدید",
            input: "text",
            inputLabel: "عنوانی برای دسته بندی جدید وارد کنید",
            inputPlaceholder: " به عنوان مثال شخصی ",
            confirmButtonColor: "#66bb6a",
            confirmButtonText: "اضافه کردن",
            showCancelButton: true,
            cancelButtonText: "انصراف",
            cancelButtonColor: "#d33",
        }).then((result) => {
            /* if user click on 'اضافه کردن' button then the process
               should be happened otherwise ignores it
            */
            if (result.isConfirmed) {
                tempValue = result.value;
                /* this regex is all standard persian
                   letter that contains at least 2 letter
                   and no English letter,special character,digits,and so on
                */
                let regexForAddCategoryItem =
                    /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]{2,}[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]*)+$/;
                if (regexForAddCategoryItem.test(tempValue)) {
                    // create new category item
                    categoryItems.insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="grid grid-rows-2 text-center group">
                            <div class="flex items-center text-xs md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                <i class="fa-solid fa-gear py-1 px-2 opacity-0"></i>
                                <span class="px-1 py-1 w-1/6 rounded-r bg-primary bg-opacity-50"> آیدی </span>
                                <span class="px-1 py-1 w-3/6 bg-primary bg-opacity-50"> عنوان </span>
                                <span class="px-1 py-1 w-2/6 rounded-l bg-primary bg-opacity-50"> قالب ها </span>
                            </div>
                            <div class="flex items-center">
                                <label for="${
                                    "category-input" +
                                    (categoryItems.children.length + 1)
                                }">
                                    <i class="fa-solid fa-gear px-1 py-1 text-black ml-1 cursor-pointer transition-all duration-300 hover:text-secondary md:opacity-0 md:group-hover:opacity-100"></i>
                                </label>
                                <span class="px-1 py-1 bg-secondary bg-opacity-20 w-1/6 text-black rounded-r">${
                                    categoryItems.children.length + 1
                                }</span>
                                <input type="text" placeholder="${tempValue}" value="${tempValue}" id="${
                            "category-input" +
                            (categoryItems.children.length + 1)
                        }" class="px-1 py-1 w-3/6 text-sm text-center bg-primary outline-none border-none h-97 placeholder:text-white placeholder:focus:opacity-0" disabled />
                                <span class="px-1 py-1 w-2/6 bg-primary rounded-l border-r border-slate-100 border-opacity-50">0</span
                            </div>
                        </div>
                    `
                    );
                    let label = categoryItems.lastChild.querySelector("label");
                    label.addEventListener("click", () => {
                        editCategoryItemFunc(label);
                    });

                    // this new information should be saved in server
                } else {
                    Swal.fire({
                        title: " اخطار ",
                        text: " مقدار وارد شده معتبر نمی باشد.\nباید مقدار وارد شده شامل فقط حروف فارسی و حداقل ۳ حرف باشد.",
                        icon: "warning",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#65bb6a",
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: " اخطار ",
            text: " شما در حال ویرایش یک نوع دسته بندی هستید! ",
            icon: "warning",
            confirmButtonText: "باشه",
            confirmButtonColor: "#65bb6a",
        });
    }
}

function removeCategoryItem(item) {
    Swal.fire({
        title: "حذف",
        text: "آیا از حذف این دسته بندی مطمئن هستید؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        /* if user click on 'بله' button
           that item will be deleted  
        */
        if (result.isConfirmed) {
            // find its parent and then remove that element
            let mainItem = item.target.parentElement.parentElement;
            if (
                mainItem ==
                categoryItems.children[categoryItems.children.length - 1]
            ) {
                // check if mainItem is the first child of categoryItems
                mainItem.remove();
            } else {
                mainItem.remove();
                /* after delete an category item we should
                   correct for property for label tag and
                   input id and inner text of span tag
                */
                categoryItems
                    .querySelectorAll("label")
                    .forEach((label, index) => {
                        label.htmlFor = "category-input" + (index + 1);
                        let span = label.nextElementSibling;
                        span.innerHTML = index + 1;
                        let input = span.nextElementSibling;
                        input.id = "category-input" + (index + 1);
                    });
            }
        }
    });
}

function deleteCategoryItemFunc() {
    // check if another process haven't been activated by user
    if (editCategoryBtn.children[0].classList.contains("hidden")) {
        adCategoryBtn.children[0].classList.add("hidden");
        adCategoryBtn.children[1].classList.remove("bg-opacity-20");
        adCategoryBtn.children[1].classList.add("text-slate-100");
        editCategoryBtn.children[2].classList.remove("hidden");
        categoryItems.querySelectorAll("label").forEach((label) => {
            label.classList.add("hidden");
            label.nextElementSibling.nextElementSibling.removeAttribute(
                "disabled"
            );
        });

        for (let item of categoryItems.children) {
            item.classList.add("cursor-pointer");
            item.addEventListener("click", removeCategoryItem);
        }
    } else {
        Swal.fire({
            title: " اخطار ",
            text: " شما در حال ویرایش یک نوع دسته بندی هستید! ",
            icon: "warning",
            confirmButtonText: "باشه",
            confirmButtonColor: "#66bb6a",
        });
    }
    /* when user click on 'انصراف' button the page should be came
       back to its default behavior when user opens it for first
       time
    */
    editCategoryBtn.children[2].addEventListener("click", () => {
        categoryItems.querySelectorAll("label").forEach((label) => {
            label.classList.remove("hidden");
            label.nextElementSibling.nextElementSibling.setAttribute(
                "disabled",
                true
            );
        });
        adCategoryBtn.children[0].classList.remove("hidden");
        adCategoryBtn.children[1].classList.add("bg-opacity-20");
        adCategoryBtn.children[1].classList.remove("text-slate-100");
        editCategoryBtn.children[2].classList.add("hidden");
        for (let item of categoryItems.children) {
            item.removeEventListener("click", removeCategoryItem);
            item.classList.remove("cursor-pointer");
        }
    });
}

// event listener for edit button in category section on every category item
categoryItems.querySelectorAll("label").forEach((label) =>
    label.addEventListener("click", () => {
        editCategoryItemFunc(label);
    })
);

// event listener for add button in category section
adCategoryBtn.children[0].addEventListener("click", addCategoryItemFunc);

// event listener for delete button in category section
adCategoryBtn.children[1].addEventListener("click", deleteCategoryItemFunc);
