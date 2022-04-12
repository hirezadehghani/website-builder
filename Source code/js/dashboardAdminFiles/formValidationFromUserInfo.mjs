let changeInfoSection = document.querySelector("#changeInfoSection");
let form = changeInfoSection.querySelector("form");

// validate form for editing admin info
function formValidationFromUserInfo(e) {
    e.preventDefault();
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
}

function firstNameValidation() {
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
}

function lastNameValidation() {
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
}

function userPhotoValidation() {
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
}

// this algorithm is for checking national code of Iran
function checkNationalCodeOfIran(nc) {
    let result = 0;
    let controlDigit;
    for (let i = 0; i < nc.length - 1; i++) {
        result += parseInt(nc[i]) * (nc.length - i);
    }
    let rem = result % 11;
    controlDigit = rem < 2 ? rem : 11 - rem;
    if (controlDigit === parseInt(nc[nc.length - 1])) {
        return true;
    } else {
        return false;
    }
}

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

function nationalCodeValidation() {
    let nationalCode = form.nationalCode;
    let tempValue = nationalCode.value;

    // check for persian digits that has 10 length
    let persianNumberRegex = /^[\u06F0-\u06F9]{10}$/;
    // check for english digits that has 10 length
    let englishNumberRegex = /^\d{10}$/;

    if (persianNumberRegex.test(nationalCode.value)) {
        tempValue = convertPersianNumbersToEnglish(nationalCode.value);
    }
    if (
        englishNumberRegex.test(tempValue) &&
        checkNationalCodeOfIran(tempValue)
    ) {
        nationalCode.classList.remove("input-incorrect");
        return true;
    } else {
        nationalCode.classList.add("input-incorrect");
        return false;
    }
}

function emailValidation() {
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
}

function phoneNumberValidation() {
    let phoneNumber = form.phoneNumber;
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
        persianNumberRegex.test(phoneNumber.value) &&
        regexForPhoneNumber1.test(phoneNumber.value)
    ) {
        phoneNumber.classList.remove("input-incorrect");
        // convertPersianNumbersToEnglish(phoneNumber.value)
        return true;
    } else if (
        englishNumberRegex.test(phoneNumber.value) &&
        regexForPhoneNumber2.test(phoneNumber.value)
    ) {
        phoneNumber.classList.remove("input-incorrect");
        return true;
    } else {
        phoneNumber.classList.add("input-incorrect");
        return false;
    }
}

function passwordValidation() {
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
}

form.firstName.addEventListener("keyup", firstNameValidation);
form.lastName.addEventListener("keyup", lastNameValidation);
form.userPhoto.addEventListener("change", userPhotoValidation);
form.nationalCode.addEventListener("keyup", nationalCodeValidation);
form.mail.addEventListener("keyup", emailValidation);
form.phoneNumber.addEventListener("keyup", phoneNumberValidation);
form.password.addEventListener("keyup", passwordValidation);

form.addEventListener("submit", formValidationFromUserInfo);
