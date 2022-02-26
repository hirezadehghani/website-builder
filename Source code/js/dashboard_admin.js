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

let categoryItems = document.querySelector("#categoryItems");
let editCategoryBtn = document.querySelector("#editCategoryButton");
let adCategoryBtn = document.querySelector("#addDeleteCategoryButtons")

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
}

/* when click on one item of panel, that item should get
   background-color secondary and related information to
   that section will display and other section should be
   disappeared
*/
let handleDisplayOfSections = () => {

    let panelListTag = panel.querySelectorAll("div > ul li")
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
               section is happening or not
            */
            if ((!sections[4].classList.contains("hidden")) && (!(
                    adCategoryBtn.children[0].classList.contains("hidden") == false && adCategoryBtn.children[1].classList.contains("hidden") == false &&
                    editCategoryBtn.children[0].classList.contains("hidden") && editCategoryBtn.children[1].classList.contains("hidden") && editCategoryBtn.children[2].classList.contains("hidden")
                ))) {

                Swal.fire({
                    title: 'اخطار',
                    text: 'شما در حال حاضر در حال انجام یک فرایند دیگر هستید!',
                    icon: 'warning',
                    confirmButtonText: 'باشه',
                    confirmButtonColor: '#66bb6a'
                })

            } else {

                /* if user first click on ' تغییر جزئیات ' and then click on
                   other li tag this section should be disappeared and also
                   return button mobile should be disappeared
                */
                changeInfoSection.classList.add("hidden");
                returnBtnMobile.classList.add("hidden");

                // remove background color secondary class for other item
                panel.querySelectorAll("div > ul li.bg-secondary").forEach((list) => {
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
        title: 'خروج',
        text: 'آیا برای خارج شدن از پنل کاربری مطمئن هستید؟ ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        confirmButtonColor: '#66bb6a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'خیر',
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
        title: 'اخطار',
        text: 'آیا از حذف حساب کاربری خود مطمئن هستید؟ ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        confirmButtonColor: '#66bb6a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'خیر',
        reverseButtons: true,
    }).then((result) => {
        /* if user click on 'بله' button another alert
           will be displayed to user
        */
        if (result.isConfirmed) {
            Swal.fire({
                title: 'خروج',
                text: 'یک درخواست به ایمیل شما ارسال شده است،روی لینک مربوطه کلیک کنید تا فرایند حذف آغاز شود!',
                icon: 'success',
                confirmButtonText: 'باشه',
                confirmButtonColor: '#66bb6a'
            })
        }
    });
};

let formValidationFromUserInfo = () => {
    // using sweetalert2 for create a beautiful alert
    Swal.fire({
        title: 'هشدار',
        text: 'آیا از صحت اطلاعات مطمئن هستید؟ ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        confirmButtonColor: '#66bb6a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'خیر',
        reverseButtons: true,
    }).then((result) => {
        /* if user click 'بله' button then we should validate
           form and if user click on 'خیر' we should ignore it
        */
        if (result.isConfirmed) {
            console.log('form validation');
        } else {
            console.log('just ignore it');
        }
    })
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
        if (!label.nextElementSibling.nextElementSibling.getAttribute("disabled")) {
            label.nextElementSibling.nextElementSibling.setAttribute("disabled", true); // input element
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
            title: 'تایید',
            text: 'آیا از صحت اطلاعات مطمئن هستید؟ ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله',
            confirmButtonColor: '#66bb6a',
            cancelButtonColor: '#d33',
            cancelButtonText: 'خیر',
            reverseButtons: true,
        }).then((result) => {
            /* if user click on 'بله' then two button should be
               disappeared and this changes will be applied to
               input
            */
            if (result.isConfirmed) {
                label.nextElementSibling.nextElementSibling.setAttribute("disabled", true); // input element
                editCategoryBtn.children[0].classList.add("hidden");
                editCategoryBtn.children[1].classList.add("hidden");

                inputCategory.defaultValue = inputCategory.value;
                inputCategory.placeholder = inputCategory.value;

                // save this value in Database
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
            title: 'افزودن یک دسته بندی جدید',
            input: 'text',
            inputLabel: 'عنوانی برای دسته بندی جدید وارد کنید',
            inputPlaceholder: ' به عنوان مثال شخصی ',
            confirmButtonColor: '#66bb6a',
            confirmButtonText: 'اضافه کردن',
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            cancelButtonColor: '#d33',
        }).then((result) => {
            /* if user click on 'اضافه کردن' button then the process
               should be happened otherwise ignores it
            */
            if (result.isConfirmed) {
                tempValue = result.value;

                let divParent = document.createElement("div");
                divParent.className = "grid grid-rows-2 text-center group";
                let divFirstChild = document.createElement("div");
                divFirstChild.className = "flex items-center text-xs md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300";
                let i = document.createElement("i");
                i.className = "fa-solid fa-gear py-1 px-2 opacity-0";
                let span1 = document.createElement("span");
                span1.className = "px-1 py-1 w-1/6 rounded-r bg-primary bg-opacity-50";
                span1.innerHTML = " ایدی ";
                let span2 = document.createElement("span");
                span2.className = "px-1 py-1 w-3/6 bg-primary bg-opacity-50";
                span2.innerHTML = " عنوان ";
                let span3 = document.createElement("span");
                span3.className = "px-1 py-1 w-2/6 rounded-l bg-primary bg-opacity-50";
                span3.innerHTML = " قالب ها ";

                divFirstChild.append(i);
                divFirstChild.append(span1);
                divFirstChild.append(span2);
                divFirstChild.append(span3);
                divParent.append(divFirstChild);

                let secondDivChild = document.createElement("div");
                secondDivChild.className = "flex items-center";
                let label = document.createElement("label");
                label.htmlFor = "category-input" + (categoryItems.children.length + 1);
                let i2 = document.createElement("i");
                i2.className = "fa-solid fa-gear px-1 py-1 text-black ml-1 cursor-pointer transition-all duration-300 hover:text-secondary md:opacity-0 md:group-hover:opacity-100";
                let span4 = document.createElement("span");
                span4.className = "px-1 py-1 bg-secondary bg-opacity-20 w-1/6 text-black rounded-r";
                span4.innerHTML = (categoryItems.children.length + 1);
                let inp = document.createElement("input");
                inp.className = "px-1 py-1 w-3/6 text-sm text-center bg-primary outline-none border-none h-97 placeholder:text-white placeholder:focus:opacity-0";
                inp.type = "text";
                inp.placeholder = tempValue;
                inp.value = tempValue;
                inp.id = "category-input" + (categoryItems.children.length + 1);
                inp.setAttribute("disabled", true);
                let span5 = document.createElement("span");
                span5.className = "px-1 py-1 w-2/6 bg-primary rounded-l border-r border-slate-100 border-opacity-50";
                span5.innerHTML = "0";

                label.append(i2);
                secondDivChild.append(label);
                secondDivChild.append(span4);
                secondDivChild.append(inp);
                secondDivChild.append(span5);
                divParent.append(secondDivChild)

                categoryItems.append(divParent);
                // add event listener for this label separately
                label.addEventListener("click", () => {
                    editCategoryItemFunc(label);
                });
            }
        });
    } else {
        Swal.fire({
            title: ' اخطار ',
            text: ' شما در حال ویرایش یک نوع دسته بندی هستید! ',
            icon: 'warning',
            confirmButtonText: 'باشه',
            confirmButtonColor: '#65bb6a'
        })
    }
};

function removeCategoryItem(item) {
    Swal.fire({
        title: 'حذف',
        text: 'آیا از حذف این دسته بندی مطمئن هستید؟ ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        confirmButtonColor: '#66bb6a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'خیر',
        reverseButtons: true,
    }).then((result) => {
        /* if user click on 'بله' button
           that item will be deleted  
        */
        if (result.isConfirmed) {
            // first find its parent and then remove that element
            item.target.parentElement.parentElement.remove();
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
        categoryItems.querySelectorAll("label").forEach(label => {
            label.classList.add("hidden")
            label.nextElementSibling.nextElementSibling.removeAttribute("disabled");
        });

        Array.from(categoryItems.children).forEach(item => {
            item.classList.add("cursor-pointer");
            item.addEventListener("click", removeCategoryItem);
        });
    } else {
        Swal.fire({
            title: ' اخطار ',
            text: ' شما در حال ویرایش یک نوع دسته بندی هستید! ',
            icon: 'warning',
            confirmButtonText: 'باشه',
            confirmButtonColor: '#66bb6a'
        })
    }
    /* when user click on 'انصراف' button the page should be came
       back to its default behavior when user opens it for first 
       time
    */
    editCategoryBtn.children[2].addEventListener("click", () => {
        categoryItems.querySelectorAll("label").forEach(label => {
            label.classList.remove("hidden")
            label.nextElementSibling.nextElementSibling.setAttribute("disabled", true);
        });
        adCategoryBtn.children[0].classList.remove("hidden");
        adCategoryBtn.children[1].classList.add("bg-opacity-20");
        adCategoryBtn.children[1].classList.remove("text-slate-100");
        editCategoryBtn.children[2].classList.add("hidden");
        Array.from(categoryItems.children).forEach(item => {
            item.removeEventListener("click", removeCategoryItem);
            item.classList.remove("cursor-pointer");
        });

    });
};

hamburgerMenu.addEventListener("click", showPanelMobile);
closeArrowBtn.addEventListener("click", closePanelMobile);
handleDisplayOfSections();
changeInfoBtn.addEventListener("click", showDetailsInfoSection);
// first children => arrow left button for return to user info section
changeInfoSection.children[0].addEventListener("click", returnToUserInfoSection);
returnBtnMobile.addEventListener("click", returnToUserInfoSection);
exitBtn.addEventListener("click", exitFromPanel);
exitBtnMobile.addEventListener("click", exitFromPanel);
deleteAccountBtn.addEventListener("click", deleteAccount);
changeInfoSection.querySelector("form").addEventListener("submit", formValidationFromUserInfo);

// event listener for add button in category section
adCategoryBtn.children[0].addEventListener("click", addCategoryItemFunc);
// event listener for edit button in category section on every category item
categoryItems.querySelectorAll("label").forEach(label => label.addEventListener("click", () => {
    editCategoryItemFunc(label);
}));
// event listener for delete button in category section
adCategoryBtn.children[1].addEventListener("click", deleteCategoryItemFunc);


// دکمه کنسل برای فرایند حذف کردن اضافه کنم که بتونه کاربر از فرایند حذف خراج بشه و 
// وقتی یک دسته بندی حذف میشه باید شماره ایدی و برچست بقیه درسته بشه
// و در نهایت باید نتیجه کار در پایگاه داده ذخیره بشه