let panel = document.querySelector("#panel");
let hamburgerMenu = document.querySelector("#hamburger_menu");
let exitBtnMobile = document.querySelector("#exitButtonMobile");
let closeArrowBtn = document.querySelector(".close-arrow-btn");
let returnBtnMobile = document.querySelector("#returnButtonMobile");
let changeInfoSection = document.querySelector("#changeInfoSection");

/* when click on hamburger menu the panel should appear to user
   and also the close arrow button should be in panel,so user can
   close the panel through it. so this Event listener plays role
   when we click on hamburger menu.
*/
function showPanelMobile() {
    if (panel.classList.contains("invisible")) {
        hamburgerMenu.classList.add("hidden");
        exitBtnMobile.classList.add("hidden");
        panel.classList.remove("invisible");
        closeArrowBtn.classList.remove("hidden");
        returnBtnMobile.classList.add("hidden");
    }
}

/* when we want to close panel this event listener should execute 
   and close panel and show hamburger menu
*/
function closePanelMobile() {
    hamburgerMenu.classList.remove("hidden");
    exitBtnMobile.classList.remove("hidden");
    panel.classList.add("invisible");
    closeArrowBtn.classList.add("hidden");
    /* return button mobile should be displayed only when
       change info section is displaying to user otherwise
       it should remain hidden
    */
    if (!changeInfoSection.classList.contains("hidden")) {
        returnBtnMobile.classList.remove("hidden");
    }
}

closeArrowBtn.addEventListener("click", closePanelMobile);
hamburgerMenu.addEventListener("click", showPanelMobile);
