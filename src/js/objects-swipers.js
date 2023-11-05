/*=============== SWIPER - HOME/PROJECTS ===============*/
const swiperBannerObj = new Swiper(".home__swiper", {
  slidesPerView: 1,
  speed: '1000ms',
  loop: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});