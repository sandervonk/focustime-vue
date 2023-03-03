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

    <fade_bars id="scroll-container">
      <div
        data-role="tasks-list"
        :class="{ 'flex-center': !tasks || !tasks.length }"
        id="scroll-region"
      >
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
function makeDateTitle(date, pinned = false) {
  if (!date || date == "pinned") {
    return "Pinned";
  } else if (new Date().toISOString().split("T")[0] == date) {
    return "Today";
  } else {
    //format date and add th, nd, st, etc endings
    let formatted_date = new Date(date).toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
    let day = formatted_date.split(" ")[2],
      day_endings = ["th", "st", "nd", "rd"];
    let day_ending = day_endings[0];
    if (day > 3 && day < 21) {
      day_ending = day_endings[0];
    } else {
      switch (day % 10) {
        case 1:
          day_ending = day_endings[1];
          break;
        case 2:
          day_ending = day_endings[2];
          break;
        case 3:
          day_ending = day_endings[3];
          break;
      }
    }
    return formatted_date.split(" ").slice(0, 2).join(" ") + " " + day + day_ending;
  }
}
let day_to_ms = 24 * 60 * 60 * 1000;
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
      let tasks = [...this.$store.getters.get_tasks];
      tasks = tasks.sort((a, b) => {
        // pinned
        if ((a.pinned && !b.pinned) || (a.date == "pinned" && b.date != "pinned")) return -1;
        if ((!a.pinned && b.pinned) || (a.date != "pinned" && b.date == "pinned")) return 1;
        // no date
        if (!a.date && b.date) return -1;
        if (a.date && !b.date) return 1;
        // date
        if (a.date && b.date) {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
        }
        return 0;
      });

      // filter out completed tasks if setting is set
      if (this.$store.state.settings && this.$store.state.settings.do_hide_complete) {
        tasks = tasks.filter((task) => !task.is_completed);
      } else {
        let today_date = new Date(new Date().toISOString().split("T")[0]);
        tasks = tasks.filter((task) => {
          if (!task.is_completed) return true;
          if (!task.date || isNaN(new Date(task.date))) return true;
          if (new Date(task.date).getTime() >= today_date.getTime() - day_to_ms) return true;
          return false;
        });
      }
      // add section headers for each date
      let last_date = null;
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (last_date != task.date) {
          let date = new Date(task.date),
            date_string = "",
            date_title = "";
          if (isNaN(date)) {
            date = "Pinned";
            date_string = "Pinned";
            date_title = "Pinned";
          } else {
            date_string = date.toISOString().split("T")[0];
            date_title = makeDateTitle(date);
          }
          if (date_string != last_date) {
            last_date = date_string;
            tasks.splice(i, 0, {
              is_separator: true,
              date: date_string,
              title: date_title,
            });
            i++;
          }
        }
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
/* scroll stuff */
#scroll-container {
  flex-basis: 0;
  flex-grow: 1;
  overflow-y: hidden;
}

#scroll-region {
  overflow-y: auto;
  padding-top: 25px;
  padding-bottom: 65px;
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
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
