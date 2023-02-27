<template>
  <div
    class="flex-horiz-break show-in-desktop"
    v-if="task.is_separator"
    style="display: none"
  ></div>
  <div
    class="task-card"
    :class="{ editing: is_editing, pinned: is_pinned, completed: is_completed }"
    v-touch:swipe="swipeHandler"
    v-if="!task.is_separator"
  >
    <!-- swipe pin -->
    <div class="task-card-swipe-pin">
      <object
        class="task-card-pin-icon"
        aria-label="Task Icon"
        :data="require('../assets/icon/tasks/pin-icon.svg')"
        type="image/png"
      >
        <img alt="icon" :src="require('../assets/icon/tasks/pin-icon.png')" /></object
      ><object
        class="task-card-pin-icon alt-icon"
        aria-label="Task Icon"
        :data="require('../assets/icon/tasks/pin-icon-alt.svg')"
        type="image/svg+xml"
      >
        <img alt="icon" :src="require('../assets/icon/tasks/pin-icon-alt.png')" />
      </object>
    </div>
    <div class="task-card-content">
      <!-- content -->
      <task_info_card :task="task" />

      <div data-role="edit-card" class="task-card-action" @click="toggleEditing">
        <object
          class="task-card-action-icon edit-icon"
          aria-label="Task Icon"
          :data="require('../assets/icon/tasks/edit-icon.svg')"
          type="image/png"
        >
          <img alt="icon" :src="require('../assets/icon/tasks/edit-icon.png')" />
        </object>
        <object
          class="task-card-action-icon editing-icon"
          aria-label="Task Icon"
          :data="require('../assets/icon/tasks/editing-icon.svg')"
          type="image/png"
        >
          <img alt="icon" :src="require('../assets/icon/tasks/editing-icon.png')" />
        </object>
      </div>
      <!-- edit -->
    </div>
    <!-- swipe actions -->
    <div class="task-card-swipe">
      <div class="task-card-swipe-done" v-if="!is_completed" @click="handleComplete">
        <object
          class="task-card-swipe-icon"
          aria-label="Task Icon"
          :data="require('../assets/icon/tasks/done-icon.svg')"
          type="image/png"
        >
          <img alt="icon" :src="require('../assets/icon/tasks/done-icon.png')" />
        </object>
      </div>
      <div class="task-card-swipe-archive" @click="handleArchive">
        <object
          class="task-card-swipe-icon"
          aria-label="Task Icon"
          :data="require('../assets/icon/tasks/archive-icon.svg')"
          type="image/png"
        >
          <img alt="icon" :src="require('../assets/icon/tasks/archive-icon.png')" />
        </object>
      </div>
    </div>
  </div>

  <div class="task-section-header" v-else :timestamp="task.date">
    <span>{{ task.title }}</span>
  </div>
</template>

<script>
// import libaries to use to archive this task or mark it as complete in firebase firestore

import { Toast } from "@/util/util";
import task_info_card from "./task_info_card";
String.prototype.hashCode = function () {
  let hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
export default {
  name: "task_card",
  components: {
    task_info_card,
  },
  props: {
    task: {
      type: Object,
      default() {
        return {
          date: "",
          is_completed: false,
          tag: "other",
          time: 30,
          title: "Task Title",
        };
      },
    },
  },
  computed: {
    task_id() {
      return this.task.title ? this.task.title.hashCode() : "separator";
    },
  },
  data() {
    return {
      is_completed: this.task.is_completed,
      is_editing: false,
      is_pinned: false,
    };
  },
  methods: {
    swipeHandler(direction) {
      if (direction === "left") {
        this.is_editing = true;
        this.is_pinning = false;
        this.$emit("edit", this.task_id);
      } else if (direction === "right") {
        if (this.is_editing) {
          this.is_editing = false;
          this.is_pinning = false;
        } else {
          this.is_pinning = true;
        }
      }
    },
    toggleEditing() {
      this.is_editing = !this.is_editing;
    },
    togglePinned() {
      this.is_pinned = !this.is_pinned;
    },
    handleComplete() {
      this.is_completed = !this.is_completed;
      this.$store.dispatch("completeTask", this.task);
      // toast
      this.editing = false;
      new Toast(
        "Task marked as done!",
        "default",
        1000,
        require("@/assets/icon/toast/success-icon.svg")
      );
    },
    handleArchive() {
      this.$el.classList.add("swipe-out-archive");
      setTimeout(() => {
        this.$store.dispatch("archiveTask", this.task);
        this.$el.remove();
      }, 500);
      // toast
      new Toast("Task archived!", "default", 1000, require("@/assets/icon/toast/archive-icon.svg"));
    },
  },
  watch: {
    // watch for prop changes as defined by parent, then update local data
    task: {
      handler: function (newVal) {
        if (newVal.is_completed !== this.is_completed) {
          setTimeout(() => {
            this.editing = false;
          }, 500);
        }

        this.is_completed = newVal.is_completed;
        this.task_id;
      },
      deep: true,
    },
  },
};
</script>

<style>
.task-card {
  border-radius: 15px;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  margin: 10px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;
  max-height: 110px;
  height: 110px;
  position: relative;
  transition: transform 0.5s ease-out, opacity 0.25s ease-out, height 0.25s ease-out,
    margin 0.25s ease-out;
  transform-origin: left center;
  flex-shrink: 0;
  flex-grow: 0;
}
.task-card.swipe-out {
  transform: scale(0);
  opacity: 0;
  margin: 0;
  height: 0;
}
.task-card.swipe-out:only-child,
.task-card.swipe-out:last-child {
  height: 110px;
}

.task-card-content {
  position: relative;
  background-color: var(--task-bg);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  align-items: stretch;
  flex-flow: row;
  overflow: hidden;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  margin-left: 0;
  transition: margin-left 0.15s ease-out, background-color 0.15s ease-out;
  z-index: 1;
}
iframe.task-card-content,
.iframe-content.task-card-content {
  padding: 0 !important;
}
.task-card.editing > .task-card-content {
  margin-left: -150px;
  user-select: none;
}
.task-card.editing.completed > .task-card-content {
  margin-left: -75px !important;
}
.task-card .task-card-title {
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-bg);
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
.task-card.completed:not(.completed):not(.editing) .task-card-title {
  /* for title hover */
  pointer-events: all;
  cursor: help;
}
.task-card-tag {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-bg-half);
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.task-card-action {
  opacity: 0;
  position: relative;
  transform: translate(calc(100% + 10px), calc(100% + 10px));
  width: 40px;
  height: 40px;
  margin-left: -40px;
  margin-top: auto;
  /* margin-right: -10px;
  margin-bottom: -10px; */
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--task-action);
  border-radius: 10px;
  flex-shrink: 0;
  flex-grow: 0;
}
.iframe-content .task-card-action {
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: -50px;
  box-shadow: 0 0 10px var(--primary-bg-transparent);
}
.task-card-action * {
  pointer-events: none;
  user-select: none;
  width: 24px;
  height: 24px;
  position: absolute;
  transition: opacity 0.15s ease-in-out;
}
.task-card:hover .task-card-action,
.task-card:active .task-card-action,
.task-card:focus .task-card-action,
.task-card.editing .task-card-action {
  opacity: 1;
  transform: none;
}
.task-card.editing .task-card-action {
  box-shadow: 0 0 10px var(--primary-bg-transparent);
  background-color: var(--task-action-alt);
}

.task-card-action .editing-icon {
  opacity: 0;
}
.task-card-action .edit-icon {
  opacity: 1;
}
.task-card.editing .task-card-action .editing-icon {
  opacity: 1;
}
.task-card.editing .task-card-action .edit-icon {
  opacity: 0;
}
.task-card-swipe {
  width: 60px;
  /* width: 150px; */
  padding-left: 15px;
  margin-left: -15px;
  flex-shrink: 0;
  flex-grow: 0;
  transition: width 0.15s ease-in-out, transform 0.15s ease-out;
  background-color: #ffffff4d;
  display: flex;
  flex-flow: row nowrap;
  z-index: 0;
  transform-origin: left center;
  /* transform: scaleX(0.1); */
}
.task-card.editing .task-card-swipe {
  transform: none;
  width: 150px;
}
.task-card-swipe > * {
  width: 50%;
  margin-left: -15px;
  padding-left: 15px;
  border-radius: 0 15px 15px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  cursor: pointer;
}
.task-card-swipe-pin {
  display: flex;
  justify-content: center;
  align-items: center;
}
.task-card-swipe-icon,
.task-card-pin-icon {
  opacity: 0.3;
  width: 30px;
  height: 30px;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.15s ease-out;
}
.task-card:not(.editing) .task-card-swipe-icon {
  opacity: 0;
}
/* more imports */

.task-card-swipe-pin {
  background-color: var(--task-pin);
  width: 60px;
  padding-right: 15px;
  margin-right: -75px;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: content-box;
}
.task-card.pinning .task-card-swipe-pin {
  animation: showpin 0.75s ease;
}
.task-card-swipe-archive {
  background-color: var(--task-archive);
  z-index: 1;
}
.task-card-swipe-done {
  background-color: var(--task-done);
  z-index: 2;
}
/* pin icon */
.task-card.pinned .task-card-pin-icon.alt-icon,
.task-card:not(.pinned) .task-card-pin-icon:not(.alt-icon) {
  display: flex;
}
.task-card:not(.pinned) .task-card-pin-icon.alt-icon,
.task-card.pinned .task-card-pin-icon:not(.alt-icon) {
  display: none;
}
.task-card.swipe-out-archive {
  margin-top: -55px !important;
  margin-bottom: -55px !important;
  opacity: 0 !important;
  transform: translateX(-100%) scale(0) !important;
  transform-origin: center left;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out, margin 0.5s ease-out !important;
}
/* completed */

.task-card.completed > .task-card-content {
  position: relative;
  background-color: #e0ead7;
}
.task-card.completed .task-card-action {
  filter: none !important;
  z-index: 20 !important;
  opacity: 1 !important;
}
.task-card.completed > .task-card-content::before {
  position: absolute;
  width: 100%;
  height: 100%;
  content: "\2705";
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 600;
  box-sizing: border-box;
  padding: 10px;
  top: 0;
  left: 0;
}
.task-card.completed > .task-card-content > * {
  opacity: 0.25;
  filter: blur(2px);
}
</style>
<style scoped>
.task-section-header {
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-bg);
  margin: 5px auto 0 auto;
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.75;
  width: fit-content;
}

.task-section-header:first-child,
.task-section-header:nth-child(2) {
  margin-top: 0;
}
.time-section-break {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  height: 80px;
  background-image: url(@/assets/art/nothing.svg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
.flex-horiz-break {
  flex-basis: 100%;
  width: 0 !important;
}
.flex-horiz-break:first-child {
  display: none !important;
}
</style>
