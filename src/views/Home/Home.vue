<template>
  <div>
    <main class="conteudo-principal">
      <section class="section-filtro">
        <Filtro/>
      </section>
      <section class="section-paises">
        <Paises/>
      </section>
      <section class="section-paginacao">
        PAGINACAO 1 - 12
      </section>
    </main>
  </div>
</template>

<script>
import Filtro from '../../components/Filtro/Filtro.vue'
import Paises from '../../components/Paises/Paises.vue';

export default {
  name: 'Home',
  components: {
    Filtro,
    Paises
  }
}
</script>

<style lang="scss">
@import './Home.scss';
</style>