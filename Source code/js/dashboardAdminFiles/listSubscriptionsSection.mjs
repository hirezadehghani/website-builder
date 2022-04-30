let buttons = document.querySelectorAll("#subscriptionsbuttons > div");
let subscriptionItem = document.querySelectorAll("#subscriptionItems > div");

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

// انصراف button
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
