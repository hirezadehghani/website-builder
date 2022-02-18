let panel = document.querySelector("#panel");
let hamburgerMenu = document.querySelector("#hamburger_menu");
let closeArrowBtn = document.querySelector(".close-arrow-btn");

/* when click on hamburger menu the panel should appear to user
   and also the close arrow button should be in panel,so user can
   close the panel through it. so this Event listener plays role
   when we click on hamburger menu.
*/
hamburgerMenu.addEventListener("click", () => {
    if (panel.classList.contains("invisible")) {
        panel.classList.remove("invisible", "opacity-0");
        hamburgerMenu.classList.add("invisible");
        closeArrowBtn.classList.remove("invisible");
    }
});
/* when we want to close panel this event listener should execute 
   and close panel and show hamburger menu
*/
closeArrowBtn.addEventListener("click", () => {
    panel.classList.add("invisible", "opacity-0");
    hamburgerMenu.classList.remove("invisible");
    closeArrowBtn.classList.add("invisible");
})