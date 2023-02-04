<template>
  <div class="input-pair">
    <object :title="role_caps + 'Input'" class="input-icon" :alt="role_caps + ' field icon'" :data="require('../assets/icon/' + role + '.svg')" type="image/svg+xml">
      <img alt="icon" :src="'../assets/icon/' + role + '.png'" />
    </object>
    <input type="{{ input_type }}" name="{{role}}" :placeholder="role_caps" @input="handleInput" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["input"],
  name: "input_pair",
  props: {
    role: {
      type: String,
      default: "type",
    },
    input_type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      role_caps: this.role.charAt(0).toUpperCase() + this.role.slice(1),
      value: ref(""),
    };
  },
  methods: {
    handleInput(e) {
      this.value = e.target.value;
      this.$emit("input", this.value);
    },
  },
};
</script>

<style scope>
.input-pair {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 10px 0;
}
.input-pair > .input-icon {
  position: relative;
  margin-right: -70px;
  box-sizing: border-box;
  height: 50px;
  width: 70px;
  padding: 15px 25px;
  font-size: 0px;
  color: transparent;
  overflow: hidden;
  cursor: help;
  user-select: none;
}
.input-pair > input {
  border-radius: 7px;
  border: solid 1px var(--input-secondary);
  transition: border-color 0.2s;
  background-color: rgba(0, 0, 0, 0);
  height: 50px;
  box-sizing: border-box;
  padding: 10px 10px 10px 70px;
  font-size: 18px;
  color: var(--text-primary);
  width: 100%;
  transition: border-color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.input-pair > input::placeholder {
  color: var(--text-secondary);
  font-size: 18px;
}
.input-pair input:-webkit-autofill,
.input-pair input:-webkit-autofill:hover,
.input-pair input:-webkit-autofill:focus,
.input-pair input:-internal-autofill-selected {
  border: solid 1px var(--text-primary) !important;
  color: var(--text-primary-autofill) !important;
  -webkit-text-fill-color: var(--text-primary) !important;
  background: #afe433aa !important;
  appearance: none;
  -webkit-box-shadow: 0 0 0 50px var(--accent-1-transparent) inset !important;
}
</style>
