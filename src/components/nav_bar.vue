<template>
  <nav id="nav_bar">
    <div
      class="nav-item"
      :class="{ active: $route.path === '/' }"
      id="home"
      @click="$router.push('/')"
    >
      <object
        class="icon-primary"
        title="Tab Icon"
        :data="require('../assets/icon/nav/home.svg')"
        type="image/svg+xml"
      >
        <img alt="icon" :src="require('../assets/icon/nav/home.png')" />
      </object>
      <object
        class="icon-alt"
        title="Inactive Tab Icon"
        :data="require('../assets/icon/nav/home-alt.svg')"
        type="image/svg+xml"
      >
        <img alt="icon" :src="require('../assets/icon/nav/home-alt.png')" />
      </object>
    </div>
    <div
      class="nav-item"
      id="add"
      @click="$router.push('/create')"
      :class="{ active: $route.path === '/create' }"
    >
      <object
        class="icon-primary"
        title="Tab Icon"
        :data="require('../assets/icon/nav/add.svg')"
        type="image/svg+xml"
      >
        <img alt="icon" :src="require('../assets/icon/nav/add.png')" />
      </object>
      <object
        class="icon-alt"
        title="Inactive Tab Icon"
        :data="require('../assets/icon/nav/add-alt.svg')"
        type="image/svg+xml"
      >
        <img alt="icon" :src="require('../assets/icon/nav/add-alt.png')" />
      </object>
    </div>
    <div
      class="nav-item"
      id="session"
      @click="$router.push('/session')"
      :class="{ active: $route.path === '/session' }"
    >
      <object
        class="icon-primary"
        title="Tab Icon"
        :data="require('../assets/icon/nav/session.svg')"
        type="image/svg+xml"
      >
        <img alt="icon" :src="require('../assets/icon/nav/session.png')" />
      </object>
      <object
        class="icon-alt"
        title="Inactive Tab Icon"
        :data="require('../assets/icon/nav/session-alt.svg')"
        type="image/svg+xml"
      >
        <img alt="icon" :src="require('../assets/icon/nav/session-alt.png')" />
      </object>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  background-color: var(--footer);
  height: 80px;
  width: 100vw;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  /* position: fixed; */
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: stretch;
  padding: 0;
}
.nav-item {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  pointer-events: all;
  cursor: pointer;
}
.nav-item > * {
  height: 25px;
  width: 25px;
  pointer-events: none;
  position: absolute;
}
.icon-alt,
.icon-primary {
  transition: opacity 0.25s ease-in-out;
  opacity: 1;
}
.icon-alt {
  opacity: 0.5;
}
.nav-item.active .icon-alt,
.nav-item:not(.active) .icon-primary {
  opacity: 0 !important;
}
</style>
