<template>
  <section class="filtro-conteudo">  
    <div class="filtro-container">
      <v-select 
        class="input-filtro"
        placeholder="Escolha uma opção"
        :options="filtroUm.options" 
        :reduce="opcao => opcao.code" 
        label="opcao" 
        v-model="opcaoSelecionada"
      >
        <template template #header>
          <div class="label">{{ filtroUm.label }}</div>
        </template>
      </v-select>
  
      <v-select 
        v-show="filtroDois"
        class="input-filtro"

        placeholder="Escolha uma opção"

      >
        <template template #header>
          <div class="label">{{ labelDois }}</div>
        </template>
      </v-select>
    </div>
    <!-- <div class="filtro">
      
    </div> -->
  </section>
</template>

<script>
export default {
  name: 'Filtro',

  props: [],

  data: ()=>({

    filtroUm: {
      label: 'Filtrar por',
      options: [
        {opcao: 'Regiao', valor: 'region'}, 
        {opcao: 'Regiao', valor: 'region'}
      ],
       
 

    },
    labelDois: '',
    filtroDois: true,
    
    opcaoSelecionada: '',
  })
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "./Filtro.scss";
</style>