/*=============== SHOW MENU ===============*/
const nav = document.getElementById('menu');
const toggle = document.getElementById('toggle');
const close = document.getElementById('nav-close');
const header = document.getElementById('header');

toggle.addEventListener('click', (e) =>{
    nav.classList.toggle('show');
    toggle.classList.toggle('toggle--cross');
    if (toggle.classList.contains('toggle--cross')){
        header.classList.add('header-scroll');
    } else if(scrollY <= 0) {
        header.classList.remove('header-scroll');
    }
});

/*=============== CLOSE OUTSIDE MENU  ===============*/
document.addEventListener('click', (e) => {
    if(!e.target.classList.contains("show") && e.target != header && !e.target.classList.contains("nav") && !e.target.classList.contains("toggle") && !e.target.classList.contains("toggle__icon")){
        nav.classList.remove('show');
        toggle.classList.remove('toggle--cross');
    }
}); 