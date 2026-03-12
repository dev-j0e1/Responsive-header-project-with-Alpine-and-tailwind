
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  return bufferToHex(derivedBits);
}

window.doHash = hashPassword

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

const accountEmail = "coolemail@something.com.au"
const salt = "superSecureSalt22"
const superSecureStoredHash = "7d33f0ed8fda2d584e0d17bd63b1fbeb28b1c8c34dad98f54e08faa864573a01"
// password is verySecurePassword20

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
        showLoginResult: function(message, success) {
            let modal = document.querySelector("#login-result-modal")
            modal.hidden = false
            document.querySelector("#login-result-text").innerText = message
            if (success) {
                if (!modal.classList.toString().includes("success")) {
                    modal.classList.add("success")
                }
            } else {
                if (modal.classList.toString().includes("success")) {
                    modal.classList.remove("success")
                }
            }

        },
        login: async function(email, password) {
            const hash = await hashPassword(password, salt);
            if (!this.detailsAreValid(email, password) || hash != superSecureStoredHash || email != accountEmail) {
                this.showLoginResult("Login failed :(", false)
            } else {

                this.showLoginResult("Login successful!", true) 
            }
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