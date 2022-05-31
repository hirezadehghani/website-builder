let filterTicket = document.querySelector("#filterTicket");
let ticketButtons = document.querySelectorAll("#ticketDeleteButtons > div");
let ticketListContent = document.querySelectorAll("#ticketListContent > div");
let sections = document.querySelectorAll(".sections > div");
let returnToTicketButton = document.querySelector("#returnToTicketSection");

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
        if (tableItem.children[3].hasAttribute("data-open")) {
            tableItem.classList.remove("hidden");
        } else {
            tableItem.classList.add("hidden");
        }
    } else {
        // if ticket is closed
        if (!tableItem.children[3].hasAttribute("data-open")) {
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

function showTicketDetails(e) {
    let tableItem = e.target.parentElement;
    /* if user clicks on status of ticket then
       parent is different and should get it
    */
    if (tableItem.classList.contains("table-cell")) {
        tableItem = tableItem.parentElement;
    }

    // get full ticket's info from backend and show to user

    sections[1].classList.add("hidden");
    sections[2].classList.remove("hidden");
    let panel = document.querySelector("#panel");
    panel.querySelectorAll("div > ul li.bg-secondary").forEach((list) => {
        list.classList.remove("bg-secondary");
    });
}

function returnToTicketSection() {
    sections[1].classList.remove("hidden");
    sections[2].classList.add("hidden");
    let panelListTag = document.querySelectorAll("#panel div > ul li");
    panelListTag[3].classList.add("bg-secondary");
}

// حذف button
ticketButtons[0].addEventListener("click", () => {
    ticketButtons[0].classList.remove("bg-opacity-20");
    ticketButtons[0].classList.add("text-slate-100");
    ticketButtons[1].classList.remove("hidden");

    ticketListContent.forEach((tableItem) => {
        tableItem.addEventListener("click", deleteTicketItem);
        tableItem.removeEventListener("click", showTicketDetails);
    });
});

// انصراف button
ticketButtons[1].addEventListener("click", () => {
    ticketButtons[0].classList.add("bg-opacity-20");
    ticketButtons[0].classList.remove("text-slate-100");
    ticketButtons[1].classList.add("hidden");

    ticketListContent.forEach((tableItem) => {
        tableItem.removeEventListener("click", deleteTicketItem);
        tableItem.addEventListener("click", showTicketDetails);
    });
});

// filter ticket
filterTicket.addEventListener("change", filterTicketsItem);

ticketListContent.forEach((tableItem) => {
    tableItem.addEventListener("click", showTicketDetails);
});

returnToTicketButton.addEventListener("click", returnToTicketSection);
