let form = document.querySelector("#templateCreationFrom");

function validateForm(e) {
    e.preventDefault();
    if (
        validatetemplateName() &&
        validatetemplateVersion() &&
        validateExplanation() &&
        validateTemplatePhoto() &&
        validatetemplateSourceCode()
    ) {
        // send new information to server
    } else {
        e.preventDefault();
    }
}

function validatetemplateName() {
    let templateName = form.templateName;
    let regexForTemplateName =
        /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]{2,}[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]*)+$/;
    if (regexForTemplateName.test(templateName.value)) {
        templateName.classList.remove("input-incorrect");
        return true;
    } else {
        templateName.classList.add("input-incorrect");
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
        if (num[i] === ".") {
            result += ".";
            continue;
        }
        result += persianNumber[num[i]];
    }
    return result;
}

function validatetemplateVersion() {
    let version = form.templateVersion;
    let tempValue = version.value;
    let regexForVersion = /^\d{1,3}\.\d{1,3}$/;

    let persianNumberRegex = /^[\u06F0-\u06F9]{1,3}\.[\u06F0-\u06F9]{1,3}$/;

    if (persianNumberRegex.test(version.value)) {
        tempValue = convertPersianNumbersToEnglish(version.value);
    }

    if (regexForVersion.test(tempValue)) {
        version.classList.remove("input-incorrect");
        return true;
    } else {
        version.classList.add("input-incorrect");
        return false;
    }
}

function validateExplanation() {
    let explanation = form.templateExplanation;
    let regexForExplanation =
        /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]{2,}[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]*)+$/;

    if (regexForExplanation.test(explanation.value)) {
        explanation.classList.remove("input-incorrect");
        return true;
    } else {
        explanation.classList.add("input-incorrect");
        return false;
    }
}

function validateTemplatePhoto() {
    let templatePhoto = form.templatePhoto;
    let label = templatePhoto.parentElement.children[0];

    if (templatePhoto === "") {
        label.innerHTML = "آپلود عکس جدید (jpeg,jpg,png)";
        // previous photo remains in template's photo
        // templatePhoto = user_profile.png
    } else {
        // check if selected file is from desired format
        let regexForTemplatePhoto =
            /([^\\]+\.png)|([^\\]+\.jpeg)|([^\\]+\.jpg)/;
        if (regexForTemplatePhoto.test(templatePhoto.value)) {
            label.innerHTML = regexForTemplatePhoto.exec(
                templatePhoto.value
            )[0];
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

function validatetemplateSourceCode() {
    let templateCode = form.templateCode;
    let label = templateCode.parentElement.children[0];

    if (templateCode === "") {
        label.innerHTML = " آپلود کد قالب ";
    } else {
        // check if selected file is from desired format
        let regexForTemplateCode = /([^\\]+\.zip)|([^\\]+\.rar)|([^\\]+\.7zip)/;
        if (regexForTemplateCode.test(templateCode.value)) {
            label.innerHTML = regexForTemplateCode.exec(templateCode.value)[0];
        } else {
            label.innerHTML = " آپلود کد قالب ";
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

// when form submits
form.addEventListener("submit", validateForm);

// when template's name input changes
form.templateName.addEventListener("keyup", validatetemplateName);

// when template's version input changes
form.templateVersion.addEventListener("keyup", validatetemplateVersion);

// when template's explanation input changes
form.templateExplanation.addEventListener("keyup", validateExplanation);

// when template's photo was uploaded
form.templatePhoto.addEventListener("change", validateTemplatePhoto);

// when template's source code was uploaded
form.templateCode.addEventListener("change", validatetemplateSourceCode);
