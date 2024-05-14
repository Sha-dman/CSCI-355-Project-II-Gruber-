const nav = document.querySelector(".nav")
window.addEventListener('scroll', fixNav)




function fixNav(){
    if(window.scrollY > nav.offsetHeight  + 150){
        nav.classList.add('active')
    }
    else{
        nav.classList.remove('active')

    }

}
//type
const textEl = document.getElementById('text');
const text = "Please Order Below!"
let index = 1;
let speed = 500/3;
write()

function write(){
    textEl.innerText = text.slice(0,index)
    index++;
    if(index > text.length){
        index = 1
    }
    setTimeout(write,speed)
}
