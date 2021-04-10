<template>
  <section class="filtro-conteudo">  
    <div class="filtro-container">
      <v-select 
      
        @input="habilitarInput"
        class="input-filtro"
        placeholder="Escolha uma opção"
        :components="{OpenIndicator, Deselect}"
        :options="filtroUm.options" 
        label="opcao" 
        v-model="opcaoInput1"
      >
        <template  template #header>
          <div class="label">{{ filtroUm.label }}</div>
          
        </template>
      </v-select>
  
      <v-select 
        v-show="filtroDois.show"
        class="input-filtro"
        placeholder="Escolha uma opção"
        :options="filtroDois.options.regiao"
        label="opcao" 
        v-model="opcaoInput2"
      >
        <template template #header>
          <div class="label">{{ filtroDois.label }}</div>
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
// import OpenIndicator from './OpenIndicator';

export default {
  name: 'Filtro',

    // OpenIndicator,

  data: ()=>({
    Deselect: {
      render: createElement => createElement('span', ''),
    },
    OpenIndicator: {
      render: createElement => createElement('span', '▼', {class: {'toggle': true}}),
    },


    // Seleção filtro 1
    filtroUm: {
      label: 'Filtrar por',
      options: [
        {opcao: 'Regiao', valor: 'region'}, 
        {opcao: 'Capital', valor: 'capital'},
        {opcao: 'Língua', valor: 'lang'},
        {opcao: 'País', valor: 'alpha'},
        {opcao: 'Código de ligação', valor: 'callingcode'},
      ],
    },

    // Seleção filtro 2
    // TODO: Criar opções de busca do filtro 2 baseado no que o usuário quer buscar
    filtroDois: {
      show: false,
      label: '',
      options: {
        regiao: [
          {opcao: 'Argentina', valor: 'AR'},
          {opcao: 'Brasil', valor: 'BR'},
          {opcao: 'Paraguai', valor: 'PA'},
          {opcao: 'Uruguai', valor: 'UR'},
        ],
        capital: [],
        lingua: [],
        pais: [],
        codigo: [],
      }
    },
    
    opcaoInput1: {opcao: 'País', valor: 'alpha'},
    opcaoInput2: {opcao: '', valor: ''},
    

  }),
  methods: {
    habilitarInput(){
      this.filtroDois.show = true;
      this.filtroDois.label = this.opcaoInput1.opcao;
    },

    selecionarOpcao(){
      console.log(this.opcaoInput1.valor, this.opcaoInput2.valor);
    }
  }
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "./Filtro.scss";
</style>