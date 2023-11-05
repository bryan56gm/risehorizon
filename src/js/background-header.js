/*=============== CHANGE BACKGROUND HEADER ===============*/
// const header = document.getElementById('header');

const scrollHeader = () => {
    // When the scroll is greater than 50 viewport height, add the header-scroll class to the header tag
    if(scrollY >= 50){
        header.classList.add('header-scroll');
    }  else {
        if (!toggle.classList.contains('toggle--cross')){
            header.classList.remove('header-scroll');
        }
    }
}

window.addEventListener('scroll', scrollHeader);
