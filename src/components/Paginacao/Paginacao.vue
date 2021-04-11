<template>
  <div class="paginacao">
    <button
      v-if="showAnterior"
      class="opcao ant"
      @click="mudarPagina(current - 1)"
    >
      <svg id="ant" class="icone-paginacao" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.75622 1.83893L2.58977 6.00537L6.75622 10.1718C7.17501 10.5906 7.17501 11.2671 6.75622 11.6859C6.33743 12.1047 5.66092 12.1047 5.24212 11.6859L0.313262 6.75705C-0.105531 6.33825 -0.105531 5.66174 0.313262 5.24295L5.24212 0.314094C5.66092 -0.104698 6.33743 -0.104698 6.75622 0.314094C7.16427 0.732886 7.17501 1.42013 6.75622 1.83893Z" fill="#8D8D8D"/>
      </svg>

    </button>

    <button
      ref="botaoPaginacao"
      v-for="(pagina, index) in paginas"
      :key="pagina"
      class="opcao"
      :class="{ 'current': index + 1 === current}"
      @click="mudarPagina(index)"
    >
      {{ pagina }}
    </button>

    <button 
      v-if="showProximo" 
      class="opcao prox" 
      @click="mudarPagina(current + 1)"
    >
      <svg id="prox" class="icone-paginacao" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.314094 10.1611L4.48054 5.99463L0.314094 1.82819C-0.104699 1.4094 -0.104699 0.732886 0.314094 0.314095C0.732886 -0.104697 1.4094 -0.104697 1.82819 0.314094L6.75705 5.24295C7.17584 5.66175 7.17584 6.33826 6.75705 6.75705L1.82819 11.6859C1.4094 12.1047 0.732886 12.1047 0.314094 11.6859C-0.0939598 11.2671 -0.104698 10.5799 0.314094 10.1611Z" fill="#8D8D8D"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Paginacao',
  props: {
    offset: {
      type: [String, Number],
      default: 0,
    },
    total: {
      type: [String, Number],
      required: true,
    },
    limit: {
      type: [String, Number],
      default: 12,
    },
  },

  computed: {
    showAnterior() {
      return this.current > 1;
    },
    showProximo() {
      return this.total > this.limit * this.current;
    },
    
    current() {
      return this.offset ? this.offset + 1 : 1;
    },

    paginas() {
      const qty = Math.ceil(this.total / this.limit);

      if (qty <= 1) return [1];

      return Array.from(Array(qty).keys(), (i) => i + 1);
    },
  },
  methods: {
    mudarPagina(offset) {
      
      this.$emit('mudar-pagina', offset);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './Paginacao.scss';
</style>