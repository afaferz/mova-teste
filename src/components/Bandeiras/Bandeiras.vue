<template>
  <div>
    <div class="bandeiras-container">
      <router-link 
        :to="{name: 'País', params: { pais: pais.alpha3Code.toLowerCase() }}"
      >
        <img :src="pais.flag"/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bandeiras',
  props: ['pais'],
}

</script>

<style lang="scss">
@import './Bandeiras.scss';
</style>