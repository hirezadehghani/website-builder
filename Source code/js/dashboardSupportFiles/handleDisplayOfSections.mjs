let sections = document.querySelectorAll(".sections > div");
let returnBtnMobile = document.querySelector("#returnButtonMobile");
let panel = document.querySelector("#panel");
let changeInfoSection = document.querySelector("#changeInfoSection");
let changeInfoBtn = document.querySelector("#changeInfoButton");

// ticket variable
let ticketButtons = document.querySelectorAll("#ticketDeleteButtons > div");

/* when click on one item of panel, that item should get
   background-color secondary and related information to
   that section will display and other section should be
   disappeared
*/
function handleDisplayOfSections() {
    let panelListTag = panel.querySelectorAll("div > ul li");
    panelListTag[2].classList.add("bg-secondary");
    sections[0].classList.remove("hidden");
    /* we start this loop from item 3 (i=2) because first two
       item have no special function and be displayed just for
       more info to user
    */

    for (let i = 2; i < panelListTag.length; i++) {
        panelListTag[i].addEventListener("click", () => {
            if (
                !sections[1].classList.contains("hidden") &&
                !(
                    ticketButtons[0].classList.contains("hidden") == false &&
                    ticketButtons[1].classList.contains("hidden")
                )
            ) {
                Swal.fire({
                    title: "اخطار",
                    text: "شما در حال حاضر در حال انجام یک فرایند دیگر هستید!",
                    icon: "warning",
                    confirmButtonText: "باشه",
                    confirmButtonColor: "#66bb6a",
                });
            } else {
                /* if user first click on ' تغییر جزئیات ' and then click on
                   other li tag this section should be disappeared and also
                   return button mobile should be disappeared for mobile width
                */
                changeInfoSection.classList.add("hidden");
                returnBtnMobile.classList.add("hidden");

                // remove background color secondary class for other item
                panel
                    .querySelectorAll("div > ul li.bg-secondary")
                    .forEach((list) => {
                        list.classList.remove("bg-secondary");
                    });

                /* add hidden class to divs tag that don't have that class
                   because just one item should be displayed to user
                */
                sections.forEach((sec) => {
                    if (!sec.classList.contains("hidden")) {
                        sec.classList.add("hidden");
                    }
                });

                panelListTag[i].classList.add("bg-secondary");
                sections[i - 2].classList.remove("hidden");
            }
        });
    }
}

/* when user click on 'تغییر جزئیات' that section should be 
   disappeared and change info section be displayed to user
*/
function showDetailsInfoSection() {
    sections[0].classList.add("hidden");
    changeInfoSection.classList.remove("hidden");
    /* if panel opened and user click on change user info
       button,return button mobile  shouldn't be displayed
       to user
    */
    if (panel.classList.contains("invisible")) {
        returnBtnMobile.classList.remove("hidden");
    }
}

/* when user click the arrow left button that section
   should be disappeared and section admin info be
   displayed to user
*/
function returnToUserInfoSection() {
    sections[0].classList.remove("hidden");
    changeInfoSection.classList.add("hidden");
    returnBtnMobile.classList.add("hidden");
}

handleDisplayOfSections();

changeInfoBtn.addEventListener("click", showDetailsInfoSection);
returnBtnMobile.addEventListener("click", returnToUserInfoSection);
// first children => arrow left button for return to user info section
changeInfoSection.children[0].addEventListener(
    "click",
    returnToUserInfoSection
);
