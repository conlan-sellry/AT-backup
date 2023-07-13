<template>
  <div class="c-Form c-Form--Comments">

    <div v-if="successMsg">
      <p>{{ successMsg }}</p>
    </div>

    <form
      v-else
      @submit.prevent="validateBeforeSubmit()"
    >

      <!--<ul>
        <li v-for="error in errors.all()">{{ error }}</li>
      </ul>-->

      <div v-if="formErrors.length" class="c-Form__errors">
        <!-- <b>Please correct the following error(s):</b> -->
        <p v-if="formErrors.length > 1">
            These fields are invalid :
            <span
              v-for="(error, index) in formErrors"
              :key="index"
            >
              <span
                v-for="(err, key) in error"
                :key="key"
              >
                {{ convertText(key) }}<span v-if="index+1 < formErrors.length">,</span>
              </span>
            </span>
        </p>
        <p v-else>
          <span
            v-for="(error, index) in formErrors"
            :key="index"
          >
            <span v-for="(err, key) in error"
            :key="key">
                The {{ convertText(key) }} field is invalid
            </span>
          </span>
        </p>
      </div>

      <ValidationProvider name="firstName" :rules="formatRules('firstName')">
        <div slot-scope="{ errors }">
          <label for="firstName">
            First Name <span style="color: red">*</span>
            <input
                    type="text"
                    v-model="fieldDefs.firstName.value"
                    placeholder="Type your first name"
                    name="firstName"
                    minlength="2"
            >
          </label>
          <!-- <p>{{ errors[0] }}</p> -->
        </div>
      </ValidationProvider>

      <ValidationProvider name="lastName" :rules="formatRules('lastName')">
        <div slot-scope="{ errors }">
          <label for="lastName">
            Last Name <span style="color: red">*</span>
            <input
                    type="text"
                    v-model="fieldDefs.lastName.value"
                    placeholder="Type your last name"
                    name="lastName"
            >
          </label>
          <!-- <p>{{ errors[0] }}</p> -->
        </div>
      </ValidationProvider>

      <ValidationProvider name="email" :rules="formatRules('email')">
        <div slot-scope="{ errors }">
          <label for="email">
            Email Address <span style="color: red">*</span>
            <input
                    type="text"
                    v-model="fieldDefs.email.value"
                    placeholder="Type your email address"
                    name="email"
            >
          </label>
          <!-- <p>{{ errors[0] }}</p> -->
        </div>
      </ValidationProvider>

      <ValidationProvider name="country" rules="">
        <div slot-scope="{ errors }">
          <label for="country">
            Country <span style="color: red">*</span>
            <input
                    type="text"
                    v-model="fieldDefs.country.value"
                    placeholder="Type your country name"
                    name="country"
            >
          </label>
          <!-- <p>{{ errors[0] }}</p> -->
        </div>
      </ValidationProvider>

      <ValidationProvider name="comment" :rules="formatRules('comment')">
        <div slot-scope="{ errors }">
          <label for="comment">
            Comment
            <input
                    type="text"
                    v-model="fieldDefs.comment.value"
                    placeholder="Type your comment"
                    name="comment"
            >
          </label>
          <!-- <p>{{ errors[0] }}</p> -->
        </div>
      </ValidationProvider>

      <ValidationProvider name="newsletter" :rules="formatRules('newsletter')">
        <div slot-scope="{ errors }">
          <label for="newsletter" class="checkbox">

            <input
                    type="checkbox"
                    v-model="fieldDefs.newsletter.value"
                    name="newletter"
            >
            Please sign me up for the Another Tomorrow newsletter.
          </label>
          <!-- <p>{{ errors[0] }}</p> -->
        </div>
      </ValidationProvider>

      <button
        class="c-Button c-Button--invert"
      >
        Send Message
      </button>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { ValidationProvider, extend, validate } from 'vee-validate';
  import { required, email, alpha, numeric, alpha_num, min } from 'vee-validate/dist/rules';
  import axios from 'axios';

  // No message specified.
  extend('email', {
    ...email,
    message: 'A valid email address is required'
  });

  // Override the default message.
  extend('required', {
    ...required,
    message: 'This field is required'
  });

  extend('min', {
    validate(value, args) {
      return value.length >= args.length;
    },
    params: ['length']
  });

  extend('max', {
    validate(value, args) {
      return value.length <= args.length;
    },
    params: ['length']
  });

  export default {
  components:{
    ValidationProvider
  },
  mounted(){
    //console.log('env - ' + this.env)
  },
  props: {
    blok: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      messages:{
        success: "Thanks for getting in touch!",
      },
      loading: false,
      formErrors: [],
      errors: [],
      formData: {},
      fieldDefs: {
        firstName: {
            value: '',
          rules: [
            'required',
            'min:2'
          ]
        },
        lastName: {
          value: '',
          rules: [
            'required',
            'min:2'
          ]
        },
        email: {
          value: '',
          rules: [
            'required',
            'email'
          ]
        }, //@TODO - temp
        newsletter: {
          value: false ,
        },
        country: {
          value: '',
          rules: [
            'required',
          ]
        },
        comment: {
          value: '',
        },
      },
      valid: false,
      successMsg: ''
      //siteKey: this.$store.getters['recaptcha/getSiteKey']
    };
  },
    computed: {
      env(){
        return process.env.NODE_ENV
      }
    },
  methods: {
    convertText(text){
      return text
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function(str){ return str.toUpperCase(); });
    },
    formatRules(name, value, rules){
      let ruleStr = '';
      if(rules){
          if(rules.length > 0){
              for( let k in rules){
                  if(Object.prototype.hasOwnProperty.call(rules, k)){
                      ruleStr += rules[k] + '|';
                  }
              }
          }
          ruleStr = ruleStr.substring(0, ruleStr.length -1);
          return ruleStr;
      }
      return null;
    },
    resetForm(){
      this.fieldDefs.firstName.value = '';
      this.fieldDefs.lastName.value = '';
      this.fieldDefs.email.value = '';
      this.fieldDefs.country.value = '';
      this.fieldDefs.comment.value = '';
    },
    async submitForm() {
      //console.log('submitForm');
      if(this.valid){
          //console.log('submit!!!');
          try{
            const response = await axios.post(`./.netlify/functions/commentsFormValidateSendEmail`, this.fieldDefs);
            /*console.log(this.fieldDefs);
            console.log('response:');
            console.log(response);*/
            if(response){
              this.resetForm();
              this.successMsg = this.messages.success;
            }
          } catch (e) {
            console.log(e);
          }
      }
    },
    async formIsValid(){
      let fieldValidObj = {};
      let fields = this.fieldDefs;
      let errors = [];
      let valid = false;

      for (const k in fields){
        if(Object.hasOwnProperty.call(fields, k)){
          let v = fields[k]['value'];
          fieldValidObj = await validate(v, this.formatRules(k, v, fields[k]['rules']));
          if(!fieldValidObj['valid']){
            errors.push({[k]: fields[k]['rules']})
          }
        }
      }
      if(errors.length > 0){
        this.valid = false;
        this.formErrors = errors;
        //console.log(this.formErrors);
        //console.log('failed');
        return false;
      }
      else{
        this.valid = true;
        return true;
      }
    },
    async validateBeforeSubmit() {
      let valid = await this.formIsValid();
      if(valid){
        //console.log('submitting...');
        this.submitForm();
      }
    }
  }
};
</script>

<style src="./FormCommentsHtml.scss" lang="scss"></style>
