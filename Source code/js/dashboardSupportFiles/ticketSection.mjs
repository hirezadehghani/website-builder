let filterTicket = document.querySelector("#filterTicket");
let ticketButtons = document.querySelectorAll("#ticketDeleteButtons > div");
let ticketListContent = document.querySelectorAll("#ticketListContent > div");

function deleteTicketItem(e) {
    let tableItem = e.target.parentElement;
    /* if user clicks on status of ticket then
       parent is different and should get it
    */
    if (tableItem.classList.contains("table-cell")) {
        tableItem = tableItem.parentElement;
    }

    Swal.fire({
        title: "حذف",
        text: " آیا از حذف این تیکت از لیست تیکت ها مطمئن هستید؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            tableItem.remove();
        }
    });
}

function showBaseOnStatus(tableItem, value) {
    if (value == "openStatus") {
        // if ticket is open
        if (tableItem.children[3].getAttribute("data-open")) {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    } else {
        // if ticket is closed
        if (!tableItem.children[3].getAttribute("data-open")) {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    }
}

function filterTicketsItem(e) {
    let option = e.target.value;
    if (option == "...") {
        ticketListContent.forEach((tableItem) => {
            tableItem.classList.remove("hidden");
        });
    } else if (option == "openStatus" || option == "closeStatus") {
        ticketListContent.forEach((tableItem) => {
            showBaseOnStatus(tableItem, option);
        });
    }
}

// حذف button
ticketButtons[0].addEventListener("click", () => {
    ticketButtons[0].classList.remove("bg-opacity-20");
    ticketButtons[0].classList.add("text-slate-100");
    ticketButtons[1].classList.remove("hidden");

    ticketListContent.forEach((tableItem) => {
        tableItem.addEventListener("click", deleteTicketItem);
    });
});

// انصراف button
ticketButtons[1].addEventListener("click", () => {
    ticketButtons[0].classList.add("bg-opacity-20");
    ticketButtons[0].classList.remove("text-slate-100");
    ticketButtons[1].classList.add("hidden");

    ticketListContent.forEach((tableItem) => {
        tableItem.removeEventListener("click", deleteTicketItem);
    });
});

// filter ticket
filterTicket.addEventListener("change", filterTicketsItem);
