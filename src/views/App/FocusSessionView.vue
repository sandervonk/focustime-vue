<template>
  <main class="focus">
    <h1 class="header-large page-title">Start A Focus Session</h1>
    <fade_bars id="scroll-container">
      <div class="scroll-region">
        <form id="create-session-form" @submit.prevent="startSession">
          <div class="card">
            <div class="card-title header-small">Set a Goal</div>
            <div class="card-subtitle">Choose how long to spend on the selected tasks</div>
            <div class="flex-spacer"></div>
            <div class="radio-group">
              <input type="radio" value="20" name="time-goal" id="time-20" v-model="duration" />
              <label for="time-20">20</label>
              <input
                type="radio"
                checked
                value="40"
                name="time-goal"
                id="time-40"
                v-model="duration"
              />
              <label for="time-40">40</label>
              <input type="radio" value="80" name="time-goal" id="time-80" v-model="duration" />
              <label for="time-80">80</label>
            </div>
          </div>
          <div class="card">
            <div class="card-title header-small">Choose Tasks</div>
            <div class="card-subtitle">Pick some tasks to work on</div>
            <div class="flex-spacer"></div>
            <div id="todo-container">
              <session_task
                v-for="task in tasks"
                :key="task.title"
                :task="task"
                v-model="task.is_selected"
              />
            </div>
          </div>
        </form>
        <div class="flex-spacer"></div>
        <input
          type="submit"
          value="Begin Session"
          :class="{ disabled: !is_ready }"
          @click="startSession"
        />
      </div>
    </fade_bars>
  </main>
</template>

<script>
import fade_bars from "@/components/fade_bars.vue";
import session_task from "@/components/session_task.vue";
import { Toast, WarningToast } from "@/util/util";
export default {
  name: "FocusSessionView",
  components: {
    session_task,
    fade_bars,
  },
  data() {
    return {
      duration: "40",
    };
  },
  methods: {
    startSession() {
      if (!this.is_ready) {
        new WarningToast("Please select some tasks", 1000);
        return;
      }
      new Toast(
        "This feature hasn't been implemented yet, sorry! 🤫",
        "default",
        1500,
        require("@/assets/icon/toast/unimplemented-icon.svg")
      );
    },
  },
  computed: {
    selected_tasks() {
      return this.tasks.filter((task) => task.is_selected);
    },
    tasks() {
      let tasks = this.$store.state.tasks;
      tasks = tasks.filter((task) => !task.completed);
      return tasks;
    },
    is_ready() {
      return this.selected_tasks.length && this.duration;
    },
  },
  watch: {
    // when store tasks change, update tasks
    $store: {
      handler() {
        // force an update to the computed property
        this.tasks;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
}
.card {
  padding: 20px;
  border-radius: 10px;
  background-color: var(--secondary-bg);
  margin: 15px;
  flex-basis: 350px;
  flex-shrink: 0;
  flex-grow: 1;
  /* height: 160px; */
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  text-align: left;
  max-width: 100%;
}
#scroll-container {
  flex-basis: 0;
  flex-grow: 1;
  overflow-y: hidden;
}
#todo-container {
  background-color: var(--accent-4);
  padding: 20px;
  border-radius: 5px;
  margin: 10px -10px -10px -10px;
  width: calc(100% - 20px);
  max-height: 100px;
  text-align: center;
  overflow-y: auto;
  flex-grow: 1;
}
#todo-container:not(:empty) {
  padding-bottom: 10px;
}
#todo-container:empty:before {
  content: "No Tasks Yet";
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  opacity: 0.25;
}
.card-subtitle {
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--primary-bg);
  opacity: 0.5;
}
.card {
  text-align: left;
}
@media (min-width: 400px) {
  input[name="time-goal"] + label::after {
    content: " min";
  }
}
.scroll-region {
  overflow-y: auto;
  padding-top: 15px;
  padding-bottom: 65px;
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
}
/* button */
input[type="submit"] {
  border: none;
  background: var(--primary-bg);
  color: var(--on-primary-bg);
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  outline: 0;
  padding: 10px 20px;
  box-sizing: border-box;
  margin: 0;
  height: 50px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  pointer-events: all;
}
input[type="submit"] {
  max-width: 100%;
  width: calc(100% - 30px);
  margin: 15px auto;
}
input[type="submit"].disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
@media (min-width: 550px) {
  .card,
  input[type="submit"] {
    max-width: 400px;
    min-height: unset;
  }
}
#create-session-form {
  display: flex;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  flex-flow: row wrap;
  flex-shrink: 0;
  flex-grow: 0;
  max-width: 1000px;
}
</style>
