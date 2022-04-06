let changeInfoSection = document.querySelector("#changeInfoSection");
let form = changeInfoSection.querySelector("form");
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

// validate form for editing admin info
let formValidationFromUserInfo = (e) => {
    if (
        firstNameValidation() &&
        lastNameValidation() &&
        userPhotoValidation() &&
        nationalCodeValidation() &&
        emailValidation() &&
        phoneNumberValidation() &&
        passwordValidation()
    ) {
        // send new information to server
    } else {
        e.preventDefault();
    }
};

let firstNameValidation = () => {
    let firstName = form.firstName;
    /* this regex is all standard persian
       letter that contains at least 4 letter
       and no English letter,special character,digits,and so on
    */
    let regexForFirstName = /^[آ-ی]{4,}\s*[آ-ی]*/;

    if (regexForFirstName.test(firstName.value)) {
        firstName.classList.remove("input-incorrect");
        return true;
    } else {
        firstName.classList.add("input-incorrect");
        return false;
    }
};

let lastNameValidation = () => {
    let lastName = form.lastName;

    /* this regex is all standard persian
       letter that contains at least 4 letter
       and no English letter,special character,digits,and so on
    */
    let regexForLastName = /^[آ-ی]{4,}\s*[آ-ی]*/;

    if (regexForLastName.test(lastName.value)) {
        lastName.classList.remove("input-incorrect");
        return true;
    } else {
        lastName.classList.add("input-incorrect");
        return false;
    }
};

let userPhotoValidation = () => {
    let userPhoto = form.userPhoto;
    let label = form.querySelector("div>label");

    if (userPhoto === "") {
        label.innerHTML = "آپلود عکس جدید (jpeg,jpg,png)";
        // previous photo remains in user's photo
        // userPhoto = user_profile.png
    } else {
        // check if selected file is from desired format
        let regexForUserPhoto = /([^\\]+\.png)|([^\\]+\.jpeg)|([^\\]+\.jpg)/;
        if (regexForUserPhoto.test(userPhoto.value)) {
            label.innerHTML = regexForUserPhoto.exec(userPhoto.value)[0];
        } else {
            label.innerHTML = "آپلود عکس جدید (jpeg,jpg,png)";
            Swal.fire({
                title: " اخطار ",
                text: " فایل انتخابی باید دارای فرمت های زیر باشد.\n (png,jpeg,jpg)",
                icon: "warning",
                confirmButtonText: "باشه",
                confirmButtonColor: "#65bb6a",
            });
            return false;
        }
    }
    return true;
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

let nationalCodeValidation = () => {
    let nationalCode = form.nationalCode;
    let nc = "";

    if (isAllpersianNumbers(nationalCode.value)) {
        // convert persian number to English number
        for (let i = 0; i < nationalCode.value.length; i++) {
            nc += persianNumber[nationalCode.value[i]];
        }
        // checks if nationalCode's values are all English numbers
    } else if (parseInt(nationalCode.value)) {
        nc = nationalCode.value;
    } else {
        nationalCode.classList.add("input-incorrect");
        return false;
    }
    // checks if nc's length is 10
    if (nc.length == 10) {
        // this algorithm is for checking national code of Iran
        let res = 0;
        let controlDigit;
        for (let i = 0; i < nc.length - 1; i++) {
            res += parseInt(nc[i]) * (nc.length - i);
        }
        let rem = res % 11;
        controlDigit = rem < 2 ? rem : 11 - rem;
        if (controlDigit === parseInt(nc[nc.length - 1])) {
            nationalCode.classList.remove("input-incorrect");
            return true;
        } else {
            nationalCode.classList.add("input-incorrect");
            return false;
        }
    } else {
        nationalCode.classList.add("input-incorrect");
        return false;
    }
};

let emailValidation = () => {
    let email = form.mail;

    let regexForEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexForEmail.test(email.value)) {
        email.classList.remove("input-incorrect");
        return true;
    } else {
        email.classList.add("input-incorrect");
        return false;
    }
};

let phoneNumberValidation = () => {
    let phoneNumber = form.phoneNumber;
    let pn;
    if (isAllpersianNumbers(phoneNumber.value)) {
        // convert persian number to English number
        for (let i = 0; i < phoneNumber.value.length; i++) {
            pn += persianNumber[phoneNumber.value[i]];
        }
        // checks if phoneNumber's values are all English numbers
    } else if (parseInt(phoneNumber.value)) {
        pn = phoneNumber.value;
    } else {
        phoneNumber.classList.add("input-incorrect");
        return false;
    }

    if (pn.length === 10) {
        // this regex is for all Iran's phone numbers such as Irancell,Hamrahe Aval,Rightel
        let regexForPhoneNumber =
            /^9(0[1-9]|1[0-9]|2[0-2]|3[0-9]|9[0-4]|41)[0-9]{7}$/;
        if (regexForPhoneNumber.test(parseInt(pn))) {
            phoneNumber.classList.remove("input-incorrect");
            return true;
        } else {
            phoneNumber.classList.add("input-incorrect");
            return false;
        }
    } else {
        phoneNumber.classList.add("input-incorrect");
        return false;
    }
};

let passwordValidation = () => {
    let password = form.password;

    /* this checks if password's length is greater and equal 8
       and also below conditions
    */
    let numberRegex = /[0-9]{1,}/; // includes at least one number
    let lowerCaseRegex = /[a-z]{1,}/; // includes at least one lowercase letter
    let upperCaseRegex = /[A-Z]{1,}/; // includes at least one uppercase letter
    if (
        numberRegex.test(password.value) &&
        lowerCaseRegex.test(password.value) &&
        upperCaseRegex.test(password.value) &&
        password.value.length > 8
    ) {
        password.classList.remove("input-incorrect");
        return true;
    } else {
        password.classList.add("input-incorrect");
        return false;
    }
};

form.firstName.addEventListener("keyup", firstNameValidation);
form.lastName.addEventListener("keyup", lastNameValidation);
form.userPhoto.addEventListener("change", userPhotoValidation);
form.nationalCode.addEventListener("keyup", nationalCodeValidation);
form.mail.addEventListener("keyup", emailValidation);
form.phoneNumber.addEventListener("keyup", phoneNumberValidation);
form.password.addEventListener("keyup", passwordValidation);

form.addEventListener("submit", formValidationFromUserInfo);
