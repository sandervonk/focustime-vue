<template></template>

<script>
export default {
  data: function () {
    return {
      status: "normal",
    };
  },

  mounted() {
    window.ipc.on("winState", (event, msg) => {
      this.status = msg;
    });
  },
  methods: {
    winMinimize() {
      if (window.csxAPI.envMode === "electron") {
        window.csxAPI.minimize();
      }
    },
    winMaximize() {
      if (window.csxAPI.envMode === "electron") {
        window.csxAPI.maximize();
      }
    },
    winRestore() {
      if (window.csxAPI.envMode === "electron") {
        window.csxAPI.restore();
      }
    },
    winClose() {
      if (window.csxAPI.envMode === "electron") {
        window.csxAPI.close();
      }
    },
  },
};
</script>

<style scoped></style>
