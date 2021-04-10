<template>
  <div>
    <header class="cabeçalho">
      <img src="@/assets/logo_principal.svg">
      <router-link to="/">
      <button type="button" @click="$emit('voltar')">
        <svg width="19" height="10" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 1V5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H19V1H17Z" fill="#6D2080"/>
        </svg>
        <span class="botao-texto">
          {{ textButton }}
        </span>
      </button>
    </router-link>
    </header>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  data: ()=> ({

    textButton: 'Voltar',
  })
}
</script>

<style lang="scss">
@import './BaseHeader.scss';
</style>