<template>
  <div class="titulo">
    <img src="../assets/images/Worlds_2020.png" alt="Worlds" />
    <p>Super Polla KSEL 2020</p>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Fondamento&display=swap");

.titulo {
  margin-top: 4vh;
  height: 18vh;
  font-family: "Fondamento", cursive;
  @media (max-width: 800px) {
    font-size: 22px;
  }
  @media (min-width: 800px) {
    font-size: 40px;
  }
  color: aliceblue;
  text-align: center;
}
img {
  max-width: 100%;
  height: 70%;
  margin-bottom: 0%;
}
</style>