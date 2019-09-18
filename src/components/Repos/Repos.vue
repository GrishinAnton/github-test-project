<template>
  <div class="repos-page">
    <Title size="h1" color="gray">
      Экран со списком репозиториев
    </Title>
    <div class="cards-container">
      <div class="search cards-container_search">
        <input
          :value="search"
          @input="sortSearch"
          class="input"
          type="search"
          placeholder="Поиск по имени"
        />
      </div>
      <div class="sort-items cards-container_sort-items">
        <SortItem type="name" @click="sortChange">
          Наименование
        </SortItem>
        <SortItem type="watchers_count" @click="sortChange">
          Просмотры
        </SortItem>
      </div>

      <CardList
        :data="getData"
        :tooltip-message="getTooltipMessage"
      />
    </div>
    <Pagination v-if="!loadingData && !getRequestError" :information="getPagination" @changePagination="changePagination"/>
  </div>
</template>
<script>
import Title from "../../elements/Title/Title";
import SortItem from "../../elements/SortItem/SortItem";
import CardList from "../Cards/CardsList";
import Pagination from "../Pagination/Pagination"

import "./style.sass";
import "../../assets/styles/elements/_input.sass";

export default {
  components: {
    Title,
    SortItem,
    CardList,
    Pagination
  },
  data() {
    return {
      search: "",
      sort: {}
    };
  },
  computed: {
    getData() {
      return this.$store.getters["cards/getData"];
    },
    getTooltipMessage() {
      return this.$store.getters["cards/getRequestUrl"];
    },
    getPagination() {
      return this.$store.getters["cards/getPagination"]
    },
    loadingData() {
      return this.$store.getters["cards/loadingData"];
    },
    getRequestError() {
      return this.$store.getters["cards/getRequestError"];
    }
  },
  mounted() {
    this.$store.dispatch("cards/getData");
  },
  methods: {
    sortChange({ sort, order }) {      
      this.$store.dispatch("cards/getData", { sort: sort, order: order  }) 
    },
    sortSearch(e){
      let value = e.target.value
      this.search = value
      this.$store.dispatch("cards/getData", { q: value })      
    },
    changePagination(count){
      this.$store.dispatch("cards/getData", { page: count  }) 
    }
  }
};
</script>
