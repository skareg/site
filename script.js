// Хранилище карточек
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

// DOM элементы
const wordInput = document.getElementById("word");
const translationInput = document.getElementById("translation");
const addCardButton = document.getElementById("addCard");
const flashcardsContainer = document.getElementById("flashcards-container");

// Функция отображения карточек
function renderFlashcards() {
    flashcardsContainer.innerHTML = ""; // Очистить контейнер
    flashcards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("flashcard");

        // Внутренняя структура карточки
        cardElement.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">${card.word}</div>
                <div class="flashcard-back">${card.translation}</div>
            </div>
        `;

        // Добавить переворот при клике
        const cardInner = cardElement.querySelector(".flashcard-inner");
        cardInner.addEventListener("click", () => {
            cardInner.classList.toggle("flipped");
        });

        // Удалить карточку при правом клике
        cardElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            removeCard(index);
        });

        flashcardsContainer.appendChild(cardElement);
    });
}

// Добавление новой карточки
function addCard() {
    const word = wordInput.value.trim();
    const translation = translationInput.value.trim();
    if (!word || !translation) {
        return alert("Both fields are required!");
    }
    flashcards.push({ word, translation });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    wordInput.value = "";
    translationInput.value = "";
    renderFlashcards();
}

// Удаление карточки
function removeCard(index) {
    flashcards.splice(index, 1);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    renderFlashcards();
}

// Событие добавления карточки
addCardButton.addEventListener("click", addCard);

// Загрузка карточек при старте
renderFlashcards();


// Функция удаления всех карточек
function deleteAllCards() {
    if (confirm("Are you sure you want to delete all cards?")) {
        flashcards = []; // Очистить массив
        localStorage.setItem("flashcards", JSON.stringify(flashcards)); // Обновить хранилище
        renderFlashcards(); // Обновить отображение
    }
}

// Добавить обработчик для кнопки "Удалить все"
document.getElementById("deleteAll").addEventListener("click", deleteAllCards);

// Функция добавления карточек из текста
function addBulkCards() {
    const bulkInput = document.getElementById("bulkInput").value.trim();
    if (!bulkInput) return alert("Please enter some cards!");

    // Разделение текста на строки и обработка каждой строки
    const lines = bulkInput.split("\n");
    lines.forEach(line => {
        const parts = line.split(" – "); // Разделитель " – "
        if (parts.length === 2) {
            const word = parts[0].trim();
            const translation = parts[1].trim();
            if (word && translation) {
                flashcards.push({ word, translation });
            }
        }
    });

    // Сохранение и отображение карточек
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    renderFlashcards();
    document.getElementById("bulkInput").value = ""; // Очистить поле
    alert("Cards added successfully!");
}

// Добавить обработчик для кнопки массового добавления
document.getElementById("addBulkCards").addEventListener("click", addBulkCards);
