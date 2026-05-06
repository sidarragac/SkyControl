<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Reactive variables
const result = ref('');

// Functions
function append(char: string): void {
  const operators = ['x', '+', '-', '÷'];
  const lastChar = result.value[result.value.length - 1];

  if (char == lastChar && operators.includes(char)) {
    return;
  }

  result.value += char;
}

function eraseOne(): void {
  result.value = result.value.slice(0, -1);
}

function clear(): void {
  result.value = '';
}

function calculate(): void {
  result.value = result.value.replaceAll('x', '*').replaceAll('÷', '/');
  result.value = eval(result.value);
}
</script>

<template>
  <div class="calc-container">
    <h1>Calculator</h1>

    <div class="calculator">
      <p class="result">{{ result }}</p>

      <div class="grid">
        <div class="col"></div>
        <div class="col">
          <button @click="eraseOne()" class="button btn-light-gray">DEL</button>
        </div>
        <div class="col">
          <button @click="clear()" class="button btn-light-gray">AC</button>
        </div>
        <div class="col">
          <button @click="append('÷')" class="button btn-orange">÷</button>
        </div>

        <div class="col">
          <button @click="append('7')" class="button btn-gray">7</button>
        </div>
        <div class="col">
          <button @click="append('8')" class="button btn-gray">8</button>
        </div>
        <div class="col">
          <button @click="append('9')" class="button btn-gray">9</button>
        </div>
        <div class="col">
          <button @click="append('x')" class="button btn-orange">⨉</button>
        </div>

        <div class="col">
          <button @click="append('4')" class="button btn-gray">4</button>
        </div>
        <div class="col">
          <button @click="append('5')" class="button btn-gray">5</button>
        </div>
        <div class="col">
          <button @click="append('6')" class="button btn-gray">6</button>
        </div>
        <div class="col">
          <button @click="append('-')" class="button btn-orange">-</button>
        </div>


        <div class="col">
          <button @click="append('1')" class="button btn-gray">1</button>
        </div>
        <div class="col">
          <button @click="append('2')" class="button btn-gray">2</button>
        </div>
        <div class="col">
          <button @click="append('3')" class="button btn-gray">3</button>
        </div>
        <div class="col">
          <button @click="append('+')" class="button btn-orange">+</button>
        </div>

        <div class="col">

        </div>
        <div class="col">
          <button @click="append('0')" class="button btn-gray">0</button>
        </div>
        <div class="col">
          <button @click="append(',')" class="button btn-gray">,</button>
        </div>
        <div class="col">
          <button @click="calculate()" class="button btn-orange">=</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.calc-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.calculator {
  height: 500px;
  width: 400px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 50px;
  border-radius: 20px;
}

.result {
  color: #FFF;
  font-size: 40px;
  padding-top: 50px;
  padding-right: 50px;
  min-height: 100px;
  width: 100%;
  text-align: end;
}

.grid {
  row-gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 10px;
}

.button {
  cursor: pointer;
  border-radius: 50%;
  border: none;
  height: 60px;
  width: 60px;
  transition: transform 0.2s ease;
}

.btn-gray {
  background-color: #333;
  color: #FFF;
}

.btn-light-gray {
  background-color: #A5A5A5;
  color: #FFF;
}

.btn-orange {
  background-color: #FF9500;
  color: #FFF;
}

.button:hover {
  transform: scale(1.1, 1.1);
}

.btn-gray:active {
  background-color: #A5A5A5;
}

.btn-light-gray:active {
  background-color: #D4D4D2;
}

.btn-orange:active {
  background-color: #FFB84D;
}
</style>