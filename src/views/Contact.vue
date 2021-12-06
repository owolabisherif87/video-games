<template>
  <div class="contact-form-container">
    <div class="contact-form-wrapper">
      <h1>Get In Touch</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        facilis non ad, et dolores nobis odit odio voluptate rerum esse. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi eveniet eligendi
        vitae placeat totam.
      </p>
      <form @submit.prevent="submit">
        <div class="error" v-if="error">
          <p>{{ error }}</p>
        </div>
        <h4>Contact Form</h4>
        <div class="form-group">
          <div>
            <label for="name">Name<span class="required">*</span></label>
            <input type="text" v-model="form.name" />
          </div>
          <div>
            <label for="email"
              >Email Address<span class="required">*</span></label
            >
            <input type="mail" v-model="form.email" />
          </div>
        </div>
        <div>
          <label for="msg">Message<span class="required">*</span></label>
        </div>
        <textarea id="" cols="30" rows="10" v-model="form.msg"></textarea>
        <div class="button-wrapper">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Contact",
  setup() {
    const form = ref({
      name: "",
      email: "",
      msg: "",
    });

    const error = ref("");

    const submit = () => {
      if (
        form.value.name === "" ||
        form.value.email === "" ||
        form.value.msg === ""
      ) {
        error.value = "All fields are required!";
        return;
      }

      console.log(form.value);
      alert(`Thank you for contacting us ${form.value.name}!`);
      error.value = "";
    };

    return { form, error, submit };
  },
};
</script>

<style></style>
