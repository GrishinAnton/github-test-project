<template>
  <ul class="pagination__list">
    <li class="pagination__item" :class="{'pagination__item_active': current ===i}" v-for="i in pagination" :key="i">
      <button @click="$emit('btnHandler', {currentCount: i})"><span>{{ i }}</span></button>      
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  }
}
</script>