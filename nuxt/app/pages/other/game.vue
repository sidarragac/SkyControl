<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import type Card from '@/interafces/CardInterface';
import { length } from 'class-validator';

// Non-reactive variables
const frontImages = [
    'https://i.pinimg.com/736x/aa/e9/d5/aae9d5ae05cb643a238f86a5875866f5.jpg',
    'https://i.pinimg.com/736x/3d/ce/9d/3dce9d5e8b682fa38d59930e44464054.jpg',
    'https://cdn.worldvectorlogo.com/logos/aa-american-airlines.svg',
    'https://images.seeklogo.com/logo-png/30/1/latam-logo-png_seeklogo-306538.png',
    'https://www.pngitem.com/pimgs/m/2-28493_transparent-avianca-logo-png-avianca-airlines-logo-2018.png',
    'https://i.pinimg.com/736x/36/3d/bf/363dbf0ffa49288be404eb9beffa7264.jpg',
];

// Reactive variables
const deck = ref<Card[]>([]);
const card = ref<Card>({
    id: 0,
    matchValue: 0,
    frontImage: '',
    backImage: 'https://opengameart.org/sites/default/files/card%20back%20red.png',
    flipped: false,
});
const flippedCards = ref<Card[]>([]);
const score = ref(0);
const matchesFound = ref(0);
const isLocked = ref(false);

// Functions
function flipCard(card: Card): void {
    if (isLocked.value) {
        return;
    }

    if (card.flipped) {
        return;
    }

    if (flippedCards.value.length === 2) {
        return;
    }

    card.flipped = true;
    flippedCards.value.push(card);

    if (flippedCards.value.length === 2) {
        checkMatch();
    }
}

function checkMatch(): void {
    isLocked.value = true;

    const [card1, card2] = flippedCards.value;

    if (card1!.matchValue === card2!.matchValue) {
        score.value += 1;
        matchesFound.value++;

        resetCards();
    } else {
        setTimeout(() => {
            card1!.flipped = false;
            card2!.flipped = false;

            resetCards();
        }, 800);
    }
}

function resetCards(): void {
    flippedCards.value = [];
    isLocked.value = false;
}

function resetGame(): void {
    score.value = 0;
    matchesFound.value = 0;
    flippedCards.value = [];
    isLocked.value = false;

    deck.value = createDeck();
}

function createDeck(): Card[] {
    let id = 0;
    const newDeck: Card[] = [];

    frontImages.forEach((img, index) => {
        const matchValue = index + 1;

        for (let i = 0; i < 2; i++){
            const newCard = { ...card.value };

            newCard.id = id++;
            newCard.matchValue = matchValue;
            newCard.frontImage = img;

            newDeck.push(newCard);
        }
    });

    shuffleDeck(newDeck);

    return newDeck;
}

function shuffleDeck<T>(deck: T[]): void {
    for (let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));

        const tempI = deck[i] as T;
        const tempJ = deck[j] as T;

        deck[i] = tempJ;
        deck[j] = tempI;
    }
}

// Hooks
onMounted(() => {
    deck.value = createDeck();
})
</script>

<template>
    <div class="title">
        <h1>Memory Game</h1>
        <h3>Score: {{ score }}</h3>
        <p :class="matchesFound === frontImages.length ? 'win' : 'hidden'">You Win!</p>
    </div>

    <div class="game-container">
        <div v-for="card in deck" :key="card.id" @click="flipCard(card)" class="game-card" :class="{ flipped: card.flipped }">
            <img :src="card.flipped ? card.frontImage : card.backImage" />
        </div>
    </div>

    <div class="reset">
        <button @click="resetGame()">Reset Game</button>
    </div>
</template>

<style>
.title {
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
}

.win {
    color: green;
    font-weight: bold;
}

.hidden {
    display: none;
}

.game-container {
    perspective: 1000px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    place-items: center;
}

.game-card {
    width: 120px;
    height: 180px;
    cursor: pointer;
    transition: transform 0.4s ease;
    transform-style: preserve-3d;
}

.game-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: rotateY(180deg);
}

.flipped {
    transform: rotateY(180deg);
    background-color: red;
}

.reset {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.reset button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    background-color: #FF9500;
    color: #FFF;
}

.reset button:hover {
    background-color: #FFB84D;
}
</style>