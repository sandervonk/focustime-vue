<template>
  <main class="create">
    <h1 class="header-large page-title" style="margin: 0">Create a Task</h1>
    <fade_bars id="scroll-container">
      <div id="scroll-region">
        <form id="add-task-form" @submit.prevent="createTask">
          <div class="task-setup-card">
            <div class="card-title header-small">Title &amp; Details</div>
            <div class="card-subtitle">Set a goal for this task</div>
            <div class="flex-spacer"></div>
            <input
              id="task-info-title"
              type="text"
              placeholder="Read pages 12-65..."
              v-model="newtask.title"
            />
          </div>
          <div class="task-setup-card">
            <div class="card-title header-small">Timing</div>
            <div class="card-subtitle">Estimate how long it'll take you to finish this task</div>
            <div class="flex-spacer"></div>
            <div class="radio-group" id="time-radio-group">
              <input
                type="radio"
                value="15"
                name="time-allocated"
                id="time-15"
                v-model="newtask.duration"
              />
              <label for="time-15">15</label>
              <input
                type="radio"
                value="30"
                name="time-allocated"
                id="time-30"
                checked
                v-model="newtask.duration"
              />
              <label for="time-30">30</label>
              <input
                type="radio"
                value="60"
                name="time-allocated"
                id="time-60"
                v-model="newtask.duration"
              />
              <label for="time-60">60</label>
            </div>
          </div>
          <div class="task-setup-card">
            <div class="card-title header-small">Goal Date (Optional)</div>
            <div class="card-subtitle">Pick a date to complete this task by</div>
            <div class="flex-spacer"></div>
            <div id="date-grouping">
              <input
                id="task-info-date"
                v-model="newtask.date"
                type="date"
                :min="new Date().toISOString().split('T')[0]"
                :max="
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                    .toISOString()
                    .split('T')[0]
                "
                aria-label="Completion Date"
              />
              <div
                id="date-pin-icon"
                v-if="!newtask.date || newtask.date == 'pinned'"
                class="alt"
                title="No date provided, task will be pinned"
                @click="
                  newtask.date = new Date(new Date().setDate(new Date().getDate() + 1))
                    .toISOString()
                    .split('T')[0]
                "
              >
                <object
                  id="pin-icon"
                  aria-label="Task Icon"
                  :data="require('@/assets/icon/tasks/pin-date.svg')"
                  type="image/png"
                >
                  <img alt="icon" :src="require('@/assets/icon/tasks/pin-date.png')" />
                </object>
              </div>
              <div
                id="date-pin-icon"
                v-else
                title="Date provided, task will not be pinned"
                @click="newtask.date = ''"
              >
                <object
                  id="pin-icon"
                  aria-label="Task Icon"
                  :data="require('@/assets/icon/tasks/pin-icon.svg')"
                  type="image/png"
                >
                  <img alt="icon" :src="require('@/assets/icon/tasks/pin-icon.png')" />
                </object>
              </div>
            </div>
          </div>
          <div class="task-setup-card">
            <div class="card-title header-small">Class or Tag</div>
            <div class="card-subtitle">Attach a tag or class name to this task</div>
            <div class="flex-spacer"></div>
            <div id="tag-options">
              <select id="task-info-tag" required v-model="newtask.tag">
                <option disabled selected hidden value="">Choose a Class</option>
                <option :value="tag.key" v-for="tag in tags" :key="tag.key">{{ tag.value }}</option>
              </select>
              <input
                type="text"
                id="task-other-title"
                v-if="newtask.tag == 'other'"
                v-model="newtask.other_tag"
                placeholder="Other tag"
              />
            </div>
          </div>
          <div class="task-setup-card" data-role="vite-add-card" v-if="do_vite_card">
            <div class="card-title header-small">VITE! Card (Optional)</div>
            <div class="card-subtitle">
              Connect your VITE! French Practice account to view practice statistics at a glance
            </div>
            <div class="flex-spacer"></div>
            <button id="add-vite-card">Add VITE! Integration</button>
          </div>
        </form>
        <div class="flex-spacer"></div>
        <input
          type="submit"
          value="Create Task"
          :class="{ disabled: !final_vals }"
          @click="createTask"
        /></div
    ></fade_bars>
  </main>
</template>

<script>
import fade_bars from "@/components/fade_bars.vue";
import { WarningToast } from "@/util/util";
export default {
  name: "CreateView",
  components: {
    fade_bars,
  },
  data() {
    return {
      newtask: {
        title: "",
        duration: "30",
        date: "",
        tag: "",
      },
      do_vite_card: false,
    };
  },
  computed: {
    tags() {
      // make an array of objects and keys for each tag
      let tags = [],
        obj = this.$store.state.classes;
      if (obj) {
        delete obj.other;
        for (let tag of Object.keys(obj)) {
          tags.push({ key: tag, value: obj[tag] });
        }
      }
      tags.push({ key: "other", value: "Other" });
      return tags;
    },
    final_vals() {
      let task = { ...this.newtask };
      let ready = true;
      if (task.tag == "other") {
        task.tag = this.newtask.other_tag;
      }
      if (task.date == "") {
        task.date = "pinned";
      }
      for (let key of Object.keys(task)) {
        if (!task[key] || task[key] == "") {
          ready = false;
        }
      }
      return ready ? task : false;
    },
  },
  methods: {
    createTask() {
      let task = this.final_vals;
      if (task) {
        this.$store.dispatch("addTask", task);
        this.newtask = {
          title: "",
          duration: "30",
          date: "",
          tag: "",
        };
        this.$router.push({ path: "/" });
      } else {
        new WarningToast("Please fill out all fields", 1000);
      }
      // reset the form
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
#scroll-container {
  flex-basis: 0;
  flex-grow: 1;
  overflow-y: hidden;
}
#add-task-form {
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
#scroll-region {
  overflow-y: auto;
  padding-top: 15px;
  padding-bottom: 65px;
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
}

.task-setup-card {
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
@media (min-width: 400px) {
  input[name="time-allocated"] + label::after {
    content: " min";
  }
}

.card-subtitle {
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--primary-bg);
  opacity: 0.5;
}
/* card inputs */
#task-info-title,
#task-info-tag,
#task-info-date,
#task-other-title {
  margin-top: 20px;
  font-size: 12px;
  height: 40px;
  width: 100%;
  padding-left: 20px;
  border: solid 1px;
  box-sizing: border-box;
  border-radius: 5px;
  border: solid 1px var(--primary-bg-half);
}
#task-info-date {
  padding-right: 10px;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
}

input::placeholder,
select:invalid {
  color: var(--primary-bg-half) !important;
}

/* special card */
#add-vite-card,
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
  .task-setup-card,
  input[type="submit"] {
    max-width: 400px;
    min-height: unset;
  }
}
/* specials */
#date-grouping {
  margin-top: 20px;
  height: 40px;
}
#date-pin-icon {
  background-color: var(--task-pin);
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  height: 40px;
  width: 40px;
  margin-left: 10px;
}
#date-pin-icon.alt {
  background-color: var(--task-info-3);
}
#date-grouping > input {
  margin-top: 0px;
}
#date-pin-icon > #pin-icon {
  opacity: 0.5;
  height: 40px;
  width: 40px;
  box-sizing: border-box;
  padding: 7px;
  pointer-events: none;
  user-select: none;
}
#tag-options,
#date-grouping {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
#tag-options > select,
#tag-options > input {
  margin-top: 0;
  flex: 1 0 100px;
}
#tag-options > input[type="text"] {
  width: 100%;
  margin-left: 10px;
  flex-grow: 3;
}
</style>
