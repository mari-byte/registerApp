<template>
  <Form @submit="onSubmit">
    <Field name="name" as="input" rules="required" />
    <ErrorMessage name="name" />
    <br />
    <Field name="email" as="input" rules="required|email" />
    <ErrorMessage name="email" />
    <br />
    <button>Submit</button>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage, defineRule } from "vee-validate";
defineRule("required", (value) => {
  if (!value || !value.length) {
    return "This field is required";
  }
  return true;
});
defineRule("email", (value) => {
  if (!value || !value.length) {
    return true;
  }
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return "This field must be a valid email";
  }
  return true;
});
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {},
  methods: {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },
  },
};
</script>