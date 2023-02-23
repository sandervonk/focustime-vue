<template>
  <router-view />
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,600;1,700&family=Roboto:wght@400;500;600;700&display=swap");
#app > main {
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: stretch;
}
html {
  background-color: var(--bg);
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: stretch;
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overscroll-behavior: none;
  overflow: hidden;
}
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  /* sizing */
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: stretch;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style>
:root {
  --primary-bg: #2e271c;
  --primary-bg-transparent: #2f281d33;
  --primary-bg-half: #2f281d80;
  --secondary-bg: #fff;
  --secondary-bg-half: #ffffff80;
  --on-secondary: #333;
  --on-primary-bg: #fff;
  --on-secondary-bg: #2e271c;
  --accent-1: #d4edbf;
  --accent-2: #ffe7ab;
  --accent-1-transparent: hsl(93, 56%, 94%);
  --accent-2-alt: #fffb9e;
  --accent-3: #f6cd64;
  --scrollbar-transparent: #2f281d33;
  --accent-4: #faf4f2;
  --accent-5: #ffc6ab;
  --handle: #0000001a;
  /*login*/
  --login-box-bg: #ffffff0a;
  --login-secondary: #c2c2c2a4;
  --input-secondary: #c2c2c2a4;
  --login-accent: var(--accent-1);
  --login-accent-2: var(--accent-3);
  /*more login*/
  --text-primary: #c9c9c9;
  --text-primary-autofill: #84b25e;
  /*app*/
  --footer: #fff;
  /*toast*/
  --toast-bg: #edebe4;
  --toast-bg-transparent: #edebe4aa;
  --toast-text: #474743;
  --toast-border: hsl(0, 0%, 78%);
  --toast-secondary: hsl(0, 0%, 90%);
  /*popup*/
  --primary: #658023;
  --primary-container: #dde7bf;
  --on-primary: #ffffff;
  --on-primary-container: #001f26;
  --popup-bg: #edebe4;
  --on-popup-bg: #474743;
  --popup-red: #93000a;
  /*tasks*/
  --task-bg: var(--secondary-bg);
  --task-action: #ffe7ab;
  --task-action-alt: #ffc6ab;
  --task-info-1: #bfedeb;
  --task-info-2: #d4edbf;
  --task-info-3: #bfc9ed;
  --task-archive: #bfcfed;
  --task-done: #d4edbf;
  --task-pin: #d6bfed;
}
/* general styles */

input[type="button"],
[auth="logout-button"],
[onclick],
a[href],
*[form-action],
button {
  cursor: pointer;
  user-select: none;
}
button[disabled],
button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.flex-spacer {
  flex: 1 1 auto;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-grow {
  flex-grow: 1;
}
.header-text {
  font-size: 26px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}
.header-small {
  font-size: 17px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}
.header-large {
  font-size: 34px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
</style>
