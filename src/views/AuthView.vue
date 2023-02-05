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
      <a class="toggletext" @click="is_creating = !is_creating">{{ is_creating ? "I already have an account" : "Don't have an account?" }}</a>
      <button class="large_action stuck" @click="submit_auth" :class="{ disabled: disabled }">Sign Up</button>
    </raised_section>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { WarningToast } from "@/util/util";
import raised_section from "../components/raised_section.vue";
import input_pair from "../components/input_pair.vue";
import checkbox_pair from "../components/checkbox_pair.vue";
function check_email(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export default {
  components: { raised_section, input_pair, checkbox_pair },
  setup() {
    const store = useStore();
    const user = ref(store.state.user);
    const auth_form = ref({});
    return { user, auth_form };
  },

  data() {
    return {
      is_creating: false,
    };
  },
  methods: {
    submit_auth() {
      if (this.disabled) {
        new WarningToast("Please fill out all fields correctly", 10000);
      } else if (this.is_creating) {
        this.$store.dispatch("create_user", this.auth_form);
      } else {
        this.$store.dispatch("sign_in", this.auth_form);
      }
    },
  },

  computed: {
    disabled() {
      return this.is_creating ? !this.auth_form.name || !this.auth_form.email || !check_email(this.auth_form.email) || !this.auth_form.password || !this.auth_form.age || !this.auth_form.terms : !this.auth_form.email || !check_email(this.auth_form.email) || !this.auth_form.password;
    },
  },
};
</script>

<style scoped>
main.login {
  background: var(--accent-1);
  width: 100%;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}
main.login {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
}
a.toggletext {
  cursor: pointer;
  user-select: none;
  color: var(--accent-1);
  font-weight: bold;
  margin: 0 auto;
  padding-top: 10px;
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
