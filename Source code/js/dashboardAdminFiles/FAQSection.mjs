let accordion = document.querySelector(".accordion");
let faqBtn = document.querySelector("#faqButton");
let redCirclesDelete = document.querySelector("#redCirclesDelete");

let createAccordion = (item, accordion) => {
    item.classList.toggle("active");
    if (item.classList.contains("active")) {
        item.children[0].classList.add("bg-blue-500");
        item.children[0].children[1].classList.add("rotate-180");
        item.children[1].style.maxHeight =
            item.children[1].scrollHeight + 16 + "px";
        item.children[1].style.padding = "8px";
        item.children[1].classList.remove("max-h-0");
    } else {
        item.children[0].classList.remove("bg-blue-500");
        item.children[0].children[1].classList.remove("rotate-180");
        item.children[1].style.maxHeight = null;
        item.children[1].style.padding = null;
        item.children[1].classList.add("max-h-0");
    }

    accordion.querySelectorAll(".active").forEach((activeItem) => {
        if (activeItem.children[0] != item.children[0]) {
            activeItem.classList.remove("active");
            activeItem.children[0].classList.remove("bg-blue-500");
            activeItem.children[0].children[1].classList.remove("rotate-180");
            activeItem.children[1].style.maxHeight = null;
            activeItem.children[1].style.padding = null;
            activeItem.children[1].classList.add("max-h-0");
        }
    });
};

let deleteAccordionItemButton = () => {
    // 'افزودن' button shouldn be disappeared
    faqBtn.children[1].classList.add("hidden");
    // 'انصراف' button should be displayed
    faqBtn.children[2].classList.remove("hidden");
    faqBtn.children[0].classList.add("text-slate-100");
    faqBtn.children[0].classList.remove("bg-opacity-20");
    redCirclesDelete.classList.remove("hidden");

    // disable all active accordion item
    Array.from(accordion.children).forEach((item) => {
        if (item.classList.contains("active")) {
            item.children[0].classList.remove("bg-blue-500");
            item.children[0].children[1].classList.remove("rotate-180");
            item.children[1].style.maxHeight = null;
            item.children[1].style.padding = null;
            item.children[1].classList.add("max-h-0");
        }
    });
};

let CancelDeletingAccordionItem = () => {
    faqBtn.children[0].classList.remove("text-slate-100");
    faqBtn.children[0].classList.add("bg-opacity-20");
    faqBtn.children[1].classList.remove("hidden");
    faqBtn.children[2].classList.add("hidden");
    redCirclesDelete.classList.add("hidden");
};

let deleteAccordionItems = (e) => {
    let redCircle = e.target;

    Swal.fire({
        title: "حذف",
        text: "آیا از حذف این اکوردیون مطمئن هستید؟ ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        reverseButtons: true,
    }).then((result) => {
        /* if user click on 'بله' button
           that item will be deleted  
        */
        if (result.isConfirmed) {
            let tempIndex = parseInt(redCircle.innerHTML);
            /* first and last accordion item has some special class 
                   that we should add them when delete an item from first 
                   or end
                */
            if (tempIndex == 0 && accordion.children.length != 1) {
                // we check if user deletes first accordion item
                accordion.children[1].classList.add("rounded-t-sm");
            } else if (
                tempIndex == accordion.children.length - 1 &&
                accordion.children.length != 1
            ) {
                // we check if user deletes last accodion item
                accordion.children[accordion.children.length - 2].classList.add(
                    "rounded-b-sm"
                );
            }

            accordion.children[tempIndex].remove();
            redCircle.remove();
            /* we should update index of redCircle item 
                   when we deleted an acccordion item
                */
            Array.from(redCirclesDelete.children).forEach((circle, index) => {
                circle.innerHTML = index;
            });
        }
    });
};

let addAccordionItem = () => {
    Swal.fire({
        title: "افزودن یک اکوردیون جدید",
        input: "textarea",
        inputPlaceholder: "یک عنوان برای اکوردیون بنویسید",
        confirmButtonColor: "#66bb6a",
        confirmButtonText: "تایید",
        showCancelButton: true,
        cancelButtonText: "انصراف",
        cancelButtonColor: "#d33",
    }).then((result1) => {
        if (result1.isConfirmed) {
            Swal.fire({
                title: "افزودن یک اکوردیون جدید",
                input: "textarea",
                inputPlaceholder: "متن بدنه اکوردیون را وارد کنید",
                confirmButtonColor: "#66bb6a",
                confirmButtonText: "تایید",
                showCancelButton: true,
                cancelButtonText: "انصراف",
                cancelButtonColor: "#d33",
            }).then((result2) => {
                if (result2.isConfirmed) {
                    let title = result1.value;
                    let text = result2.value;
                    // add accordion item
                    let divParent = document.createElement("div");
                    divParent.className =
                        "overflow-hidden rounded-b-sm text-white";
                    let div1 = document.createElement("div");
                    div1.className =
                        "bg-primary cursor-pointer p-2 transition-all linear duration-300 hover:bg-blue-500 flex justify-between items-center";
                    let h2 = document.createElement("h2");
                    h2.className = "test-sm";
                    h2.innerHTML = title;
                    let i = document.createElement("i");
                    i.className = "fa-solid fa-arrow-up text-xs transition-all";
                    let p = document.createElement("p");
                    p.className =
                        "text-black text-xs transition-all linear duration-300 m-0 max-h-0 border-x border-x-gray-200 border-b border-b-gray-200";
                    p.innerHTML = text;

                    accordion.children[
                        accordion.children.length - 1
                    ].classList.remove("rounded-b-sm");
                    div1.append(h2);
                    div1.append(i);
                    divParent.append(div1);
                    divParent.append(p);
                    divParent.addEventListener("click", () =>
                        createAccordion(divParent, accordion)
                    );
                    accordion.append(divParent);

                    // Equivalent span tag
                    let span = document.createElement("span");
                    span.className = "rounded-full bg-red-600 text-white p-1";
                    span.innerHTML = accordion.children.length - 1;
                    span.addEventListener("click", deleteAccordionItems);

                    redCirclesDelete.append(span);
                }
            });
        }
    });
};

Array.from(accordion.children).forEach((item) => {
    item.addEventListener("click", () => createAccordion(item, accordion));
});

// 'حذف' button in FAQ section
faqBtn.children[0].addEventListener("click", deleteAccordionItemButton);

// 'انصراف' button in FAQ section
faqBtn.children[2].addEventListener("click", CancelDeletingAccordionItem);

// delete accordion items
Array.from(redCirclesDelete.children).forEach((redCircle) => {
    redCircle.addEventListener("click", deleteAccordionItems);
});

// 'افزودن' button in FAQ section
faqBtn.children[1].addEventListener("click", addAccordionItem);
