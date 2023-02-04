<template>
  <main class="raised_section" :class="{ raised: isRaised }">
    <div class="handle-container" @click="isRaised = !isRaised">
      <hr id="handle" />
    </div>
    <div class="section_content">
      <h1 class="title">{{ title }}</h1>
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
      default: "Title",
    },
    raised_setting: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isRaised: true,
    };
  },
  methods: {},
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
}
.raised_section:not(.raised) {
  transform: translateX(-50%) translateY(calc(100% - 25px));
}
.raised_section:not(.raised):hover {
  transform: translateX(-50%) translateY(calc(100% - 35px));
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
  justify-content: start;
  pointer-events: all;
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
</style>
