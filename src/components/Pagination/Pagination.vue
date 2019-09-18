<template>
  <div class="pagination" v-show="paginationCount">
    <button :disabled="disablePrev" class="pagination__prev" @click="prev()">Назад</button>
    <PaginationList :pagination="paginationCount" :current="information.currentPage" @btnHandler="btnHandler"></PaginationList>
    <button :disabled="disableNext" class="pagination__next" @click="next()">Вперед</button>
  </div>
</template>

<script>
import PaginationList from "./PaginationList/PaginationList"

import "./style.sass"

export default {
  components: {
    PaginationList
  },
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  computed: {
    paginationCount(){
      let paginationCount = Math.trunc(this.information.maxTotalCount / this.information.perPageCount)
      if(paginationCount >= 0){
        return paginationCount
      }
      return 0
    },
    disablePrev(){
      return this.information.currentPage === 1
    },
    disableNext(){
      return this.information.currentPage === this.paginationCount
    }
  },
  methods: {
    btnHandler({currentCount}){      
      this.$emit('changePagination', currentCount)      
    },
    prev(){
      let count = --this.information.currentPage      
      if(count <= 0){
        this.$emit('changePagination', 1) 
      } else {
        this.$emit('changePagination', count)
      }
    },
    next(){
      let count = ++this.information.currentPage
      if(count <= this.paginationCount){
        this.$emit('changePagination', count) 
      } else {
        this.$emit('changePagination', this.paginationCount)
      }
    }
  }
  
}
</script>
