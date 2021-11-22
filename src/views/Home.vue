<template>
  <div class="home">
    <h1 class="home__title">RedBox тестовое задание</h1>
    <router-link
      to="/create-event"
    >
      Перейти
    </router-link>
  </div>
</template>

<style lang="scss">
.home {
  text-align: center;
}

.home__title {
  margin-top: 50px;
  padding: 0;

  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
}
</style>
