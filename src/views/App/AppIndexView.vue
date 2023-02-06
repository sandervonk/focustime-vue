<template>
  <main class="app">
    <div id="home-head-row">
      <div id="home-text" class="header-text">
        Hi&nbsp;<span id="name">{{ user_name }}</span
        >!
      </div>
      <div id="home-logout" @click="logoutPrompt">
        <object
          title="Profile Picture"
          :data="require('@/assets/icon/interface/pfp.svg')"
          type="image/svg+xml"
        >
          <img alt="icon" :src="require('@/assets/icon/interface/pfp.png')" />
        </object>
      </div>
    </div>
    <fade_bars>
      <div data-role="tasks-list" :class="{ 'flex-center': !tasks || !tasks.length }">
        <!-- ensure the following updates correctly -->
        <task_card :task="task" v-for="task in tasks" :key="task.title" />
        <!-- placeholder -->
        <div v-if="!tasks || !tasks.length">
          <h2 id>
            No tasks yet, add one in the
            <router-link class="boldlink" to="/create">create tab</router-link>
          </h2>
        </div>
      </div>
    </fade_bars>
  </main>
</template>

<script>
import task_card from "@/components/task_card.vue";
import fade_bars from "@/components/fade_bars.vue";
import { Popup } from "@/util/util";
export default {
  name: "AppView",
  components: {
    task_card,
    fade_bars,
  },
  data() {
    return {};
  },

  // get tasks array from parent through $parent
  computed: {
    tasks() {
      console.log("AppIndexView got Tasks:", this.$store.state.tasks);
      return this.$store.state.tasks;
    },
    user_name() {
      return this.$store.state.name ? this.$store.state.name.split(" ")[0] : "User";
    },
  },
  methods: {
    logoutPrompt() {
      new Popup(["Sign Out", "Are you sure you want to sign out?"], "default", 10000, "", [
        ["removePopup()", "Cancel", "secondary-action fullborder"],
        ["removePopup()", "Yes", "primary-action click-to-logout"],
      ]);
    },
  },
};
</script>

<style scoped>
main.app {
  width: 100%;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  flex-flow: column nowrap;
}
/* list */
div[data-role="tasks-list"] {
  flex-flow: column nowrap;
  display: flex;
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
}
/* top bar */
#home-head-row {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

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
.boldlink,
a[href],
router-link {
  color: var(--accent-3);
  text-decoration: none;
  font-weight: bold;
}
</style>
