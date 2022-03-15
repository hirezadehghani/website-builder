let changeInfoSection = document.querySelector("#changeInfoSection");

// validate form for editing admin info
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

changeInfoSection
    .querySelector("form")
    .addEventListener("submit", formValidationFromUserInfo);
