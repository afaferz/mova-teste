<template>
  <div>
    <main class="conteudo-principal">

      <section class="section-filtro">
        <Filtro :BuscarRegiao="getCountry" />
      </section>

      <section class="section-paises">
        <Bandeiras 
          v-for="pais in paginacaoPaises" 
          :key="pais.valor" 
          :pais="pais"
          v-show="pais != 0" 
        />
      </section>

      <section class="section-paginacao">
        <Paginacao  
          v-if="options.paises.length"
          :offset="options.offset"
          :total="options.total"
          :limit="options.limit"
          @mudar-pagina="mudarPagina"
        />
      </section>

    </main>
  </div>
</template>

<script>
import Filtro from '@/components/Filtro/Filtro.vue'
import Bandeiras from '@/components/Bandeiras/Bandeiras.vue';
import Paginacao from '@/components/Paginacao/Paginacao.vue';

const $axios = require('axios');

export default {
  name: 'Home',
  components: {
    Filtro,
    Bandeiras,
    Paginacao,
  },

  data: ()=>({

    options: {
      paises: [],
      offset: 0,
      limit: 12,
      total: 0,
    },

  }),

  computed: {
    paginacaoPaises(){
      const primeiroElemento = this.options.limit * this.options.offset;
      const segundoElemento = this.options.limit + primeiroElemento;
      
      return this.options.paises.slice(primeiroElemento, segundoElemento);
    }
  },

  methods: {
    getCountry(parametros) {
      this.options.offset = 0;

      const { opcao1, opcao2 } = parametros;

      const BASE_URL = 'https://restcountries.eu/rest/v2/';
      const url = `${BASE_URL}${opcao1}/${opcao2}`;

      this.options.paises = [];

      $axios.get(url).then(({ data }) => {
        
        if(Array.isArray(data)){
          this.options.paises = data;
        }else{
          this.options.paises.push(data);
        }

        this.options.total = this.options.paises.length;
      }).catch(error => console.log(error))
    
    },

    mudarPagina(value) {
      this.options.offset = value;
    },

  },
}
</script>

<style lang="scss">
@import './Home.scss';
</style>