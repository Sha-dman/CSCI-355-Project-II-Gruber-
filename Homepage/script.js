const sliderContainer= document.querySelector('.slider-container')
const sliderRight= document.querySelector('.right-slide');
const sliderLeft =document.querySelector('.left-slide');
const upBtn =document.querySelector('.up-btn');
const downBtn =document.querySelector('.down-btn');
const slidesLength= sliderRight.querySelectorAll('div').length;

let activeIndex = 0;

sliderLeft.style.top = `-${(slidesLength - 1) * 100}vh`

upBtn.addEventListener('click', () => changeSlide('up'))
downBtn.addEventListener('click', () => changeSlide('down'))


const changeSlide = (direction) => {
    const height = sliderContainer.clientHeight
    if(direction === 'up'){
        activeIndex++;
        if(activeIndex > slidesLength -1){
            activeIndex = 0;
        }
    }
    else if(direction === 'down'){
        activeIndex--;
        if(activeIndex < 0){
            activeIndex = slidesLength -1;
        }
    }
    sliderRight.style.transform = `translateY(-${activeIndex * height}px)`
    sliderLeft.style.transform = `translateY(${activeIndex * height}px)`

}

//button ripple
const buttons = document.querySelectorAll('.ripple');

buttons.forEach(b => {
    b.addEventListener('click', function(e){
        const x = e.clientX;
        const y = e.clientY;

        const btnTop = e.target.offsetTop;
        const btnLeft = e.target.offsetLeft;

        const inX = x - btnLeft
        const inY = y - btnTop

        const ci = document.createElement('span')
        ci.classList.add('circle')
        ci.style.top = inY + 'px'
        ci.style.left = inX + 'px'
        this.appendChild(ci)
        
        setTimeout(() => ci.remove(),250)
    })
})
