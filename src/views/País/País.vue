<template>
  <div>
    <section class="pais">
        <aside class="pais__imagem">
          <img :src="PAIS.flag"/>
        </aside>
      <aside class="pais__infos">
        <ul class="pais__lista">
          <li>
            <strong>Nome:</strong> <span>{{ PAIS.name }}</span>
          </li>
          <li>
            <strong>Capital:</strong> <span>{{ PAIS.capital }}</span>
          </li>
          <li>
            <strong>Regiao:</strong> <router-link :to="{ name: 'Home', params: {regiao: PAIS.region.toLowerCase() }}">{{ PAIS.region }}</router-link>
          </li>
          <li>
            <strong>Sub-região:</strong> <span>{{ PAIS.subregion }}</span>
          </li>
          <li>
            <strong>Populacao:</strong> <span>{{ PAIS.population }}</span>
          </li>
          <li>
            <strong>Línguas:</strong> 
            <span 
              v-for="lingua in PAIS.languages" 
              :key="lingua.name"
            >
              {{ lingua.name + ',' }}
            </span>
          </li>
        </ul>
      </aside>
    </section>
    <section class="vizinhos">
      <h3>Países vizinhos</h3>
      <div class="vizinhos-paises">
        <div 
          class="vizinhos-bandeira"
          v-for="(vizinho,index) in paginacaoVizinhos" 
          :key="index"     
        >
          <router-link :to="{ name: 'País', params: { pais: vizinho.codigo.toLowerCase()}}">
            <img :src="vizinho.flag" />
          </router-link>
        </div>
      </div>

    </section>
       <Paginacao  
          v-if="vizinhos.length"
          :offset="options.offset"
          :total="options.total"
          :limit="options.limit"
          @mudar-pagina="mudarPagina"
        />
  </div>
</template>

<script>
import Paginacao from '@/components/Paginacao/Paginacao.vue'
const $axios = require('axios');

export default {
  name: 'País',
  components: {
    Paginacao,
  },

  data: ()=> ({
    paisCode: '',
    PAIS: '',

    vizinhos: [],

    options: {
      offset: 0,
      limit: 3,
      total: 0,
    },

  }),

  computed: {
    paginacaoVizinhos(){
      const primeiroElemento = this.options.limit * this.options.offset;
      const segundoElemento = this.options.limit + primeiroElemento;
      
      return this.vizinhos.slice(primeiroElemento, segundoElemento);
    }
  },

  // watch: {
  //   '$route.params.pais'(){
  //     this.getPais();
  //   }
  // },

  methods: {
    getPais(){
      this.paisCode = this.$route.params.pais;

      const URL_PAIS = `https://restcountries.eu/rest/v2/alpha/${this.paisCode}`
      
      $axios.get(URL_PAIS).then(({ data }) => {
        this.PAIS = data;

        this.vizinhos = [];

        data.borders.forEach((codigo) =>{
          const codigoPais = codigo.toLowerCase();

          let infoPais = {
            codigo: codigoPais,
            url: `https://restcountries.eu/rest/v2/alpha/${codigoPais}`,
            flag: `https://restcountries.eu/data/${codigoPais}.svg`,
          }

          this.vizinhos.push(infoPais);
        });

        this.options.total = this.vizinhos.length;
      });
    },

    mudarPagina(value) {
      this.options.offset = value;
    },
  },

  created(){
    this.getPais();
  },
}


</script>

<style lang="scss">
@import './País.scss';
</style>