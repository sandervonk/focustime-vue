<template>
  <main class="login">
    <raised_section :title="is_creating ? 'Create your account' : 'Sign In'">
      <input_pair role="name" v-if="is_creating" v-model="auth_form.name" />
      <input_pair role="email" type="email" v-model="auth_form.email" />
      <input_pair role="password" type="password" v-model="auth_form.password" />
      <div id="login-checkboxes" v-if="is_creating">
        <checkbox_pair role="age" v-model="auth_form.age">I'm at least 13 years old</checkbox_pair>
        <checkbox_pair role="terms" v-model="auth_form.terms">I agree to the&nbsp;<router-link to="/terms">terms and conditions</router-link></checkbox_pair>
      </div>
      <div class="flex-spacer"></div>
      <a class="toggletext" style="margin: 0 auto" @click="is_creating = !is_creating">{{ is_creating ? "I already have an account" : "Don't have an account?" }}</a>
      <button class="large_action stuck" @click="prevent" :class="{ disabled: not_done }">Sign Up</button>
    </raised_section>
  </main>
</template>

<script>
import { ref } from "vue";
import raised_section from "../components/raised_section.vue";
// use "raised_section.vue" component
import input_pair from "../components/input_pair.vue";
import checkbox_pair from "../components/checkbox_pair.vue";
// import { ref } from "vue";
// import { useStore } from "vuex";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
export default {
  components: { raised_section, input_pair, checkbox_pair },
  // setup() {
  //   const store = useStore();
  //   const user = ref(store.state.user);
  //   const auth_form = ref({});
  //   return { user, auth_form };
  // },
  data() {
    return {
      is_creating: false,
      auth_form: ref({}),
      not_done() {
        console.log(this.auth_form);
        return !this.auth_form.name || !this.auth_form.email || !this.auth_form.password || !this.auth_form.age || !this.auth_form.terms;
      },
    };
  },
  // update not_done() when auth_form changes
  watch: {
    auth_form: {
      handler() {
        console.log("auth_form changed");
        this.not_done();
      },
      deep: true,
    },
  },
  // log auth_form to the console every second
  created() {
    setInterval(() => {
      console.log(this.auth_form);
    }, 1000);
  },
};
</script>

<style>
body,
html {
  background: var(--accent-1);
}
a.toggletext {
  cursor: pointer;
  user-select: none;
  color: var(--accent-1);
  font-weight: bold;
}
#login-checkboxes {
  margin-top: 10px;
}
a[href],
router-link {
  color: var(--accent-1);
  text-decoration: none;
  font-weight: bold;
}
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
</style>
