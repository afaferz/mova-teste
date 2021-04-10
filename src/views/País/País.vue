<template>
  <div>
    <img :src="PAIS.flag"/>
    <h2>{{ PAIS.name }}</h2>
    <span>{{ PAIS.capital }}</span>
    <router-link to="/">{{ PAIS.region }}</router-link>
    <span>{{ PAIS.subregion }}</span>
    <span>{{ PAIS.population }}</span>
    <span>{{ PAIS.languages.nativeName }}</span>
    <ul>
      <li v-for="vizinho in PAIS.borders" :key="vizinho">
        <router-link :to="`${vizinho}`">
          <img :src="vizinho.flag"/>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'País',
  props: ['PAIS'],
}
</script>

<style>

</style>