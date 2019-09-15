<template>
  <div class="card">
    <div class="card__media">
      <img class="img-response" :src="item.owner.avatar_url" :alt="item.name" />
    </div>
    <div class="card__content">
      <div class="card__name">
        <p>{{ item.name }}</p>
      </div>
      <div class="card__description">
        <p>{{ item.owner.login }}</p>
      </div>
    </div>
    <div class="card__information">
      <span>{{ item.watchers_count }}</span>
    </div>
    <Tooltip v-if="tooltipMessage">
      {{ tooltipMessage }}
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from "../../../elements/Tooltip/Tooltip";

import "./style.sass";

export default {
  components: {
    Tooltip
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    tooltipMessage: {
      type: String,
      required: false
    }
  }
};
</script>
