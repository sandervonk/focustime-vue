<template>
  <div
    class="loading_screen"
    :showing="!hidden"
    :class="{ loading_screen__animateout: animate_out }"
  >
    <div class="loading_screen__content">
      <div class="loading_screen__content__icon">
        <img
          id="loading_screen__img"
          :src="require('@/assets/icon/favicon/favicon-monochrome.svg')"
          alt="loading icon"
        />
      </div>
      <div class="loading_screen__content__text">
        <h1>
          <slot
            >Loading
            {{
              this.$route.meta
                ? this.$route.meta.page_title
                  ? this.$route.meta.page_title.toLowerCase()
                  : "..."
                : "..."
            }}</slot
          >
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
let start_time = Date.now();
let end_time = null;
export default {
  name: "LoadingScreen",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hidden: false,
      animate_out: false,
    };
  },
  mounted() {
    if (this.show) {
      this.hidden = false;
    }
  },
  watch: {
    //watch show prop
    show: {
      handler: function (val, prev) {
        if (!val && end_time == null) {
          end_time = Date.now();
          if (end_time - start_time < 300) {
            this.hidden = true;
          } else {
            this.animate_out = true;
            setTimeout(() => {
              this.hidden = true;
              this.animate_out = false;
            }, 500);
          }
        } else if (val && !prev) {
          start_time = Date.now();
          end_time = null;
          this.hidden = false;
          this.animate_out = false;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
.loading_screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--loading-screen);
  /* backdrop-filter: blur(5px); */
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading_screen__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loading_screen__content__icon {
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
  user-select: none;
  pointer-events: none;
}
.loading_screen__content__icon img {
  width: 100%;
  height: 100%;
}
@keyframes loading_throb {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
#loading_screen__img {
  animation: loading_throb 5s ease infinite;
}
.loading_screen__animateout {
  animation: loading_screen__animateout 500ms ease forwards;
}
.loading_screen__animateout #loading_screen__img {
  animation: spinout 500ms ease forwards;
}
@keyframes spinout {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(0);
    opacity: 0;
  }
}
@keyframes loading_screen__animateout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
    pointer-events: none;
    user-select: none;
  }
}
[showing="false"] {
  display: none;
  pointer-events: none;
  user-select: none;
}
</style>
