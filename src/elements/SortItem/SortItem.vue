<template>
  <button class="sort-item" @click="change">
    <span :class="`sort-name sort-name_${sortType}`"><slot /></span>
  </button>
</template>

<script>
import "./style.sass";
export default {
  props: {
    sort: {
      type: String,
      required: false,
      default: "desc"
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sortType: this.sort
    };
  },
  methods: {
    change() {
      this.sortType = this.sortType === "desc" ? "asc" : "desc";
      this.$emit("click", { sort: this.type, order: this.sortType });
    }
  }
};
</script>
