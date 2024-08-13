//! Global Variables
let duration = 10000
let backgroundRandomlyChecked = window.localStorage.getItem("changeGround") || true;
let changingbackground;
let bulletChecked = window.localStorage.getItem("bullet") || true;
let showHeaderNav = false

//! Main Master
//  Check Allow Change Background
allowChangeBackGround()

//  Open And Close Setting Bar
obenClose()

//  Change Color 
changeColor()

//  Appear Side bar
bulletsClicked()

//  Reset The Data
resetSetting()

//  Teleport To Section
moveToSection()

//  Appear Header Nav
appearHeaderNav()

//  Load Skills 
let ourSkills = document.querySelector('.skill')

window.onscroll = function() {

    //  Skill Offset Top
    let skillsOffsetTop = ourSkills.offsetTop //! Give Us The Height Over The Specific Section

    //  Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight //! Give Us The Height Of The Specific Section

    //  Window Height
    let windowHeight = this.innerHeight //! Give Us The Height Of Screen

    //  Window Scroll Top
    let windowScrollTop = this.pageYOffset //! My Scrolling


    if(windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight*1.5 )) {

        let allSkills = document.querySelectorAll(`.skill .box > span span`)

        allSkills.forEach(e => {

            e.style.width = e.dataset.width
        })
    }
}

//  Create Popup With The Image
let ourGallery = document.querySelectorAll('.gallery img')

ourGallery.forEach( img => {

    img.addEventListener('click', e => {

        //  Create OVerlay Element
        let overlay = document.createElement('div')

        //  Add Class To Overlay
        overlay.className = 'popup-overlay'

        //  Append Overlay To The Body
        document.body.appendChild(overlay)

        //  Create The Popup Box
        let popBox = document.createElement('div')

        //  Add Class To The Popup Box
        popBox.className = 'popup-box'

        //  Create Heading
        let imgHeading = document.createElement('h2')

        //  Create TExt For Heading
        let textHeading = document.createTextNode(img.alt)
        
        //  Append Text To Heading
        imgHeading.appendChild(textHeading)

        //  Append The Heading To Popup-box
        popBox.appendChild(imgHeading)

        //  Create The Image
        let popupImage = document.createElement('img')

        //  Set Image Source
        popupImage.src = img.src

        //  Add Image To popup Box
        popBox.appendChild(popupImage)

        //  Append The Popup Box To Body
        document.body.appendChild(popBox)

        //  Create Close Button
        let buttonImage = document.createElement('button')

        //  Add Class To Button
        buttonImage.className = 'image-button'

        //  Create Text For Button
        let textButton = document.createTextNode('X')

        //  Append Text To Button
        buttonImage.appendChild(textButton)

        //  Add The Button To popup Box
        popBox.appendChild(buttonImage)

    })
})

//  Close Popup Window
document.addEventListener('click', e => {

    if(e.target.className == 'image-button') {

        //  Remove The Current Popup
        e.target.parentNode.remove()

        //  Remove Overlay
        document.querySelector('.popup-overlay').remove()
    }

    if(e.target.className == 'popup-overlay') {

        //  Remove The Current Popup
        e.target.nextSibling.remove()

        //  Remove Overlay
        e.target.remove()
    }
})

//! Functions
//  Select Image
function selectImage() {
// window.localStorage.removeItem("imageNumber")
    if(window.localStorage.getItem("imageNumber")) {

        document.getElementById(`${window.localStorage.getItem("imageNumber")}`).classList.add("active")

        document.querySelector(".landing").style.backgroundImage = `url(./Images/0${localStorage.getItem("imageNumber")}.jpg)`
    }

    document.querySelectorAll(".background div span").forEach(e => {

        e.onclick = function() {

            document.querySelectorAll(".background div span").forEach(e => {

                e.classList.remove("active")
            })

            e.classList.add("active")

            window.localStorage.setItem("imageNumber",e.getAttribute("id"))

            document.querySelector(".landing").style.backgroundImage = `url(./Images/0${e.getAttribute("id")}.jpg)`
        }
    })
}

//  Change the background of the landing section
function changeBackground() {

    var landing = document.querySelector(".landing")
    if(backgroundRandomlyChecked) {

        changingbackground = setInterval(() => {
            
            var i = Math.floor(Math.random() * 5) + 1
            
            landing.style.backgroundImage = `url(./Images/0${i}.jpg)`
            
        }, duration);

        document.querySelector(".background").style.margin = "0 0 10px"
        document.querySelector(".background div").style.bottom = "0"
    } else {

        clearInterval(changingbackground)

        document.querySelector(".background").style.margin = "10px 0 27px"
        document.querySelector(".background div").style.bottom = "-17px"

        selectImage()
    }
}

//  Allow Change ground
function allowChangeBackGround() {

    if(window.localStorage.getItem("changeGround")) {

        document.querySelectorAll(".ground").forEach(e=> {

            e.classList.remove("active")
        })


        document.querySelector(`[data-ground=${window.localStorage.getItem("changeGround")}]`).classList.add("active")

        backgroundRandomlyChecked = document.querySelector(`[data-ground=${window.localStorage.getItem("changeGround")}]`).getAttribute("data-ground") == 'true'? true : false

        //  Change the background
        changeBackground()
    }

    document.querySelectorAll(".ground").forEach(e => {

        e.onclick = function() {

            document.querySelectorAll(".ground").forEach(e => {

                e.classList.remove("active")
            })

            e.classList.add("active")

            window.localStorage.setItem("changeGround", e.dataset.ground)

            backgroundRandomlyChecked = e.getAttribute("data-ground") == "true" ? true : false

            //  Change the background
            changeBackground()
        }
    })
}

//  Open / Close the Setting Bar
function obenClose() {

    document.querySelector("button").onclick = function() {

        document.querySelector(".setting-bar").classList.toggle("oben")

        document.querySelector('button i').classList.toggle('active')

    }
    
}

//  Select the Color
function changeColor() {

    if (window.localStorage.getItem("color")) {

        document.querySelectorAll(".colors span").forEach(e => {

            e.classList.remove("active")

        })

        document.querySelector(`[data-color="${window.localStorage.getItem("color")}"]`).classList.add("active")

        document.documentElement.style.setProperty("--main-color",window.localStorage.getItem("color"))

    }

    document.querySelectorAll(".colors span").forEach( color => {

        color.onclick = function() {

            document.querySelectorAll(".colors span").forEach(element => {

                element.classList.remove("active")

            })

            color.classList.add("active")

            window.localStorage.setItem("color",color.getAttribute("data-color"))

            document.documentElement.style.setProperty("--main-color",window.localStorage.getItem("color"))

        }
    })

}

//  Click On The Bullets
function bulletsClicked() {

    if(localStorage.getItem("bullet")) {

        document.querySelectorAll(".bullet").forEach( e=> {

            e.classList.remove("active")
        })

        document.querySelector(`.bullets [data-bullet=${localStorage.getItem("bullet")}]`).classList.add("active")

        bulletChecked = document.querySelector(`.bullets [data-bullet=${localStorage.getItem("bullet")}]`).getAttribute("data-bullet") == 'true' ?  true : false
    }

    appearanceBullet()

    document.querySelectorAll(".bullet").forEach( e=> {

        e.onclick = function() {

            document.querySelectorAll(".bullet").forEach( e=> {

                e.classList.remove("active")
            })

            e.classList.add("active")

            window.localStorage.setItem("bullet",e.getAttribute("data-bullet"))

            bulletChecked = e.getAttribute("data-bullet") == 'true' ?  true : false

            appearanceBullet()
        }
    })
}

//  Appearance The Bullets
function appearanceBullet() {
    if(bulletChecked === true) {

        document.querySelector(".sidebar").style.display = "flex"
    } else {

        document.querySelector(".sidebar").style.display = "none"
    }
}

//  Reset Settings
function resetSetting() {

    document.querySelector(".setting-bar > span").onclick = function() {

        document.querySelector(".colors span:first-of-type").click()

        document.querySelector(".background span:first-of-type").click()

        document.querySelector(".bullets span:first-of-type").click()

        //todo
        /*
        LocalStorage.removeItem('color')
        LocalStorage.removeItem('background-random')
        LocalStorage.removeItem('show-bullet')

        window.location.reload()
        */
    }
}

//  Moving Through The Sections
function moveToSection() {

    let bullets = document.querySelectorAll('.sidebar div')

    bullets.forEach(e => {
        e.onclick = function() {

            var link = document.getElementById(`a${e.getAttribute('id')}`)

            link.click()

        }
    })
}

//  Appear Header Nav
function appearHeaderNav() {

    document.querySelector('.head-button').onclick = function(e) {
        var nav = document.querySelector('header nav ul')
    
        document.querySelector('.head-button').classList.toggle('clicked')
    
        if(!showHeaderNav) {
    
            nav.style.left = '50%'
            showHeaderNav = true
        }
    
        else {
    
            nav.style.left = '-100%'
            showHeaderNav = false
        }
    }
}