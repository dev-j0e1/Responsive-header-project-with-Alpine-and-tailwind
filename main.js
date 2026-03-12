document.addEventListener("alpine:init", () => {
    Alpine.data("headerData", () => ({
        mobileNavOpen: false,
        links: [
            {name: "Github Profile", href: "https://github.com/dev-j0e1"},
            {name: "Wordle Clone Project", href: "https://dev-j0e1.github.io/wordl-like-game-small-project/"},
            {name: "CSS Battle Profile", href: "https://cssbattle.dev/player/j0e1_dev"},
            {name: "Clash of Code Profile", href: "https://www.codingame.com/profile/c67bb3cbb1bd21889f0c836c5c7f8bd04321396"}
        ]
        
        })
    ),
    Alpine.data("loginData", () => ({
        canLogin: false,
        detailsAreValid: function(email, password){
            if (!email || !password || !this.emailLooksValid(email)) {
                return false
            } else {
                return true
            }
        }, 
        validate: function() {
            this.canLogin = this.detailsAreValid(this.email, this.password)

        },
        showPassword: false,
        rememberMe: localStorage.rememberMe && JSON.parse(localStorage.rememberMe) ? JSON.parse(localStorage.rememberMe): false,
        email: JSON.parse(localStorage.getItem('rememberMe')) ? (localStorage.getItem('savedEmail') ?? '') : '' ,
        password: '',
        emailLooksValid: function(emailString) {
            let emailRegex = /^[A-Za-z0-9_-]+\.?[A-Za-z0-9_-]+@[A-Za-z0-9-]+(\.[A-Za-z]{2,}){1,3}$/
            return emailRegex.test(emailString) 
        },
        showLoginResult: function(message) {
            document.querySelector("#login-result-modal").hidden = false
            document.querySelector("#login-result-text").innerText = message

        },
        login: function(email, password) {
            if (!this.detailsAreValid(email, password)) {
                // TODO: add a check in here to also check if the credentials are valid (meaning the hash of the entered credentials matches one of the stored hashes)
                this.showLoginResult("Login failed :(")
                console.log("Login Failed :(")
                return
            }

            this.showLoginResult("Login successful!") 
            console.log("Login successful!")

        }

    }))

})



document.addEventListener("keydown", e=> {
    let dataElement = document.querySelector("[x-data='headerData']")
    let navIsOpen = dataElement._x_dataStack[0].mobileNavOpen

    if (navIsOpen && e.key === "Escape") {
        dataElement._x_dataStack[0].mobileNavOpen = false
    }
})