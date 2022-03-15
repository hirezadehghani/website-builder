let exitBtn = document.querySelector("#exitButton");
let exitBtnMobile = document.querySelector("#exitButtonMobile");
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

exitBtn.addEventListener("click", exitFromPanel);
exitBtnMobile.addEventListener("click", exitFromPanel);
