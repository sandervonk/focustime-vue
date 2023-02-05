<template>
  <div class="input-pair">
    <input type="checkbox" :name="role + '-input'" :id="role + '-input'" @input="handleInput" :checked="modelValue" />
    <label :for="role + '-input'" class="checkbox-label">
      <div class="checkbox-icon"></div>
      <slot>Checkbox Label</slot></label
    >
  </div>
</template>

<script>
export default {
  name: "checkbox_pair",
  props: {
    role: {
      type: String,
      default: "type",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      role_caps: this.role.charAt(0).toUpperCase() + this.role.slice(1),
    };
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput(e) {
      this.$emit("update:modelValue", e.target.checked);
    },
  },
};
</script>

<style scoped>
.input-pair {
  margin: 10px 0;
}
.input-pair,
label {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.checkbox-label {
  color: var(--login-secondary);
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  transition: color 0.1s ease-out;
}

input:checked + .checkbox-label {
  color: var(--accent-1);
}
.checkbox-label .checkbox-icon {
  width: 25px;
  height: 25px;
  border-radius: 50px;
  background-color: var(--login-secondary);
  margin-right: 10px;
  background-image: url(../assets/icon/general/check-alt.png);
  background-image: url(../assets/icon/general/check-alt.svg);
  background-repeat: no-repeat;
  background-size: contain;
  transition: background-color 0.1s ease-out;
}
input:checked + .checkbox-label .checkbox-icon {
  background-color: var(--login-accent);
  background-image: url(../assets/icon/general/check.png);
  background-image: url(../assets/icon/general/check.svg);
}
.input-pair > input[type="checkbox"] {
  position: absolute;
  height: 0px;
  width: 0px;
  z-index: -1;
  opacity: 0;
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
