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
let showSpecialSection = () => {

    let panelListTag = panel.querySelectorAll("div > ul li")
    panelListTag[2].classList.add("bg-secondary");
    sections[0].classList.remove("hidden");
    /* we start this loop from item 3 (i=2) because first two
       item have no special function and be displayed just for
       more info to user
    */
    for (let i = 2; i < panelListTag.length; i++) {

        panelListTag[i].addEventListener("click", () => {
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
            /* if user first click on ' تغییر جزئیات ' and then click on
               other li tag this section should be disappeared and also
               return button mobile should be disappeared
            */
            changeInfoSection.classList.add("hidden");
            returnBtnMobile.classList.add("hidden");
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

let editCategoryItems = () => {
    let inputCategory = label.nextElementSibling.nextElementSibling;
    let temporaryValue = inputCategory.value;

    /* if condition uses for preventing user from clicking on other
       category item when
       the user is already editing an item
    */
    if (editCategoryBtn.children[0].classList.contains("hidden")) {
        label.nextElementSibling.nextElementSibling.removeAttribute("disabled");
        editCategoryBtn.children[0].classList.remove("hidden"); // 'تایید' button
        editCategoryBtn.children[1].classList.remove("hidden"); // 'منصرف شدن' button
        inputCategory.value = "";
    }

    /* if user click on 'منصرف شدن' then two button should be
       disappeared
    */
    editCategoryBtn.children[1].addEventListener("click", () => {
        label.nextElementSibling.nextElementSibling.setAttribute("disabled", true); // input element
        editCategoryBtn.children[0].classList.add("hidden");
        editCategoryBtn.children[1].classList.add("hidden");
        // return the default input value
        inputCategory.value = temporaryValue;
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
                // save this value in Database
            }
        });
    });
};

hamburgerMenu.addEventListener("click", showPanelMobile);
closeArrowBtn.addEventListener("click", closePanelMobile);
showSpecialSection();
changeInfoBtn.addEventListener("click", showDetailsInfoSection);
// first children => arrow left button for return to user info section
changeInfoSection.children[0].addEventListener("click", returnToUserInfoSection);
returnBtnMobile.addEventListener("click", returnToUserInfoSection);
exitBtn.addEventListener("click", exitFromPanel);
exitBtnMobile.addEventListener("click", exitFromPanel);
deleteAccountBtn.addEventListener("click", deleteAccount);
changeInfoSection.querySelector("form").addEventListener("submit", formValidationFromUserInfo);

categoryItems.querySelectorAll("label").forEach(label => label.addEventListener("click", editCategoryItems));