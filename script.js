var scroll = 0;

const burger = document.querySelector("#burger");
const scrollbar = document.querySelector("#scroll");

burger.addEventListener('click', function(){
    if(scroll === 0) {
        scroll = 1;
        scrollbar.style.left="0";
    }else{
        scroll = 0;
        scrollbar.style.left="-100vw";
    }
});