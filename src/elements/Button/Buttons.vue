<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: "primary"
    }
  },
  mounted() {
    console.log(this.type);
  }
};
</script>
