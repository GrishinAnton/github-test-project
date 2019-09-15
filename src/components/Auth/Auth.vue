<template>
  <div class="auth-page">
    <Title size="h1" color="gray">
      Экран входа
    </Title>
    <div class="auth-page__main">
      <Title size="h3">
        GitHub Feeds
      </Title>
      <span class="separator">&mdash;</span>
      <router-link class="button button_primary" to="/repos">
        <span>Начать</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Title from "../../elements/Title/Title";

import "./style.sass";
import "../../assets/styles/elements/_buttons.sass";

export default {
  components: {
    Title
  }
};
</script>
