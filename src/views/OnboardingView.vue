<template>
  <div id="body">
    <main id="onboarding">
      <header>
        <object
          id="page-logo"
          :data="require('@/assets/icon/favicon/favicon-monochrome.svg')"
          alt="FocusTime Logo"
          type="image/svg+xml"
        >
          <img alt="icon" :src="require('@/assets/icon/favicon/favicon-monochrome.png')" />
        </object>
        <div id="app-name" class="header-text">FocusTime</div>
      </header>
      <div id="hero-content">
        <div id="hero-text">Make your time work for <i>you</i></div>
        <object
          alt="Hero Image"
          id="hero-img"
          :data="require('@/assets/art/onboarding-art.svg')"
          type="image/svg+xml"
        >
          <img alt="icon" :src="require('@/assets/art/onboarding-art.png')" />
        </object>
      </div>
      <hr id="button-spacer" />
      <button id="get-started" @click="$router.push('/auth')">Get Started</button>
      <div id="stars" style="display: none">
        <object
          alt="star decoration"
          id="star-1"
          class="star"
          :data="require('@/assets/art/star.svg')"
          type="image/svg+xml"
        >
          <img alt="star" :src="require('@/assets/art/star.png')" />
        </object>
        <object
          alt="star decoration"
          id="star-2"
          class="star"
          :data="require('@/assets/art/star.svg')"
          type="image/svg+xml"
        >
          <img alt="icon" :src="require('@/assets/art/star.png')" />
        </object>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#body {
  box-sizing: border-box;
  height: 100%;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Lato, Montserrat, "Open Sans", sans-serif;
  font-size: 14px;
  color: #333;
  background: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
main {
  /* padding: 30px 30px 50px 30px; */
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center !important;
  justify-content: space-between !important;
  box-sizing: border-box;
  height: 100%;
}
header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
#page-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

#hero-content {
  display: flex;
  flex-flow: column;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 37px;
  text-align: center;
  align-items: center;
  justify-content: center;
}
#hero-img {
  margin-top: 30px;
  width: 70%;
  height: auto;
  object-fit: contain;
  object-position: center;
}
#get-started {
  position: fixed;
  bottom: 30px;
  width: calc(100vw - 60px);
  max-width: calc(500px - 60px);
}
#stars {
  display: block !important;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
}
.star {
  position: absolute;
  z-index: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
#star-1 {
  width: 30px;
  top: 10vh;
  left: 75vw;
}
#star-2 {
  width: 50px;
  top: 70vh;
  left: 25vw;
}
/* from common.css */
main {
  max-width: 500px;
  margin: 0 auto;
}
button {
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
#button-spacer {
  background-color: rgba(0, 0, 0, 0);
  color: transparent;
  margin: 0;
  width: 0;
  height: 50px;
  border: none;
  pointer-events: none;
}
#body {
  background-color: var(--accent-1);
}
</style>
