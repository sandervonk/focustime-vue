<template>
  <main id="err">
    <h1>404</h1>
    <h2>Page "{{ path }}" not found</h2>
    <nav>
      <span id="link-back" @click="$router.back()">{{ "< BACK >" }}</span>
      <span id="spacer"></span>
      <router-link id="link-to-home" to="/">{{ "< HOME >" }}</router-link>
    </nav>
  </main>
</template>

<script>
export default {
  name: "PageNotFound",
  data() {
    return {
      path: this.$route.path,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");
nav {
  padding: 0;
  margin: 15px 0;
}
#link-to-home,
#link-back {
  font-family: "Source Code Pro", monospace;
  color: var(--primary);
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}
#spacer {
  margin: 0 20px;
}
* {
  font-display: swap;
  font-family: "Roboto", sans-serif;
  color: var(--primary-bg);
}
h1 {
  font-size: 10rem;
  font-weight: 700;
  margin: 0;
}
h2 {
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
}
main#err {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
