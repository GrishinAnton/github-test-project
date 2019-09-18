<template>
  <div class="cards-list">
    <Loading v-if="loadingData" />
    <template v-else>
      <p v-if="getRequestError">
        Произошла ошибка при загрузке данных.
      </p>
      <Card
        v-for="item in data"
        v-else
        :key="item.id"
        :item="item"
        :tooltip-message="tooltipMessage"
      />
      
    </template>
  </div>
</template>

<script>
import Card from "./Card/Card";
import Loading from "../../elements/Loading/Loading";

import "./style.sass";
export default {
  components: {
    Card,
    Loading
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    tooltipMessage: {
      type: String,
      required: false
    }
  },
  computed: {
    loadingData() {
      return this.$store.getters["cards/loadingData"];
    },
    getRequestError() {
      return this.$store.getters["cards/getRequestError"];
    }
  },
};
</script>
