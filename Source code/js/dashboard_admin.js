let panel = document.querySelector("#panel");
let hamburgerMenu = document.querySelector("#hamburger_menu");
let closeArrowBtn = document.querySelector(".close-arrow-btn");
let sections = document.querySelectorAll(".sections div");
let panelListTag = document.querySelectorAll(".right-panel ul li");

/* when click on hamburger menu the panel should appear to user
   and also the close arrow button should be in panel,so user can
   close the panel through it. so this Event listener plays role
   when we click on hamburger menu.
*/
hamburgerMenu.addEventListener("click", () => {
    if (panel.classList.contains("hidden")) {
        hamburgerMenu.classList.add("hidden");
        panel.classList.remove("hidden", "opacity-0");
        closeArrowBtn.classList.remove("hidden");
    }
});
/* when we want to close panel this event listener should execute 
   and close panel and show hamburger menu
*/
closeArrowBtn.addEventListener("click", () => {
    panel.classList.add("hidden", "opacity-0");
    closeArrowBtn.classList.add("hidden");
    hamburgerMenu.classList.remove("hidden");
})

/* when click on one item of panel, that item should get
   background-color secondary and related information to
   that section will display and other section should be
   disappeared
*/
panelListTag[2].classList.add("bg-secondary");
sections[0].classList.remove("hidden");
/* we start this loop from item 3 (i=2) because first two
   item have no special function and be displayed just for
   info to user
*/
for (let i = 2; i < panelListTag.length; i++) {

    panelListTag[i].addEventListener("click", () => {
        // remove background color secondary class for other item
        document.querySelectorAll(".right-panel ul li.bg-secondary").forEach((el) => {
            el.classList.remove("bg-secondary");
        });
        // add hidden class to divs tag that don't have that class
        // because just one item should be displayed to user
        document.querySelectorAll(".sections div").forEach((sec) => {
            if (!sec.classList.contains("hidden")) {
                sec.classList.add("hidden");
            }
        })

        panelListTag[i].classList.add("bg-secondary");
        sections[i - 2].classList.remove("hidden");
    });
}