<template>
  <div style="display: flex; align-items: center;" class="q-mx-md column">
    <div class="q-my-lg" style="margin-bottom: 5rem;">
      <h2 class="main-title" style="
        font-family: arial black;
        font-weight: 400;
        text-align: center;
        margin: 0;
        ">
        SEJA BEM VINDO AO <br />
        <span style="font-weight: bolder; margin: 0;">VIP CLUB</span>
      </h2>
      <div style="height: 2px; width: 100%;" class="bg-warning"></div>
    </div>

    <div class="q-my-lg" style="width: 100%; max-width: 1000px;">
      <h4 class="title">
        REGRAS PARA PARTICIPAR
      </h4>

      <h5>
        1. Ter o valor de $ 40 em carteira descentralizada (SAFEPAL).
        <br />
        2. Indicar 2 amigos que vão participar com o mesmo valor, caso não traga ficará impedido de participar de outras
        matrizes na plataforma, a não ser que o número de posições de (nº 4.094 ) já tenha sido preenchidas na matriz.
      </h5>
    </div>

    <div class="q-my-lg" style="width: 100%; max-width: 1000px;">
      <h4 class="title">
        BENEFICIOS DESTE SISTEMA
      </h4>

      <h5>
        Todos os participantes serão beneficiados de forma igualitária, no fim
        deste processo de fila única em matriz binária com inversão de rede.
        Você será alocado a matriz bronze de $ 30, podendo até mesmo participar nas demais, desde que tenha duas
        indicações que esteja participando na matriz anterior.
      </h5>
    </div>

    <div class="q-my-lg" style="width: 100%; max-width: 1000px;">
      <h4 class="title">
        REGRAS DE PREMIAÇÃO
      </h4>

      <h5>
        Participação nos ganhos de rede da conta principal.
        Toda segunda feira será depositado o valor em conta dos 3 primeiro colocados no ranking, com maior número de
        diretos ativos na matriz bronze, sendo que o número mínimo de três diretos, dois é sua obrigação.
        Caso não tenha ganhador acumula para semana seguinte.

        Este prêmio será entregue na live de toda segunda ao vivo.
      </h5>
    </div>

    <div class="q-my-lg" style="width: 100%; max-width: 1000px;">
      <h4 class="title">
        PREENCHIMENTO DAS MATRIZES
      </h4>

      <h5>
        A ordem de formação das matrizes, id: 01(do menor) até id: 4.095 (para o maior), o id será criado a partir do
        momento que o membro optar por participar de uma das matrizes.
        Como vai funcionar a fila única: Todos que forem indicados preencherão a matriz por ordem de ativação.
        Regra para abrir a matriz prata, ter dois diretos posicionados na matriz bronze.
        Regra para abrir a matriz ouro, ter dois diretos posicionados na matriz prata.
        Caso tenha tomado a decisão de participar e não esteja com o valor escolhido em sua carteira descentralizada,
        será banido do sistema e não poderá mais participar.
      </h5>
    </div>

    <div class="q-my-lg" style="width: 100%; max-width: 1000px;">
      <h4 class="title">
        DICAS E ORIENTAÇÕES
      </h4>

      <h5>
        Todos os valores aqui ganhos, caso queira adquirir novos emblemas deverá abrir os mesmos em sua conta anterior,
        não ligado a esta estratégia.
        Esta estratégia é para servir de alavancagem de ganhos, para atingir resultados ainda maiores.
        Estaremos estudando a possibilidade de trabalharmos com esta estratégia em mais duas outras plataformas.
        Porque quem tem um não tem nenhum, mas quem tem dois tem um e quem tem três tem dois ou um.
      </h5>
    </div>
  </div>
  <WppBtn />
</template>

<script setup lang="ts">
import WppBtn from 'src/components/Buttons/WppBtn.vue';
</script>

<style scoped>
.title {
  font-family: arial black;
  font-weight: 400;
  text-align: center;
  margin: 0;
  color: rgb(66, 66, 66) !important;
}

.main-title {
  background: linear-gradient(169.4deg, #000000 -6.01%, #ffe713 36.87%, #000000 78.04%, #000000 103.77%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
