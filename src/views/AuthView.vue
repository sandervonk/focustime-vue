<template>
  <main class="login">
    <raised_section :title="is_creating ? 'Create your account' : 'Sign In'">
      <input_pair role="name" v-if="is_creating" v-model="auth_form.name" />
      <input_pair role="email" type="email" v-model="auth_form.email" />
      <input_pair role="password" type="password" v-model="auth_form.password" />
      <div id="login-checkboxes" v-if="is_creating">
        <checkbox_pair role="age" v-model="auth_form.age">I'm at least 13 years old</checkbox_pair>
        <checkbox_pair role="terms" v-model="auth_form.terms"
          >I agree to the&nbsp;<router-link to="/terms"
            >terms and conditions</router-link
          ></checkbox_pair
        >
      </div>
      <div class="flex-spacer"></div>
      <a class="toggletext" @click="is_creating = !is_creating">{{
        is_creating ? "I already have an account" : "Don't have an account?"
      }}</a>
      <button class="large_action stuck" @click="submit_auth" :class="{ disabled: disabled }">
        {{ is_creating ? "Sign Up" : "Sign In" }}
      </button>
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
        if (
          this.is_creating &&
          this.auth_form.name &&
          this.auth_form.email &&
          this.auth_form.password
        ) {
          let warnings = [];
          if (!this.auth_form.terms) warnings.push("agree to the terms and conditions");

          if (!this.auth_form.age) warnings.push("confirm your age");

          new WarningToast("Please " + warnings.join(" and ") + " to create an account", 10000);
        } else {
          new WarningToast(
            "Please correctly fill out all fields to " +
              (this.is_creating ? "create an account" : "login"),
            5000
          );
        }
      } else if (this.is_creating) {
        this.$store.dispatch("create_user", this.auth_form);
      } else {
        this.$store.dispatch("sign_in", this.auth_form);
      }
    },
  },

  computed: {
    disabled() {
      return this.is_creating
        ? !this.auth_form.name ||
            !this.auth_form.email ||
            !check_email(this.auth_form.email) ||
            !this.auth_form.password ||
            !this.auth_form.age ||
            !this.auth_form.terms
        : !this.auth_form.email || !check_email(this.auth_form.email) || !this.auth_form.password;
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
</style>

<style>
/* styles for large screens */
@media (min-width: 800px) and (min-height: 800px) {
  main.login {
    width: 600px;
  }
  main.login .handle-container {
    display: none;
  }
  main.login main.raised_section {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: fit-content !important;
    max-height: unset;
    flex-basis: unset;
    min-height: unset;
    display: block;
    max-height: unset;
  }
  main.login main.raised_section .section_content {
    border-radius: 25px !important;
    padding-bottom: 30px !important;
    flex-grow: 0;
    height: unset !important;
    max-height: unset;
    overflow-y: unset;
    box-sizing: border-box;
  }
  main.login button.large_action {
    position: unset;
    transform: none;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
