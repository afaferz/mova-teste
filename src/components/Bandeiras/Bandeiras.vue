<template>
  <div class="bandeiras-container">
     <!-- Criar um v-for para gerar os elementos na tela (Passar com o $emit o resultado obtido para uma prop) -->
    <a href="#brasil">
      <img src="@/assets/bandeiras/bandeiraBrasil.svg"/>
    </a>
    <a href="#alemanha">
      <img src="@/assets/bandeiras/bandeiraAlemanha.svg"/>
      </a>
    <a href="#japao">
      <img src="@/assets/bandeiras/bandeiraJapao.svg"/>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Países',
  props: ['flags'],
}
</script>

<style lang="scss">
@import './Bandeiras.scss';
</style>