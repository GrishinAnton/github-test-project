<template>
  <div class="repos-page">
    <Title size="h1" color="gray">
      Экран со списком репозиториев
    </Title>
    <div class="cards-container">
      <div class="search cards-container_search">
        <input 
          v-model="search"
          class="input" 
          type="search" 
          placeholder="Поиск по имени">
      </div>
      <div class="sort-items cards-container_sort-items">
        <SortItem @click="sortChange" type="name">Наименование</SortItem>
        <SortItem @click="sortChange" type="watchers_count">Просмотры</SortItem>
      </div>
      
      <CardList :data="getData" :search="search" :sort="sort" :tooltipMessage="getTooltipMessage"/>
    </div>
  </div>
</template>
<script>
  import Title from "../../elements/Title/Title"
  import SortItem from "../../elements/SortItem/SortItem"
  import CardList from "../Cards/CardsList"
  
  
  import "./style.sass"
  import "../../assets/styles/elements/_input.sass"

  export default {  
    components: {
      Title,
      SortItem,
      CardList,
    },
    data(){
      return {
        search: '',
        sort: {}
      }
    },
    computed: {
      getData() {
        return this.$store.getters.getData
      },
      getTooltipMessage(){
        return this.$store.getters.getRequestUrl
      }
    },
    methods: {
      sortChange(type){    
        this.sort = type
      },
    },
    mounted(){
      this.$store.dispatch("getData")
    }
  }
</script>
