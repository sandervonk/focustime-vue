<template>
  <main class="appmain">
    <!-- <transition
      :enter-active-class="route.meta.enterClass"
      :leave-active-class="route.meta.leaveClass"
    >
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </transition> -->

    <router-view />
    <raised_section
      ref="daily_tasks"
      style="margin-bottom: calc(80px - 20px)"
      height="unset"
      id="daily_tasks"
      gap_bottom
    >
      <div id="daily-title" class="header-large">Daily Tasks</div>
      <div id="progress-stats">
        <div class="flex-row flex-nowrap" id="progress-percentage">
          <div id="progress-completed" class="header-small">Your Progress</div>
          <div id="progress-total" class="header-small">
            <span data-role="progress-percentage">{{ Math.round(percent_done) }}</span
            >%
          </div>
        </div>
        <div id="progress-bar-container">
          <div
            id="progress-bar"
            data-role="progress-bar"
            style="width: 0%"
            :style="{ width: percent_done + '%' }"
          ></div>
        </div>
        <div id="progress-out-of">
          <span data-role="progress-completed">{{ num_completed }}</span>
          out of
          <span data-role="progress-total">{{ tasks.length }}</span>
          completed
        </div>
      </div>
      <div id="data-cards">
        <div class="data-card has-click" id="card-completed" @click="clearCompletedPrompt">
          <div data-role="progress-completed" class="header-large">
            {{ num_completed || num_completed == 0 ? num_completed : "—" }}
          </div>
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
  </main>
  <nav_bar />
</template>

<script>
import nav_bar from "@/components/nav_bar.vue";
import raised_section from "@/components/raised_section.vue";
let day_to_ms = 24 * 60 * 60 * 1000;
export default {
  name: "AppView",
  components: {
    nav_bar,
    raised_section,
  },

  created() {
    this.$store.dispatch("get_doc");
  },
  computed: {
    tasks() {
      let tasks = this.$store.state.tasks;
      let today_date = new Date(new Date().toISOString().split("T")[0]);
      tasks = tasks.filter((task) => {
        if (!task.is_completed) return true;
        if (!task.date || isNaN(new Date(task.date))) return true;
        if (new Date(task.date).getTime() >= today_date.getTime() - day_to_ms) return true;
        return false;
      });
      return tasks;
    },
    num_completed() {
      let completed = 0;
      for (let task of this.tasks) {
        if (task.is_completed) {
          completed++;
        }
      }
      return completed;
    },

    percent_done() {
      let completed = 0;
      let total = 0;
      for (let task of this.tasks) {
        if (task.is_completed) {
          completed++;
        }
        total++;
      }
      let percent = (completed / total) * 100;
      return percent ? percent : 0;
    },
    route() {
      return this.$route;
    },
  },
  // watch route changes
  watch: {
    $route(to) {
      if (to.path !== "/") {
        this.$refs.daily_tasks.isRaised = false;
      } else if (to.path === "/") {
        this.$refs.daily_tasks.isRaised = true;
      }
    },
  },
  methods: {
    clearCompletedPrompt() {
      window.clearCompletedPrompt();
    },
  },
};
</script>

<!-- styles -->
<style>
main.appmain {
  background: var(--accent-4);
  width: 100%;
  padding: 30px;
  margin: 0;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 0;
}
</style>
<style scoped>
@media (min-width: 600px) {
  nav {
    width: 500px;
    margin: 0 auto;
    border-radius: 20px 20px 0 0;
    transition: width 0.5s ease, border-radius 0.5s ease;
  }
}
</style>
<style>
body,
html {
  background-color: var(--accent-4);
}
</style>
<!-- bottom section -->
<style scoped>
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
  margin-bottom: -5px;
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
<style>
@media (min-width: 600px) {
  .task-card {
    width: 450px;
    margin: 10px auto !important;
  }
}
@media (min-width: 500px) {
  ::-webkit-scrollbar-track {
    opacity: 0 !important;
    background: var(--bg);
    display: none !important;
    width: 16px;
    height: 16px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background: var(--scrollbar-transparent);
    border: solid 4px var(--accent-4);
  }
  ::-webkit-scrollbar {
    width: 16px !important;
    height: 16px !important;
  }
  ::-webkit-scrollbar-corner {
    opacity: 0;
    background: transparent;
  }
}
</style>
<style>
/* style for large devices */
@media (min-width: 905px) {
  /* .show-in-desktop {
    display: block !important;
  }
  [data-role="tasks-list"] {
    flex-flow: column wrap !important;
  }
  .task-card {
    margin: 10px !important;
  } */
  #nav_bar {
    margin-left: 0;
    width: 360px;
    border-top-left-radius: 0;
  }
  #daily_tasks {
    margin-bottom: 0 !important;
    left: none;
    right: 0;
  }
  #daily_tasks > .section_content {
    padding-bottom: 110px !important;
    border-top-right-radius: 0px !important;
  }
  #daily_tasks,
  #daily_tasks > .section_content button.stuck {
    left: unset;
  }
  #daily_tasks > .section_content button.stuck {
    right: 30px;
    bottom: 30px;
    transform: none;
    position: absolute;
  }
  #daily_tasks {
    transform: translateY(calc(100% - 25px));
  }
  #daily_tasks:hover {
    transform: translateY(calc(100% - 35px));
  }
  #daily_tasks.raised {
    transform: none;
  }
}
</style>
<style>
.radio-group {
  margin-top: 10px;
  padding: 10px;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.radio-group input {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  cursor: pointer;
  pointer-events: all;
  user-select: none;
}
.radio-group label {
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 800;
  opacity: 0.5;
  transition: opacity 0.15s ease-in-out, background-color 0.15s ease-in-out;
  color: var(--primary-bg);
  flex-grow: 1;
  padding: 10px;
  text-align: center;
  user-select: none;
}
.radio-group label:not(:first-of-type):not(:last-of-type) {
  margin: 0 10px;
}
.radio-group input:checked + label {
  opacity: 1;
  background-color: var(--accent-2);
  border-radius: 10px;
  user-select: unset;
}
[v-cloak] {
  display: none;
}
</style>
