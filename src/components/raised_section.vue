<template>
  <main class="raised_section" :class="{ raised: isRaised }" :style="'height:' + height">
    <div class="handle-container" @click="isRaised = !isRaised">
      <hr id="handle" />
    </div>
    <div class="section_content" :class="{ bottomgap: gap_bottom }">
      <h1 class="title" v-if="has_title">{{ title }}</h1>
      <div class="slot-content">
        <slot>Raised Content</slot>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "raised_section",
  props: {
    title: {
      type: String,
      default: "",
    },
    raised_setting: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: "75vh",
    },
    gap_bottom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isRaised: true,
    };
  },
  computed: {
    has_title() {
      return this.title !== "";
    },
  },
  methods: {
    toggle() {
      this.isRaised = !this.isRaised;
    },
  },
};
</script>

<style scoped>
.raised_section > .handle-container {
  cursor: pointer;
  border-radius: 25px;
  padding: 10px;
  margin: 0 auto;
  width: 95px;
  box-sizing: content-box;
  pointer-events: all;
}
.raised_section > .handle-container > #handle {
  height: 5px;
  border-radius: 5px;
  width: 95px;
  background-color: var(--handle);
  border: none;
  margin: 0;
  pointer-events: none;
}
.raised_section {
  /* positioning */
  height: 75vh;
  max-height: 500px;
  max-width: 500px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  min-height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  /* transition */
  transition: transform 0.5s ease;
  z-index: 1;
}
@media (max-height: 500px) {
  .raised_section {
    max-height: calc(100vh - 80px);
  }
}
.raised_section:not(.raised) {
  transform: translateX(-50%) translateY(calc(100% - 25px));
}
.raised_section:not(.raised):hover {
  transform: translateX(-50%) translateY(calc(100% - 35px));
}
.raised_section:not(.raised):has(.section_content.bottomgap) {
  transform: translateX(-50%) translateY(calc(100% - 25px - 20px));
}
.raised_section:not(.raised):has(.section_content.bottomgap):hover {
  transform: translateX(-50%) translateY(calc(100% - 35px - 20px));
}
.raised_section > .section_content {
  overflow-y: auto;
  padding-bottom: 30px;
  background-color: var(--secondary-bg);
  color: var(--on-secondary);
  box-shadow: 0 0 30px var(--primary-bg-transparent);
  flex-grow: 1;
  /* from prev */
  padding: 30px;
  border-radius: 50px 50px 0 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: flex-start;
  pointer-events: all;
}
.raised_section > .section_content.bottomgap {
  padding-bottom: 50px;
}
.raised_section > .section_content > h1.title {
  font-size: 26px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  margin-top: 0;
}
.raised_section > .section_content::-webkit-scrollbar {
  display: none;
}
.raised_section > .section_content > .slot-content {
  text-align: left;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  flex-grow: 1;
}
a[href],
router-link {
  color: var(--login-accent);
  text-decoration: none;
  font-weight: bold;
}
.raised_section:has(button.large_action.stuck) .section_content {
  padding-bottom: 110px;
}
.raised_section:has(button.large_action.stuck) .section_content.bottomgap {
  padding-bottom: 130px;
}
</style>
<style>
button.large_action {
  border: none;
  background: var(--primary-bg);
  color: var(--on-primary-bg);
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
  height: 50px;
  width: calc(100% - 2 * var(--pad-button));
  max-width: 500px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  pointer-events: all;
}
button.large_action.stuck {
  --pad-button: 30px;
  position: fixed;
  bottom: var(--pad-button);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  margin: 0;
}

.bottomgap button.large_action.stuck {
  bottom: calc(var(--pad-button) + 20px);
  box-shadow: 0 0 30px 10px var(--secondary-bg);
}
</style>
