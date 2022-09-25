//init the static content as const and dynamic content as let 
const about_btn = document.querySelector("#about_btn");
const content_btn = document.querySelector("#content_btn");
const sign_in_btn = document.querySelector("#sign_in_btn");
const buttons = document.querySelectorAll(".btn");
const blue_bar = document.querySelector(".blue_bar_bar");
let scroll_msg = document.querySelector(".bottom_msg");
let content_container = document.querySelector(".text");
let block_container = document.querySelector(".menu");

//set the initial active button
about_btn.style.color= "black";
about_btn.classList.add("active");
blue_bar.style.width = about_btn.clientWidth+"px";
blue_bar.style.left = about_btn.getBoundingClientRect().left + "px";

//load initial docs that should be displayed on start-up
loadDoc("/res/cv.html");
loadMenuContainer(2);

//add the required eventlisteners
about_btn.addEventListener("click", e => {
    loadDoc("/res/cv.html");
    loadMenuContainer(2);
});
content_btn.addEventListener("click", e => {
    loadDoc("/res/article_proseminar.html");
    loadMenuContainer(1);
});

sign_in_btn.addEventListener("click", e => {
    loadDoc("/res/login_form.html");
    block_container.innerHTML="";
    let signup_btn = document.querySelector("#start_signin");
    signup_btn.addEventListener("click", signIn());
})

buttons.forEach(element => {
    element.addEventListener("mouseenter", e => e.target.style.color = "black");
    element.addEventListener("mouseleave", e => mouseLeave(e));
    element.addEventListener("click", e => navBtn(e));
});

function mouseLeave(event){
    if(!event.target.classList.contains("active")){
        event.target.style.color = "grey";
    }
    
}

function navBtn(event){
    buttons.forEach(element => {
        element.classList.remove("active");
        if (element != event.target){
            element.style.color = "grey";
        }
    });
    event.target.classList.add("active");
    blue_bar.style.width = event.target.clientWidth+"px";
    blue_bar.style.left = event.target.getBoundingClientRect().left + "px";
}

//load an arbitrary doc by simply appending the path to the doc startting with the domain (root in nginx server {}) 
function loadDoc(name) {
    let http = new XMLHttpRequest();

    function loaded(){
        content_container.innerHTML = http.responseText;
    }
    http.addEventListener("load", loaded);
    http.open("GET", `http://olehoepfner.de${name}`);
    http.send();
}

//load a container that is displayed left to the main text
function loadMenuContainer(id){
    let http = new XMLHttpRequest();

    function loaded(){
        if(http.status != 200){
            let error_msg = document.createElement("div");
            error_msg.innerText = "404: Error, the requested article cannot be found. Sorry about that.";
            block_container.innerHTML = error_msg;
            return;
        }
        block_container.innerHTML = http.responseText;
        switch(id){
            case 1:
                let top_btn = document.querySelector("#jump_to_top");
                top_btn.addEventListener("mouseenter", e=> top_btn.style.color="black");
                top_btn.addEventListener("click", e=> scroll(0,0));
                top_btn.addEventListener("mouseleave", e=> top_btn.style.color = "grey");
                let menu_item_btns = document.querySelectorAll(".menu_btn");
                menu_item_btns.forEach(element => {
                    element.addEventListener("mouseenter", e=> element.style.color="black");
                    element.addEventListener("mouseleave", e=> element.style.color = "grey");
                    element.addEventListener("click", e => loadDoc("/res/" + element.id + ".html"));
                });
                break;
        }
    }
    http.addEventListener("load", loaded);
   
    switch(id){
        case 1:
            http.open("GET", `http://olehoepfner.de/res/block.html`);
            break;

        case 2:
            http.open("GET", `http://olehoepfner.de/res/block_cv.html`);
            break;

        default:
            console.log("error");
    }
    
    http.send();
}

function signIn(){
    let username = document.querySelector("#username_input").value;
    let password = document.querySelector("#password_input").value;
}