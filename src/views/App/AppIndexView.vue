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
    <div data-role="tasks-list" :class="{ 'flex-center': !tasks || !tasks.length }">
      <task_card :task="task" v-for="task in tasks" :key="task.title" />
      <!-- placeholder -->
      <div v-if="!tasks || !tasks.length">
        <h2 id>
          No tasks yet, add one in the
          <router-link class="boldlink" to="/create">create tab</router-link>
        </h2>
      </div>
    </div>
  </main>
  <raised_section style="margin-bottom: calc(80px - 20px)" height="unset" gap_bottom>
    <div id="daily-title" class="header-large">Daily Tasks</div>
    <div id="progress-stats">
      <div class="flex-row flex-nowrap" id="progress-percentage">
        <div id="progress-completed" class="header-small">Your Progress</div>
        <div id="progress-total" class="header-small">
          <span data-role="progress-percentage">##</span>%
        </div>
      </div>
      <div id="progress-bar-container">
        <div id="progress-bar" data-role="progress-bar" style="width: 0%"></div>
      </div>
      <div id="progress-out-of">
        <span data-role="progress-completed">#</span>
        out of
        <span data-role="progress-total">##</span>
        completed
      </div>
    </div>
    <div id="data-cards">
      <div class="data-card" id="card-completed">
        <div data-role="progress-completed" class="header-large">—</div>
        <div id="bottom-row" class="flex-row flex-nowrap">
          <div data-role="datatype-icon"></div>
          <div data-role="datatype-text">Tasks Completed</div>
        </div>
      </div>
      <div class="data-card" id="card-time">
        <div data-role="data-num" class="header-large">—</div>
        <div id="bottom-row" class="flex-row flex-nowrap">
          <div data-role="datatype-icon"></div>
          <div data-role="datatype-text">Minutes Spent</div>
        </div>
      </div>
    </div>
    <button
      v-if="!tasks || !tasks.length"
      class="large_action stuck"
      @click="$router.push('/create')"
    >
      Create a Task
    </button>
    <button v-else class="large_action stuck" @click="$router.push('/session')">
      Start a Focus Session
    </button>
  </raised_section>
</template>

<script>
import task_card from "@/components/task_card.vue";
import raised_section from "@/components/raised_section.vue";
import { Popup } from "@/util/util";
export default {
  name: "AppView",
  components: {
    task_card,
    raised_section,
  },
  data() {
    return {
      tasks: [
        {
          date: "",
          is_completed: false,
          tag: "other",
          time: 30,
          title: "Title 1",
        },
        {
          date: "",
          is_completed: false,
          tag: "other",
          time: 30,
          title: "Title 2",
        },
        {
          date: "",
          is_completed: false,
          tag: "other",
          time: 30,
          title: "Title 3",
        },
      ],
      user_name: "Name",
    };
  },

  // load tasks from firebase
  created() {
    this.tasks = this.$store.state.tasks;
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

<style>
#progress-percentage {
  justify-content: space-between;
  margin-top: 10px;
}
#progress-bar {
  min-width: 10px;
  height: 5px;
  background: var(--primary-bg);
  overflow: hidden;
  border-radius: 5px;
  transition: width 0.25s 0.25s ease-in-out;
}
#progress-bar-container {
  border-radius: 5px;
  width: 100%;
  height: 5px;
  margin: 10px 0 !important;
  background-color: var(--primary-bg-transparent);
}

#data-cards {
  display: flex;
  flex-flow: row wrap;
  width: calc(100% + (2 * 5px));
  margin: 20px -5px;
}
.data-card {
  background-color: var(--accent-2);
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  flex-grow: 1;
}
[data-role="datatype-icon"] {
  width: 17px;
  height: 17px;
  margin-right: 10px;
  background-color: var(--primary-bg);
  border-radius: 20px;
}
.data-card .header-large {
  margin-bottom: 15px;
}
#progress-out-of,
.card-subtitle {
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--primary-bg);
  opacity: 0.5;
}
</style>
