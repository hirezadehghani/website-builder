let deleteAccountBtn = document.querySelector("#deleteAccountButton");
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

// add event listener for deleteing account button
deleteAccountBtn.addEventListener("click", deleteAccount);
