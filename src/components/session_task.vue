<template>
  <div class="session-task" :class="{ selected: task.is_selected }" @click="toggleTask">
    <div class="session-task-title">{{ title_clean ? title_clean : "Untitled Task" }}</div>
  </div>
</template>

<script>
export default {
  name: "session_task",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  computed: {
    title_clean() {
      // remove any html tags from the title
      return this.task.title.replace(/(<([^>]+)>)/gi, "");
    },
  },
  watch: {
    // watch for prop changes as defined by parent, then update local data
    task: {
      handler() {
        // update all local data
        this.title_clean;
      },
      deep: true,
    },
  },
  methods: {
    toggleTask() {
      this.$emit("update:modelValue", !this.task.is_selected);
    },
  },
};
</script>

<style scoped>
.session-task {
  background-color: var(--secondary-bg);
  border-radius: 20px;
  box-sizing: border-box;
  padding: 5px;
  margin: 0 0 10px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.session-task.selected {
  /* temp */
  background-color: var(--accent-1);
  text-decoration: line-through;
}
.session-task * {
  pointer-events: none;
  user-select: none;
}
.session-task-title {
  font-family: Montserrat, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-basis: 30px;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 10px;
  padding-right: 5px;
  text-align: left;
}

.session-task::before {
  content: "";
  background-color: var(--accent-4);
  background-image: url(../assets/icon/general/check-alt.svg);
  background-size: 24px;
  background-repeat: none;
  background-position: center center;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  z-index: inherit;
  flex-grow: 0;
  flex-shrink: 0;
}
.session-task.selected::before {
  background-color: var(--accent-1);
  background-image: url(../assets/icon/general/check.svg);
  background-size: 28px;
}
</style>
