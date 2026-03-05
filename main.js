document.addEventListener("alpine:init", () => {
    Alpine.data("headerData", () => ({
        mobileNavOpen: false,
        links: [
            {name: "Wordle Clone Project", href: "https://dev-j0e1.github.io/wordl-like-game-small-project/"},
            {name: "Personal Website", href: "https://j0e1.dev"},
            {name: "Github Profile", href: "https://github.com/dev-j0e1"},
            {name: "Clash of Code Profile", href: "https://www.codingame.com/profile/c67bb3cbb1bd21889f0c836c5c7f8bd04321396"}
        ]
        
        })
    )
})


document.addEventListener("keydown", e=> {
    let dataElement = document.querySelector("[x-data]")
    let navIsOpen = dataElement._x_dataStack[0].mobileNavOpen

    if (navIsOpen && e.key === "Escape") {
        dataElement._x_dataStack[0].mobileNavOpen = false
    }
})