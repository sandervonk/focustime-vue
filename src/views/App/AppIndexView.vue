<template>
  <main class="app">
    <div id="home-head-row">
      <div id="home-text" class="header-text">{{ greeting }}</div>
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
        <task_card :task="task" v-for="task in tasks" :key="task.title" v-cloak />
        <!-- placeholder -->
        <div v-if="!tasks || !tasks.length" v-cloak>
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
export default {
  name: "AppView",
  components: {
    task_card,
    fade_bars,
  },
  // get tasks array from parent through $parent
  computed: {
    tasks() {
      //! sort tasks by date. in order of date being set to: pinned, priority, no date, dates by time
      let tasks = this.$store.state.tasks;
      // if store.state.settings and store.state.settings.do_hide_complete is true, filter out completed tasks
      if (this.$store.state.settings && this.$store.state.settings.do_hide_complete) {
        tasks = tasks.filter((task) => !task.completed);
      }
      return tasks;
    },
    greeting() {
      if (!this.$store.state.user) return "";
      let name = this.$store.state.name ? this.$store.state.name.split(" ")[0] : null,
        greetings = ["Hello, ", "Hi ", "Hey ", "Welcome back "],
        noname_greetings = ["Hello", "Hi there", "Welcome back", "Hey there"];
      // make the previous shorter
      if (name && Math.random() < 0.5) {
        return greetings[Math.floor(Math.random() * greetings.length)] + name + "!";
      }
      return noname_greetings[Math.floor(Math.random() * noname_greetings.length)] + "!";
    },
  },
  methods: {
    logoutPrompt() {
      window.logoutPrompt();
    },
  },
  watch: {
    // when store tasks change, update tasks
    $store: {
      handler() {
        this.tasks;
      },
      deep: true,
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
  padding: 30px 0;
}
/* top bar */
#home-head-row {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
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
