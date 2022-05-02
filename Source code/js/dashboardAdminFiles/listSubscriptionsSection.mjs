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

function validateTitleSubscription(e) {
    let input = e.target;
    let regexForTitle =
        /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]+[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC])+$/;
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
        /^([\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC]+[ ]{0,}[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9-\u06AF\u06BE\u06CC])+$/;
    if (regexForContent.test(input.value)) {
        input.classList.remove("input-incorrect");
        return true;
    } else {
        input.classList.add("input-incorrect");
        return false;
    }
}

function validatePrice(e) {
    let input = e.target;

    if (input.value.length >= 2 && input.value >= 0) {
        input.classList.remove("input-incorrect");
        return true;
    } else {
        input.classList.add("input-incorrect");
        return false;
    }
}

function validateDiscount(e) {
    let input = e.target;
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
    div.append(p);
    div.append(i);
    contentItems.append(div);
}

function addContentItem() {
    // validate content and if yes button was clicked
    console.log(addItemForm.subscriptionContent);
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

// حذف button
buttons[0].addEventListener("click", () => {
    buttons[0].classList.remove("bg-opacity-20");
    buttons[0].classList.add("text-slate-100");
    buttons[1].classList.add("hidden");
    buttons[2].classList.remove("hidden");

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
    subscriptionItem = document.querySelectorAll("#subscriptionItems > div");

    if (subscriptionItem.length !== 3) {
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

// حذف button
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
addItemForm.addEventListener("submit", () => {});
