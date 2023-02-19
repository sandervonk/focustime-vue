<template>
  <div class="task-card-widgets">
    <div class="task-card-time-widget">
      <object
        class="task-card-widget-icon"
        aria-label="Task Icon"
        :data="require('../assets/icon/tasks/clock-icon.svg')"
        type="image/png"
      >
        <img alt="icon" :src="require('../assets/icon/tasks/clock-icon.png')" /></object
      ><span class="task-card-time">{{ task.time }} minutes</span>
    </div>
    <div class="task-card-date-widget">
      <object
        class="task-card-widget-icon"
        aria-label="Task Icon"
        :data="require('../assets/icon/tasks/date-icon.svg')"
        type="image/png"
      >
        <img alt="icon" :src="require('../assets/icon/tasks/date-icon.png')" /></object
      ><span class="task-card-time">{{ task_date }}</span>
    </div>
  </div>
  <hr />
  <div class="task-card-info">
    <div class="task-card-title" :title="task.title">{{ title_clean }}</div>
    <div class="task-card-tag">{{ get_tag }}</div>
  </div>
</template>

<script>
export default {
  name: "task_info_card",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    title_clean() {
      // remove any html tags from the title
      return this.task.title.replace(/(<([^>]+)>)/gi, "");
    },
    task_date() {
      return this.task.date && this.task.date != "priority" ? this.task.date : "No Goal Date";
    },
    get_tag() {
      // get tag text from classes array (store.classes), return the value if it exists, the tag if not
      let tag = this.task.tag,
        classes = this.$parent.$store.state.classes;
      return classes[tag] ? classes[tag] : tag;
    },
  },
  watch: {
    // watch for prop changes as defined by parent, then update local data
    task: {
      handler() {
        // update all local data
        this.title_clean;
        this.task_date;
        this.get_tag;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.task-card-widgets {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 90px;
  width: 40px;
  z-index: 10;
}
.task-card-widgets + hr {
  margin: auto 10px;
  border: none;
  background-color: var(--handle);
  width: 3px;
  height: 70px;
  border-radius: 10px;
  flex-shrink: 0;
  flex-grow: 0;
}
.task-card-widgets > div {
  display: flex;
  justify-content: space-between;
  text-align: left;
  align-items: center;
  cursor: pointer;
  flex-grow: 0;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 7px;
  white-space: nowrap;
  text-overflow: clip;
  transition: width 0.15s ease-in-out, box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out;
  transform-origin: 20px center;
  font-size: 14px;
}
.task-card-widgets > div:hover {
  width: 150px;
  box-shadow: 0 0 10px var(--primary-bg-transparent);
  transform: scale(1.1);
}
.task-card-time-widget {
  background-color: var(--task-info-1);
}
.task-card-date-widget {
  background-color: var(--task-info-2);
}
.task-card-widget-icon {
  margin-right: 10px;
  mix-blend-mode: darken;
  opacity: 0.5;
  width: 20px;
  height: 20px;
  pointer-events: none;
  user-select: none;
}
.task-card-action {
  cursor: pointer;
}
.task-card-info {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  pointer-events: none;
  text-align: left;
}
</style>
