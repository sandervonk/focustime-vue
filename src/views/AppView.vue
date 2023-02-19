<template>
  <main class="appmain">
    <!-- <router-view v-slot="{ Component }">
      <transition
        :enter-active-class="route.meta.enterClass"
        :leave-active-class="route.meta.leaveClass"
      >
        <component :is="Component"
      /></transition>
    </router-view> -->
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
        <div class="data-card" id="card-completed">
          <div data-role="progress-completed" class="header-large">
            {{ num_completed ? num_completed : "—" }}
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
import { Popup } from "@/util/util";
import nav_bar from "@/components/nav_bar.vue";
import raised_section from "@/components/raised_section.vue";
export default {
  name: "AppView",
  components: {
    nav_bar,
    raised_section,
  },
  data() {
    return {};
  },

  // load tasks from firebase
  created() {
    this.$store.dispatch("get_doc");
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
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
    $route(to, from) {
      if (to.path !== "/") {
        this.$refs.daily_tasks.isRaised = false;
      } else if (to.path === "/") {
        this.$refs.daily_tasks.isRaised = true;
      }
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
/* list */
div[data-role="tasks-list"] {
  flex-flow: column nowrap;
  display: flex;
  width: 100%;
  flex-grow: 0;
  box-sizing: border-box;
  flex-basis: 0px;
  height: 0px;
  overflow-y: auto;
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
    margin: 0 auto;
    border-radius: 20px 20px 0 0;
    transition: width 0.5s ease, border-radius 0.5s ease;
  }
}
@media (min-width: 760px) {
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
