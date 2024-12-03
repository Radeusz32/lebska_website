const photos = document.querySelectorAll(".photo img")
const popup = document.querySelector(".popup")
const popup_close = document.querySelector(".popup__close")
const popup_img = document.querySelector(".popup__img")
const header = document.querySelector('header');
const popupPrev = document.querySelector(".popup__prev");
const popupNext = document.querySelector(".popup__next");


photos.forEach((photo => {
    photo.addEventListener("click", (e) => {
        popup.classList.remove("hidden");
        popup_img.src = e.target.src;
    })
}));

popup_close.addEventListener("click", () => {
    popup.classList.add("hidden");
});
// CHAT
let currentIndex = 0; // Indeks aktualnie wyświetlanego zdjęcia

// Funkcja otwierająca pop-up z wybranym zdjęciem
function openPopup(index) {
    currentIndex = index;
    popup_img.src = photos[currentIndex].src; // Ustawienie obrazu w pop-upie
    popup.classList.remove('hidden'); // Pokazanie pop-upu
    document.addEventListener('keydown', handleKeyPress); // Dodanie obsługi klawiszy
}

// Funkcja zamykająca pop-up
function closePopup() {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', handleKeyPress); // Usunięcie obsługi klawiszy
}

// Funkcja obsługi klawiszy
function handleKeyPress(event) {
    if (event.key === 'ArrowRight') {
        showNextImage();
    } else if (event.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (event.key === 'Escape') {
        closePopup();
    }
}

// Funkcja do przełączania na następne zdjęcie
function showNextImage() {
    currentIndex = (currentIndex + 1) % photos.length;
    popup_img.src = photos[currentIndex].src;
}

// Funkcja do przełączania na poprzednie zdjęcie
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    popup_img.src = photos[currentIndex].src;
}

// EventListener dla kliknięcia w obrazki w galerii - otwiera pop-up
photos.forEach((img, index) => {
    img.addEventListener('click', () => openPopup(index));
});
popupPrev.addEventListener("click", showPreviousImage);

// EventListener dla przycisku "następne zdjęcie"
popupNext.addEventListener("click", showNextImage);
// EventListener dla przycisku zamykania pop-upu
popup_close.addEventListener('click', closePopup);
// przewijanie
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Próg przewijania, po którym zmienia się przezroczystość
        header.style.background = 'rgba(161, 134, 93, 1.0)';
    } else {
        header.style.background = 'rgba(161, 134, 93, 0.0)';
    }
});

popup.addEventListener('click', (event) => {
    // Sprawdza, czy kliknięto poza obrazkiem lub przyciskiem zamykania
    if (event.target === popup) {
        closePopup();
    }
});