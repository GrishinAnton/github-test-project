<template>
  <div class="cards-list">
    <Loading v-if="loadingData" />
    <template v-else>
      <p v-if="getRequestError">
        Произошла ошибка при загрузке данных.
      </p>
      <Card
        v-for="item in setDataListWithSort"
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
    search: {
      type: String,
      required: false,
      dafault: ""
    },
    sort: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
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
    setDataListWithSort() {
      let data = this.data;
      data.sort(this.dataSort);
      return this.searchSort(data, this.search);
    },
    getRequestError() {
      return this.$store.getters["cards/getRequestError"];
    }
  },
  methods: {
    dataSort(a, b) {
      let { type, sort } = this.sort;
      if (a[type] > b[type]) {
        return sort === "asc" ? 1 : -1;
      }
      if (a[type] == b[type]) return 0;
      if (a[type] < b[type]) {
        return sort === "asc" ? -1 : 1;
      }
    },
    searchSort(data, search) {
      return data.filter(item => {
        if (
          item.owner.login
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
        ) {
          return item;
        }
      });
    }
  }
};
</script>
