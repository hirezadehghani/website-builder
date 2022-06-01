let buttons = document.querySelectorAll("#subscriptionsbuttons > div");
let subscriptionItem = document.querySelectorAll("#subscriptionItems > div");
let addSubscriptionSection = document.querySelector("#addSubscriptionSection");
let addItemForm = addSubscriptionSection.querySelector("form");
let addsubscriptionItemButton = document.querySelector(
    "#addsubscriptionItemButton"
);
let contentItems = document.querySelector("#contentItems");

function deleteSubscriptionItem(e) {
    let item = e.target;

    // with this we find correct parent
    while (true) {
        if (item.classList.contains("hover:shadow-xl")) {
            break;
        }
        item = item.parentElement;
    }
    // warn user about deleteing item
    Swal.fire({
        title: "حذف",
        text: " آیا از حذف این اشتراک مطمئن هستید؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            item.remove();
        }
    });
}

function validateTitleSubscription() {
    let input = addItemForm.subscriptionTitle;
    let regexForTitle =
        /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]{1,}[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]*)+$/;
    if (regexForTitle.test(input.value)) {
        input.classList.remove("input-incorrect");
        return true;
    } else {
        input.classList.add("input-incorrect");
        return false;
    }
}

function validateContentSubscription() {
    let input = addItemForm.subscriptionContent;
    let regexForContent =
        /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]{1,}[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]*)+$/;
    if (regexForContent.test(input.value)) {
        input.classList.remove("input-incorrect");
        return true;
    } else {
        input.classList.add("input-incorrect");
        return false;
    }
}

function validatePrice() {
    let input = addItemForm.subscriptionPrice;

    if (input.value.length >= 2 && input.value >= 0) {
        input.classList.remove("input-incorrect");
        return true;
    } else {
        input.classList.add("input-incorrect");
        return false;
    }
}

function validateDiscount() {
    let input = addItemForm.subscriptionDiscount;

    if (
        input.value >= 0 &&
        (input.value.length === 2 || input.value.length === 1)
    ) {
        input.classList.remove("input-incorrect");
        return true;
    } else {
        input.classList.add("input-incorrect");
        return false;
    }
}

function addToContentItem(value, choice) {
    let div = document.createElement("div");
    div.className = "flex justify-between my-2";
    let p = document.createElement("p");
    p.innerHTML = value;
    let i = document.createElement("i");
    if (choice === "green") {
        i.className = "fa-solid fa-check text-green-600 text-sm lg:text-2xl";
    } else {
        i.className = "fa-solid fa-xmark text-red-600 text-sm lg:text-2xl";
    }
    div.append(p, i);
    contentItems.append(div);
}

function addContentItem() {
    // validate content and if yes button was clicked
    if (validateContentSubscription() && addItemForm.hasFeature[0].checked) {
        addToContentItem(addItemForm.subscriptionContent.value, "green");
    } else if (
        validateContentSubscription() &&
        addItemForm.hasFeature[1].checked
    ) {
        // validate content and if no button was clicked
        addToContentItem(addItemForm.subscriptionContent.value, "red");
    }
}

function createSubscription() {
    let sign;
    // determine sign base on user selection
    addItemForm.subscriptionType.forEach((type) => {
        if (type.checked) {
            sign = type.value;
        }
    });

    // create required element
    let div1 = document.createElement("div");
    let i1 = document.createElement("i");
    let h1 = document.createElement("h3");
    if (sign === "silver") {
        i1.className =
            "fa-solid fa-dollar-sign text-slate-500 text-3xl lg:text-5xl";
    } else if (sign === "gold") {
        i1.className =
            "fa-solid fa-dollar-sign text-yellow-500 text-3xl lg:text-5xl";
    } else {
        i1.className =
            "fa-solid fa-dollar-sign text-emerald-700 text-3xl lg:text-5xl";
    }
    div1.className = "flex flex-col items-center";
    h1.className = "font-bold text-center mt-2";
    h1.innerHTML = addItemForm.subscriptionTitle.value;
    div1.append(i1, h1);

    let div2 = document.createElement("div");
    div2.className = "p-1 my-4";

    let tempChild = [...contentItems.children];
    for (let feature of tempChild) {
        div2.append(feature);
    }

    let div3 = document.createElement("div");
    div3.className = "flex justify-between items-center p-2";
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    let span4 = document.createElement("span");
    span2.className =
        "text-xs sm:text-sm bg-red-600 text-slate-100 px-3 py-1 rounded-full";
    span2.innerHTML = addItemForm.subscriptionDiscount.value + "%";
    span3.className = "text-xs sm:text-sm line-through opacity-50 ml-3";
    span3.innerHTML = addItemForm.subscriptionPrice.value;
    span4.className = "text-base xl:text-lg font-bold";
    span4.innerHTML = `${
        addItemForm.subscriptionPrice.value -
        (addItemForm.subscriptionPrice.value *
            addItemForm.subscriptionDiscount.value) /
            100
    } تومان`;
    span1.append(span2, span3);
    div3.append(span1, span4);

    let btn = document.createElement("button");
    btn.className =
        "border border-secondary text-secondary hover:text-slate-100 hover:bg-secondary transition ease-in duration-300 py-2 px-6 rounded-md mx-auto mt-3";
    btn.innerHTML = " خرید ";

    let mainDiv = document.createElement("div");
    mainDiv.className =
        "flex flex-col hover:-translate-y-2 transition-all ease-out duration-300 border border-gray-200 rounded-sm p-1 lg:p-3 hover:shadow-xl text-sm";
    mainDiv.append(div1, div2, div3, btn);

    let parentOfSubscriptionItems =
        document.querySelector("#subscriptionItems");
    parentOfSubscriptionItems.append(mainDiv);
}

function CanAddItem() {
    subscriptionItem = document.querySelectorAll("#subscriptionItems > div");
    if (subscriptionItem.length !== 3) {
        return true;
    } else {
        return false;
    }
}

function validateForm(e) {
    e.preventDefault();

    if (!CanAddItem()) {
        Swal.fire({
            title: "هشدار",
            text: " تعداد اشتراک ها می تواند حداکثر ۳ عدد باشد. ",
            icon: "warning",
            confirmButtonText: "باشه",
            confirmButtonColor: "#66bb6a",
        });
    } else {
        if (
            validateTitleSubscription() &&
            validatePrice() &&
            validateDiscount()
        ) {
            createSubscription();
        }
    }
}

// حذف button
buttons[0].addEventListener("click", () => {
    buttons[0].classList.remove("bg-opacity-20");
    buttons[0].classList.add("text-slate-100");
    buttons[1].classList.add("hidden");
    buttons[2].classList.remove("hidden");

    subscriptionItem = document.querySelectorAll("#subscriptionItems > div");
    subscriptionItem.forEach((item) => {
        item.classList.add("cursor-pointer");
        item.addEventListener("click", deleteSubscriptionItem);
    });
});

// انصراف from deleting
buttons[2].addEventListener("click", () => {
    buttons[0].classList.add("bg-opacity-20");
    buttons[0].classList.remove("text-slate-100");
    buttons[1].classList.remove("hidden");
    buttons[2].classList.add("hidden");
    subscriptionItem.forEach((item) => {
        item.classList.remove("cursor-pointer");
        item.removeEventListener("click", deleteSubscriptionItem);
    });
});

// افزودن button
buttons[1].addEventListener("click", () => {
    // update items if one of them was deleted

    if (CanAddItem()) {
        buttons[1].classList.remove("bg-opacity-20");
        buttons[1].classList.add("text-slate-100");
        buttons[0].classList.add("hidden");
        buttons[3].classList.remove("hidden");
        subscriptionItem[0].parentElement.classList.add("hidden");
        addSubscriptionSection.classList.remove("hidden");
    } else {
        Swal.fire({
            title: "هشدار",
            text: " تعداد اشتراک ها می تواند حداکثر ۳ عدد باشد. ",
            icon: "warning",
            confirmButtonText: "باشه",
            confirmButtonColor: "#66bb6a",
        });
    }
});

// انصراف button
buttons[3].addEventListener("click", () => {
    buttons[1].classList.add("bg-opacity-20");
    buttons[1].classList.remove("text-slate-100");
    buttons[0].classList.remove("hidden");
    buttons[3].classList.add("hidden");
    subscriptionItem[0].parentElement.classList.remove("hidden");
    addSubscriptionSection.classList.add("hidden");
});

// validate title of subscription
addItemForm.subscriptionTitle.addEventListener(
    "input",
    validateTitleSubscription
);

// validate content of subscription
addItemForm.subscriptionContent.addEventListener(
    "input",
    validateContentSubscription
);

// validate price
addItemForm.subscriptionPrice.addEventListener("input", validatePrice);

// validate discount
addItemForm.subscriptionDiscount.addEventListener("input", validateDiscount);

// add subscription content items
addsubscriptionItemButton.addEventListener("click", addContentItem);

// when form submits
addItemForm.addEventListener("submit", validateForm);
