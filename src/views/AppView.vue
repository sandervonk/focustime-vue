<template>
  <main class="app"><router-view /></main>
  <nav_bar />
</template>

<script>
import { Popup } from "@/util/util";
import nav_bar from "@/components/nav_bar.vue";
export default {
  name: "AppView",
  components: {
    nav_bar,
  },
  data() {
    return {};
  },
  methods: {
    logoutPrompt() {
      new Popup(["Sign Out", "Are you sure you want to sign out?"], "default", 10000, "", [
        ["removePopup()", "Cancel", "secondary-action fullborder"],
        ["removePopup()", "Yes", "primary-action click-to-logout"],
      ]);
    },
  },
  // load tasks from firebase
  created() {
    this.tasks = this.$store.state.tasks;
  },
};
</script>

<style>
main.app {
  background: var(--accent-4);
  width: 100%;
  padding: 30px;
  margin: 0;
  flex-grow: 1;
  box-sizing: border-box;
}
/* list */
div[data-role="tasks-list"] {
  flex-flow: column nowrap;
  display: flex;
  width: 100%;
  flex-grow: 0;
  box-sizing: border-box;
}
/* top bar */
#home-head-row {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;

  font-size: 26px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}
#home-logout,
#home-logout * {
  height: 40px;
  width: 40px;
  cursor: pointer;
}

#home-logout * {
  pointer-events: none;
}
</style>
<style scoped>
@media (min-width: 600px) {
  nav {
    width: 500px;
    /* left: 50%;
    transform: translateX(-50%); */
    margin: 0 auto;
    border-radius: 20px 20px 0 0;
  }
}
@media (min-width: 760px) {
  main.app {
    /* padding: 30px 60px; */
  }
}
</style>
<style>
body,
html {
  background-color: var(--accent-4);
}
</style>
