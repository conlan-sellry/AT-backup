<template>
  <div class="c-Form c-Form--CTA">

    <form @submit.prevent>
      <div v-if="formErrors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li
            v-for="(error, index) in formErrors"
            :key="index"
          >
            {{ error }}
          </li>
        </ul>
      </div>
      <div>
        <v-text-field
          id="first-name"
          v-model="formInput.firstName"
          label="First Name"
          required
        />
      </div>
      <div>
        <v-text-field
          id="last-time"
          v-model="formInput.lastName"
          label="Last Name"
          required
        />
      </div>
      <div>
        <v-text-field
          id="email"
          v-model="formInput.email"
          label="Email Address"
          type="email"
          required
        />
      </div>

      <div>
        <v-text-field
          id="phone"
          v-model="formInput.phone"
          label="Phone Number"
          type="tel"
          required
        />
      </div>

      <div>
        <v-text-field
          id="city"
          v-model="formInput.city"
          label="City"
          required
        />
      </div>

      <div>
        <v-text-field
          id="comments"
          v-model="formInput.comments"
          label="Comments"
          required
        />
      </div>

      <!--<div class="marketing">
        <v-checkbox
          id="marketing"
          v-model="formInput.acceptsMarketing"
          :checked="formInput.acceptsMarketing"
          name="acceptmarketing"
          label="I accept email marketing"
        />
      </div>-->

      <button
        @click="submitForm"
      >
        Send Message
      </button>
    </form>
  </div>
</template>

<script>

  import Vue from 'vue';
  import Vuetify from 'vuetify/lib';
  //import Vuetify, { VTextField } from 'vuetify/lib';
  Vue.use(Vuetify, {
      theme: {
        primary: '#121212', // a color that is not in the material colors palette
      },
    }
  );

export default {
  props: {
    blok: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      loading: false,
      formErrors: [],
      formInput: {
        firstName: '',
        lastName: '',
        email: 'development@madebysix.com', //@TODO - temp
        password: '',
        repeat: '',
        acceptsMarketing: true
      },
      //siteKey: this.$store.getters['recaptcha/getSiteKey']
    };
  },
  created() {

  },
  methods: {
    submitForm() {
      alert('submitForm');
      return true;
    }
  }
};
</script>

<style src="./FormComments.scss" lang="scss" scoped></style>
