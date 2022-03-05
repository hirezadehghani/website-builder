// user info variables
let panel = document.querySelector("#panel");
let hamburgerMenu = document.querySelector("#hamburger_menu");
let closeArrowBtn = document.querySelector(".close-arrow-btn");
let sections = document.querySelectorAll(".sections > div");
let changeInfoBtn = document.querySelector("#changeInfoButton");
let changeInfoSection = document.querySelector("#changeInfoSection");
let exitBtn = document.querySelector("#exitButton");
let exitBtnMobile = document.querySelector("#exitButtonMobile");
let deleteAccountBtn = document.querySelector("#deleteAccountButton");
let returnBtnMobile = document.querySelector("#returnButtonMobile");
// category variables
let categoryItems = document.querySelector("#categoryItems");
let editCategoryBtn = document.querySelector("#editCategoryButton");
let adCategoryBtn = document.querySelector("#addDeleteCategoryButtons");
// FAQ variables
let accordion = document.querySelector(".accordion");
let faqBtn = document.querySelector("#faqButton");
let redCirclesDelete = document.querySelector("#redCirclesDelete");
// list users variables
let listUsersButtons = document.querySelector("#listUsersButtons");
let usersListTableContent = document.querySelectorAll(
    "#usersListTableContent > div"
);

let userName = [];
let userLastName = [];
usersListTableContent.forEach((tableItem) => {
    userName.push(tableItem.children[0].innerHTML.trim());
    userLastName.push(tableItem.children[1].innerHTML.trim());
});
/* when click on hamburger menu the panel should appear to user
   and also the close arrow button should be in panel,so user can
   close the panel through it. so this Event listener plays role
   when we click on hamburger menu.
*/
let showPanelMobile = () => {
    if (panel.classList.contains("invisible")) {
        hamburgerMenu.classList.add("hidden");
        exitBtnMobile.classList.add("hidden");
        panel.classList.remove("invisible");
        closeArrowBtn.classList.remove("hidden");
        returnBtnMobile.classList.add("hidden");
    }
};

/* when we want to close panel this event listener should execute 
   and close panel and show hamburger menu
*/
let closePanelMobile = () => {
    hamburgerMenu.classList.remove("hidden");
    exitBtnMobile.classList.remove("hidden");
    panel.classList.add("invisible");
    closeArrowBtn.classList.add("hidden");
    /* return button mobile should be displayed only when
       change info section is displaying to user otherwise
       it should remain hidden
    */
    if (!changeInfoSection.classList.contains("hidden")) {
        returnBtnMobile.classList.remove("hidden");
    }
};

/* when click on one item of panel, that item should get
   background-color secondary and related information to
   that section will display and other section should be
   disappeared
*/
let handleDisplayOfSections = () => {
    let panelListTag = panel.querySelectorAll("div > ul li");
    panelListTag[2].classList.add("bg-secondary");
    sections[0].classList.remove("hidden");
    /* we start this loop from item 3 (i=2) because first two
       item have no special function and be displayed just for
       more info to user
    */
    for (let i = 2; i < panelListTag.length; i++) {
        panelListTag[i].addEventListener("click", () => {
            /* if section category have been displayed already,
               then we should check if some process in category 
               section is happening or not. if all default buttons
               are displayed to user and others are hidden then
               we haven't any process happening
            */
            if (
                !sections[4].classList.contains("hidden") &&
                !(
                    adCategoryBtn.children[0].classList.contains("hidden") ==
                        false &&
                    adCategoryBtn.children[1].classList.contains("hidden") ==
                        false &&
                    editCategoryBtn.children[0].classList.contains("hidden") &&
                    editCategoryBtn.children[1].classList.contains("hidden") &&
                    editCategoryBtn.children[2].classList.contains("hidden")
                )
            ) {
                Swal.fire({
                    title: "اخطار",
                    text: "شما در حال حاضر در حال انجام یک فرایند دیگر هستید!",
                    icon: "warning",
                    confirmButtonText: "باشه",
                    confirmButtonColor: "#66bb6a",
                });
            } else if (
                !sections[5].classList.contains("hidden") &&
                !(
                    faqBtn.children[0].classList.contains("hidden") == false &&
                    faqBtn.children[1].classList.contains("hidden") == false &&
                    faqBtn.children[2].classList.contains("hidden")
                )
            ) {
                /* if section faq have been displayed already,
                   then we should check if some process in faq 
                   section is happening or not. if all default buttons
                   are displayed to user and others are hidden then
                   we haven't any process happening
                */
                Swal.fire({
                    title: "اخطار",
                    text: "شما در حال حاضر در حال انجام یک فرایند دیگر هستید!",
                    icon: "warning",
                    confirmButtonText: "باشه",
                    confirmButtonColor: "#66bb6a",
                });
            } else {
                /* if user first click on ' تغییر جزئیات ' and then click on
                   other li tag this section should be disappeared and also
                   return button mobile should be disappeared for mobile width
                */
                changeInfoSection.classList.add("hidden");
                returnBtnMobile.classList.add("hidden");

                // remove background color secondary class for other item
                panel
                    .querySelectorAll("div > ul li.bg-secondary")
                    .forEach((list) => {
                        list.classList.remove("bg-secondary");
                    });

                /* add hidden class to divs tag that don't have that class
                   because just one item should be displayed to user
                */
                sections.forEach((sec) => {
                    if (!sec.classList.contains("hidden")) {
                        sec.classList.add("hidden");
                    }
                });

                panelListTag[i].classList.add("bg-secondary");
                sections[i - 2].classList.remove("hidden");
            }
        });
    }
};

/* when user click on 'تغییر جزئیات' that section should be 
   disappeared and change info section be displayed to user
*/
let showDetailsInfoSection = () => {
    sections[0].classList.add("hidden");
    changeInfoSection.classList.remove("hidden");
    /* if panel opened and user click on change user info
       button,return button mobile  shouldn't be displayed
       to user 
    */
    if (panel.classList.contains("invisible")) {
        returnBtnMobile.classList.remove("hidden");
    }
};

/* when user click the arrow left button that section
   should be disappeared and section admin info be
   displayed to user
*/
let returnToUserInfoSection = () => {
    sections[0].classList.remove("hidden");
    changeInfoSection.classList.add("hidden");
    returnBtnMobile.classList.add("hidden");
};

/* when user click on 'خروج' button an alert should
   should be displayed to warn user that you are
   loging out from panel
*/
let exitFromPanel = () => {
    // using sweetalert2 for create a beautiful alert
    Swal.fire({
        title: "خروج",
        text: "آیا برای خارج شدن از پنل کاربری مطمئن هستید؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        /* if user click on 'بله' button page redirect 
           to index.html page and if user click cancel
           user remains on that page 
        */
        if (result.isConfirmed) {
            window.location.href = "../../index.html";
        }
    });
};

/* when user click on 'حذف حساب کاربری' button an alert
   should be displayed to warn user that you are deleting
   your account permanently 
*/
let deleteAccount = () => {
    // using sweetalert2 for create a beautiful alert
    Swal.fire({
        title: "اخطار",
        text: "آیا از حذف حساب کاربری خود مطمئن هستید؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        /* if user click on 'بله' button another alert
           will be displayed to user
        */
        if (result.isConfirmed) {
            Swal.fire({
                title: "خروج",
                text: "یک درخواست به ایمیل شما ارسال شده است،روی لینک مربوطه کلیک کنید تا فرایند حذف آغاز شود!",
                icon: "success",
                confirmButtonText: "باشه",
                confirmButtonColor: "#66bb6a",
            });
        }
    });
};

let formValidationFromUserInfo = () => {
    // using sweetalert2 for create a beautiful alert
    Swal.fire({
        title: "هشدار",
        text: "آیا از صحت اطلاعات مطمئن هستید؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        /* if user click 'بله' button then we should validate
           form and if user click on 'خیر' we should ignore it
        */
        if (result.isConfirmed) {
            console.log("form validation");
        } else {
            console.log("just ignore it");
        }
    });
};

// edit category item' content
let editCategoryItemFunc = (label) => {
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
            !label.nextElementSibling.nextElementSibling.getAttribute(
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
            }
        });
    });
};

// add category item
let addCategoryItemFunc = () => {
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

                // create new category item
                let divParent = document.createElement("div");
                divParent.className = "grid grid-rows-2 text-center group";
                let divFirstChild = document.createElement("div");
                divFirstChild.className =
                    "flex items-center text-xs md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300";
                let i = document.createElement("i");
                i.className = "fa-solid fa-gear py-1 px-2 opacity-0";
                let span1 = document.createElement("span");
                span1.className =
                    "px-1 py-1 w-1/6 rounded-r bg-primary bg-opacity-50";
                span1.innerHTML = " ایدی ";
                let span2 = document.createElement("span");
                span2.className = "px-1 py-1 w-3/6 bg-primary bg-opacity-50";
                span2.innerHTML = " عنوان ";
                let span3 = document.createElement("span");
                span3.className =
                    "px-1 py-1 w-2/6 rounded-l bg-primary bg-opacity-50";
                span3.innerHTML = " قالب ها ";

                divFirstChild.append(i);
                divFirstChild.append(span1);
                divFirstChild.append(span2);
                divFirstChild.append(span3);
                divParent.append(divFirstChild);

                let secondDivChild = document.createElement("div");
                secondDivChild.className = "flex items-center";
                let label = document.createElement("label");
                label.htmlFor =
                    "category-input" + (categoryItems.children.length + 1);
                let i2 = document.createElement("i");
                i2.className =
                    "fa-solid fa-gear px-1 py-1 text-black ml-1 cursor-pointer transition-all duration-300 hover:text-secondary md:opacity-0 md:group-hover:opacity-100";
                let span4 = document.createElement("span");
                span4.className =
                    "px-1 py-1 bg-secondary bg-opacity-20 w-1/6 text-black rounded-r";
                span4.innerHTML = categoryItems.children.length + 1;
                let inp = document.createElement("input");
                inp.className =
                    "px-1 py-1 w-3/6 text-sm text-center bg-primary outline-none border-none h-97 placeholder:text-white placeholder:focus:opacity-0";
                inp.type = "text";
                inp.placeholder = tempValue;
                inp.value = tempValue;
                inp.id = "category-input" + (categoryItems.children.length + 1);
                inp.setAttribute("disabled", true);
                let span5 = document.createElement("span");
                span5.className =
                    "px-1 py-1 w-2/6 bg-primary rounded-l border-r border-slate-100 border-opacity-50";
                span5.innerHTML = "0";

                label.append(i2);
                secondDivChild.append(label);
                secondDivChild.append(span4);
                secondDivChild.append(inp);
                secondDivChild.append(span5);
                divParent.append(secondDivChild);

                categoryItems.append(divParent);
                // add event listener for every new label separately
                label.addEventListener("click", () => {
                    editCategoryItemFunc(label);
                });
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
};

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

let deleteCategoryItemFunc = () => {
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

        Array.from(categoryItems.children).forEach((item) => {
            item.classList.add("cursor-pointer");
            item.addEventListener("click", removeCategoryItem);
        });
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
        Array.from(categoryItems.children).forEach((item) => {
            item.removeEventListener("click", removeCategoryItem);
            item.classList.remove("cursor-pointer");
        });
    });
};
let createAccordion = (item, accordion) => {
    item.classList.toggle("active");
    if (item.classList.contains("active")) {
        item.children[0].classList.add("bg-blue-500");
        item.children[0].children[1].classList.add("rotate-180");
        item.children[1].style.maxHeight =
            item.children[1].scrollHeight + 16 + "px";
        item.children[1].style.padding = "8px";
        item.children[1].classList.remove("max-h-0");
    } else {
        item.children[0].classList.remove("bg-blue-500");
        item.children[0].children[1].classList.remove("rotate-180");
        item.children[1].style.maxHeight = null;
        item.children[1].style.padding = null;
        item.children[1].classList.add("max-h-0");
    }

    accordion.querySelectorAll(".active").forEach((activeItem) => {
        if (activeItem.children[0] != item.children[0]) {
            activeItem.classList.remove("active");
            activeItem.children[0].classList.remove("bg-blue-500");
            activeItem.children[0].children[1].classList.remove("rotate-180");
            activeItem.children[1].style.maxHeight = null;
            activeItem.children[1].style.padding = null;
            activeItem.children[1].classList.add("max-h-0");
        }
    });
};

let deleteAccordionItemButton = () => {
    // 'افزودن' button shouldn be disappeared
    faqBtn.children[1].classList.add("hidden");
    // 'انصراف' button should be displayed
    faqBtn.children[2].classList.remove("hidden");
    faqBtn.children[0].classList.add("text-slate-100");
    faqBtn.children[0].classList.remove("bg-opacity-20");
    redCirclesDelete.classList.remove("hidden");

    // disable all active accordion item
    Array.from(accordion.children).forEach((item) => {
        if (item.classList.contains("active")) {
            item.children[0].classList.remove("bg-blue-500");
            item.children[0].children[1].classList.remove("rotate-180");
            item.children[1].style.maxHeight = null;
            item.children[1].style.padding = null;
            item.children[1].classList.add("max-h-0");
        }
    });
};

let CancelDeletingAccordionItem = () => {
    faqBtn.children[0].classList.remove("text-slate-100");
    faqBtn.children[0].classList.add("bg-opacity-20");
    faqBtn.children[1].classList.remove("hidden");
    faqBtn.children[2].classList.add("hidden");
    redCirclesDelete.classList.add("hidden");
};

let deleteAccordionItems = (e) => {
    let redCircle = e.target;

    Swal.fire({
        title: "حذف",
        text: "آیا از حذف این اکوردیون مطمئن هستید؟ ",
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
            let tempIndex = parseInt(redCircle.innerHTML);
            /* first and last accordion item has some special class 
                   that we should add them when delete an item from first 
                   or end
                */
            if (tempIndex == 0 && accordion.children.length != 1) {
                // we check if user deletes first accordion item
                accordion.children[1].classList.add("rounded-t-sm");
            } else if (
                tempIndex == accordion.children.length - 1 &&
                accordion.children.length != 1
            ) {
                // we check if user deletes last accodion item
                accordion.children[accordion.children.length - 2].classList.add(
                    "rounded-b-sm"
                );
            }

            accordion.children[tempIndex].remove();
            redCircle.remove();
            /* we should update index of redCircle item 
                   when we deleted an acccordion item
                */
            Array.from(redCirclesDelete.children).forEach((circle, index) => {
                circle.innerHTML = index;
            });
        }
    });
};

let addAccordionItem = () => {
    Swal.fire({
        title: "افزودن یک اکوردیون جدید",
        input: "textarea",
        inputPlaceholder: "یک عنوان برای اکوردیون بنویسید",
        confirmButtonColor: "#66bb6a",
        confirmButtonText: "تایید",
        showCancelButton: true,
        cancelButtonText: "انصراف",
        cancelButtonColor: "#d33",
    }).then((result1) => {
        if (result1.isConfirmed) {
            Swal.fire({
                title: "افزودن یک اکوردیون جدید",
                input: "textarea",
                inputPlaceholder: "متن بدنه اکوردیون را وارد کنید",
                confirmButtonColor: "#66bb6a",
                confirmButtonText: "تایید",
                showCancelButton: true,
                cancelButtonText: "انصراف",
                cancelButtonColor: "#d33",
            }).then((result2) => {
                if (result2.isConfirmed) {
                    let title = result1.value;
                    let text = result2.value;
                    // add accordion item
                    let divParent = document.createElement("div");
                    divParent.className =
                        "overflow-hidden rounded-b-sm text-white";
                    let div1 = document.createElement("div");
                    div1.className =
                        "bg-primary cursor-pointer p-2 transition-all linear duration-300 hover:bg-blue-500 flex justify-between items-center";
                    let h2 = document.createElement("h2");
                    h2.className = "test-sm";
                    h2.innerHTML = title;
                    let i = document.createElement("i");
                    i.className = "fa-solid fa-arrow-up text-xs transition-all";
                    let p = document.createElement("p");
                    p.className =
                        "text-black text-xs transition-all linear duration-300 m-0 max-h-0 border-x border-x-gray-200 border-b border-b-gray-200";
                    p.innerHTML = text;

                    accordion.children[
                        accordion.children.length - 1
                    ].classList.remove("rounded-b-sm");
                    div1.append(h2);
                    div1.append(i);
                    divParent.append(div1);
                    divParent.append(p);
                    divParent.addEventListener("click", () =>
                        createAccordion(divParent, accordion)
                    );
                    accordion.append(divParent);

                    // Equivalent span tag
                    let span = document.createElement("span");
                    span.className = "rounded-full bg-red-600 text-white p-1";
                    span.innerHTML = accordion.children.length - 1;
                    span.addEventListener("click", deleteAccordionItems);

                    redCirclesDelete.append(span);
                }
            });
        }
    });
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
    let inputValue = e.target.value;
    /* if input value is empty this is default look
       and all table item should be displayed to user
    */
    if (inputValue == "") {
        usersListTableContent.forEach((tableItem) =>
            tableItem.classList.remove("hidden")
        );
    } else if (
        userName.indexOf(inputValue) != -1 ||
        userLastName.indexOf(inputValue) != -1
    ) {
        usersListTableContent.forEach((tableItem) => {
            if (
                tableItem.children[0].innerHTML.trim() == inputValue ||
                tableItem.children[1].innerHTML.trim() == inputValue
            ) {
                tableItem.classList.remove("hidden");
            }
        });
    } else {
        /* other table item should not be dispplayed
           while user searchs for a special one
        */
        usersListTableContent.forEach((tableItem) =>
            tableItem.classList.add("hidden")
        );
    }
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

hamburgerMenu.addEventListener("click", showPanelMobile);
closeArrowBtn.addEventListener("click", closePanelMobile);
handleDisplayOfSections();
changeInfoBtn.addEventListener("click", showDetailsInfoSection);
// first children => arrow left button for return to user info section
changeInfoSection.children[0].addEventListener(
    "click",
    returnToUserInfoSection
);
returnBtnMobile.addEventListener("click", returnToUserInfoSection);
exitBtn.addEventListener("click", exitFromPanel);
exitBtnMobile.addEventListener("click", exitFromPanel);
deleteAccountBtn.addEventListener("click", deleteAccount);
changeInfoSection
    .querySelector("form")
    .addEventListener("submit", formValidationFromUserInfo);

// category section
// event listener for add button in category section
adCategoryBtn.children[0].addEventListener("click", addCategoryItemFunc);
// event listener for edit button in category section on every category item
categoryItems.querySelectorAll("label").forEach((label) =>
    label.addEventListener("click", () => {
        editCategoryItemFunc(label);
    })
);
// event listener for delete button in category section
adCategoryBtn.children[1].addEventListener("click", deleteCategoryItemFunc);
// end category section

// FAQ section
Array.from(accordion.children).forEach((item) => {
    item.addEventListener("click", () => createAccordion(item, accordion));
});

// 'حذف' button in FAQ section
faqBtn.children[0].addEventListener("click", deleteAccordionItemButton);

// 'انصراف' button in FAQ section
faqBtn.children[2].addEventListener("click", CancelDeletingAccordionItem);

// delete accordion items
Array.from(redCirclesDelete.children).forEach((redCircle) => {
    redCircle.addEventListener("click", deleteAccordionItems);
});

// 'افزودن' button in FAQ section
faqBtn.children[1].addEventListener("click", addAccordionItem);

// end FAQ section

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
