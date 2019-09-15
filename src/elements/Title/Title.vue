<template functional>
  <p :class="`title title__${props.size} title_${props.color}`">
    <slot />
  </p>
</template>

<script>
import "./style.sass";
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "black"
    },
    size: {
      type: String,
      required: false,
      default: "h1"
    }
  }
};
</script>
