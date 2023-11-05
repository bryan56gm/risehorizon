const body = document.querySelector("body");
const fullscreenElement = document.getElementById("fullscreen");
const closeElement = document.getElementById("fullscreen-close");
const swiperContainer = document.querySelector(".gallery__grid");

let fullscreenIndex;

if (window.location.href.includes('gallery')) {
  
  swiperContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("gallery__img")) {
      //Para dar el indice adecuado restamos ya que nuestro data value empieza por 1
      const index = e.target.dataset.index - 1;
      enterFullscreenMode(index).catch((error) => console.log(error));
    }
  });
}

const enterFullscreenMode = async (index) => {
  try {
    const images = await getImages();
    await createFullScreen(images);

    const swiperFullscreenObj = addSwiperObject();
    swiperFullscreenObj.slideToLoop(index, 0, false);
    fullscreenElement.requestFullscreen();

    swiperFullscreenObj.on("slideChange", () => {
      fullscreenIndex = swiperFullscreenObj.realIndex;
    });

    closeElement.addEventListener("click", handleCloseFullscreen);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const handleFullscreenChange = () => {
  if (!document.fullscreenElement) {
    cleanupFullscreen();
  }
};

const handleCloseFullscreen = () => {
  document.exitFullscreen();
};

const scrollToLastImage = (index) => {
  const images = Array.from(swiperContainer.querySelectorAll("img"));
  images[index].scrollIntoView({ behavior: "smooth", block: "center" });
};

const cleanupFullscreen = (index) => {
  index = fullscreenIndex;

  if (fullscreenElement.children[1]) {
    fullscreenElement.removeChild(fullscreenElement.children[1]);
    fullscreenElement.style.display = "none";
    body.style.overflowY = "scroll";
  }

  closeElement.removeEventListener("click", handleCloseFullscreen);
  document.removeEventListener("fullscreenchange", handleFullscreenChange); //siempre pasara por este para limpiar el fullscreen (si hay cambios)
  scrollToLastImage(index);
};

const getImages = async () => {
  const images = Array.from(swiperContainer.querySelectorAll("img"));
  const imagesSrc = images.map((image) => image.src);

  if (!images) throw new Error("Error loading container images");

  return imagesSrc;
};

const addSwiperObject = () => {
  return new Swiper(".fullscreen__swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

const createFullScreen = async (images) => {
  const fragment = document.createDocumentFragment();

  const divSwiper = document.createElement("div");
  const divWrapper = document.createElement("div");

  divSwiper.classList.add("swiper", "fullscreen__swiper");
  divWrapper.classList.add("swiper-wrapper");
  divSwiper.appendChild(divWrapper);

  for (let image of images) {
    const divSlide = document.createElement("div");
    const imageElement = document.createElement("img");

    divSlide.classList.add("swiper-slide");
    imageElement.setAttribute("src", `${image}`);

    divSlide.appendChild(imageElement);
    divWrapper.appendChild(divSlide);
  }

  const nextButton = document.createElement("div");
  const prevButton = document.createElement("div");

  nextButton.classList.add("swiper-button-next", "fullscreen__arrows");
  prevButton.classList.add("swiper-button-prev", "fullscreen__arrows");

  divSwiper.appendChild(nextButton);
  divSwiper.appendChild(prevButton);

  fragment.appendChild(divSwiper);
  fullscreenElement.appendChild(fragment);
  fullscreenElement.style.display = "block";
  body.style.overflow = "hidden";
};
