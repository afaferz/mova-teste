<template>
  <section class="filtro-conteudo">  
    <div class="filtro-container">
      <v-select 
        label="opcao" 
        class="input-filtro"
        placeholder="Escolha uma opção"
        :components="{OpenIndicator, Deselect}"
        :options="filtro.options" 
        v-model="opcaoInput1"
      >
        <template  template #header>
          <div class="label">{{ filtro.label }}</div>
        </template>
      </v-select>
  
      <v-select
        v-tooltip.bottom="{ 
          content: tooltipConfig.msg, 
          classes: 'tooltip',
          show: tooltipConfig.isOpen,
          autoHide: true,
          
        }"
        label="opcao" 
        v-show="opcaoInput1.valor"
        class="input-filtro"
        placeholder="Escolha uma opção"
        :options="opcaoInput1.subOptions"
        v-model="opcaoInput2"
      >
        <template template #header>
          <div class="label">{{ opcaoInput1.opcao }}</div>
        </template>

        <template v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            Oh no! Nenhum resultado para <em>{{ search }}</em>.
          </template>
          <em style="opacity: 0.5;" v-else>Busque ou Selecione uma opção</em>
        </template>
      </v-select>
      
      <button 
        class="botao-pesquisa"
        @click="selecionarOpcao"
      >
        Pesquisar
      </button>
    </div>
  </section>
</template>

<script>
import SUB_OPTIONS from '@/services/opcoesFiltro'
const $axios = require('axios');

import Vue from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)

export default {
  name: 'Filtro',

  data: ()=>({
    Deselect: {
      render: createElement => createElement('span', ''),
    },
    OpenIndicator: {
      render: createElement => createElement('span', '▼', {class: {'toggle': true}}),
    },

    tooltipConfig: {
      isOpen: false,
      msg: 'Por favor, este campo deve estar preenchido!',
    },

    // Seleção filtro 1
    filtro: {
      label: 'Filtrar por',
      options: [
        {
          opcao: 'Regiao', 
          valor: 'region', 
          subOptions: SUB_OPTIONS.Regiao,
        }, 
        {
          opcao: 'Capital', 
          valor: 'capital', 
          subOptions: null,
        },
        {
          opcao: 'Língua', 
          valor: 'lang', 
          subOptions: null
        },
        {
          opcao: 'País', 
          valor: 'alpha', 
          subOptions: null,
        },
        {
          opcao: 'Código de ligação', 
          valor: 'callingcode', 
          subOptions:  null,
        },
      ],
    },
    
    opcaoInput1: {
      opcao: 'País', 
      valor: 'alpha', 
      subOptions: [] 
      },
      
    opcaoInput2: {opcao: '', valor: ''},

  }),

  props: {
    BuscarRegiao: null,
  },


  watch: {
    opcaoInput1(){

      if(this.$route.params.regiao){
        const params = this.$route.params.regiao.toLowerCase();

        const _SUB_OPTIONS = this.opcaoInput1.subOptions.find(elemento=>{
          return elemento.valor == params;
        });
  
        this.opcaoInput2 = _SUB_OPTIONS;
      }
      else{
        this.opcaoInput2 =  {opcao: '', valor: ''};
      }
    },
  },

  methods: {
    selecionarOpcao(){

      if(!this.opcaoInput2.valor){
        return this.tooltipConfig.isOpen = true; 
      }
      else{
        
        const selecionadas = {
          opcao1 : this.opcaoInput1.valor,
          opcao2: this.opcaoInput2.valor,
        }

        const data = this.BuscarRegiao(selecionadas);
        data;
      
        this.$emit('opcao-selecionada', selecionadas);
      }
    },

    filtros(){


      $axios.get('https://restcountries.eu/rest/v2/all')
      .then(({data})=>{

        // Default
        if(!this.$route.params.regiao){
          this.opcaoInput1.subOptions = data.map(pais=>{
            return {opcao: pais.name, valor: pais.alpha3Code};
          })
        }
        
        // Capital
        this.filtro.options[1].subOptions = data.map(pais=>{
          return {opcao: `${pais.capital} - ${pais.alpha3Code}`, valor: pais.capital};
        })


        let LINGUAS = data.map((pais)=>{
          
          const opcao = pais.languages[0].name;
          const valor = pais.languages[0].iso639_1;

          let teste = { opcao, valor};

          return teste
        });

        this.filtro.options[2].subOptions = LINGUAS.filter(function (array) {
            return !this[JSON.stringify(array)] && (this[JSON.stringify(array)] = true);
        }, Object.create(null));

        //País
        this.filtro.options[3].subOptions = data.map(pais=>{
          return {opcao: pais.name, valor: pais.alpha3Code};
        })

        //Código de Ligação
        this.filtro.options[4].subOptions = data.map(pais=>{
          return {opcao: `+${pais.callingCodes} ${pais.name} `, valor: pais.callingCodes[0]};
        })

        if(this.$route.params.regiao){
          
          const _REGIAO = this.filtro.options.find((elemento)=>{
            return elemento.opcao == 'Regiao';
          });

          this.opcaoInput1 = _REGIAO;
        }
      })


    }
  },

  created(){
    this.filtros();

    if(this.$route.params.regiao){
      const REGIAO = this.filtro.options.find((elemento)=>{
        return elemento.opcao == 'Regiao';
      })
      this.opcaoInput1 = REGIAO;
      this.opcaoInput1.subOptions = SUB_OPTIONS.Regiao;
    }
  }
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "./Filtro.scss";
</style>