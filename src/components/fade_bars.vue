<template>
  <div class="fade_bars_section">
    <div class="fade-bar fade-up"></div>
    <div class="fade-content"><slot></slot></div>
    <div class="fade-bar fade-down"></div>
  </div>
</template>

<script>
export default {
  name: "fade_bars",
};
</script>

<style scoped>
.fade_bars_section {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  --bg: var(--accent-4);
  z-index: 0;
}
.fade-content {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
.fade-content > * {
  height: 100%;
  width: 100%;
  flex-grow: 1;
}

.fade_bars_section {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.fade-bar {
  position: absolute;
  height: 30px;
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--bg) 100%);
  z-index: 100;
}
.fade-down {
  bottom: 0;
}
.fade-up {
  top: 0;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, var(--bg) 100%);
}
</style>
