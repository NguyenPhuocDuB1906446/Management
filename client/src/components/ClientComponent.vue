<template>
  <div class="client-container">
    <h3 v-if="newClient._id == -1">New Client</h3>
    <h3 v-else>Edit Client</h3>
    <hr>
    <label class="main" for="client-name">Name:</label>
    <input class="main" type="text" id="client-name" v-model="newClient.name" placeholder="Client name" />
    <label class="main" for="client-email">Email:</label>
    <input class="main" type="email" id="client-email" v-model="newClient.email" placeholder="client@email.com" />
    <label class="main" for="client-phone">Phone:</label>
    <input class="main" type="tel" id="client-phone" v-model="newClient.phone" placeholder="999-999-9999" />
    <ProvidersComponent />
    <hr>
    <template v-if="newClient._id == -1">
      <button id="client-cancel-btn" @click="undoSaveClient()">Cancel</button>
      <button id="client-add-btn" @click="saveClient()">Add Client</button>
    </template>
    <template v-else>
      <button id="client-delete-btn" @click="deleteClient(newClient._id)">Delete Client</button>
      <button id="client-cancel-btn" @click="undoSaveClient()">Cancel</button>
      <button id="client-save-btn" @click="saveClient()">Save Client</button>
    </template>
  </div>
</template>

<script>
import ProvidersComponent from './ProvidersComponent.vue'
import { mapGetters } from 'vuex';
import Inputmask from 'inputmask';

export default {
  name: 'ClientComponent',
  components: {
    ProvidersComponent
  },
  mounted() {
    const im = new Inputmask("999-999-9999");
    im.mask(document.getElementById('client-phone'));
  },
  computed: {
    ...mapGetters({
      newClient: 'NEW_CLIENT'
    })
  },
  data() {
    return {
      formError: ""
    }
  },
  methods: {
    validateForm() {
      this.$data.formError = "";
      // Name
      const newClientName = this.newClient.name.trim();
      if (!newClientName) {
        this.$data.formError = "Fill client name.";
      }
      // Email
      // eslint-disable-next-line no-useless-escape
      const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.newClient.email && !reEmail.test(this.newClient.email)) {
        this.$data.formError = "Fill correct email.";
      }
      // Phone
      const phone = this.newClient.phone.replace(/-/g, "").replace(/_/g, "");
      const rePhone = /\d{10}/
      if (phone && !rePhone.test(phone)) {
        this.$data.formError = "Fill correct phone number.";
      }
    },
    deleteClient(id) {
      this.$store.dispatch('SET_ERROR', "");

      if (confirm("Do you really want to delete?")) {
        this.$store.dispatch('DEL_CLIENT', id);
      }
    },
    saveClient() {
      this.$store.dispatch('SET_ERROR', "");

      this.validateForm();
      if (!this.$data.formError) {
        this.$store.dispatch('SAVE_NEW_CLIENT');
      }
      else {
        this.$store.dispatch('SET_ERROR', this.$data.formError);
      }
    },
    undoSaveClient() {
      this.$store.dispatch('SET_ERROR', "");
      this.$store.dispatch('SET_NEW_CLIENT', -1);
      this.$store.dispatch('SET_PROVIDERS_STATUS_FOR_NEW_CLIENT');
      this.$store.dispatch('SET_NEW_CLIENT_HIDDEN', true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.client-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FFF;
  color: #000;
  text-align: left;
  border: 1.5px solid lightgray;
  border-radius: 3px;
}

h3 {
  padding: 12px 0px 4px 16px;
  margin: 0;
  color: #37798b;
}

hr {
  border: 0.5px solid lightgray;
}

input {
  width: 60%;
  margin: 0 auto;
}

#client-cancel-btn,
#client-add-btn,
#client-save-btn {
  float: right;
}

#client-cancel-btn,
#client-add-btn,
#client-save-btn,
#provider-add-btn {
  border: 1px solid #ADADAD;
  border-radius: 7px;
  text-decoration: none;
  display: inline-block;
  color: #4A4A4A;
  background-color: #F7F5F6;
  background-image: linear-gradient(to bottom, #F7F5F6, #DDDDDD);
  width: 100px;
  height: 30px;
  margin: 0px 10px 10px 5px;
}

#client-cancel-btn:hover,
#client-add-btn:hover,
#client-save-btn:hover,
#provider-add-btn:hover {
  border: 1px solid #ADADAD;
  background-color: #E0E0E0;
  background-image: linear-gradient(to bottom, #E0E0E0, #BDBBBC);
}

#client-delete-btn {
  border: 1px solid red;
  border-radius: 7px;
  text-decoration: none;
  display: inline-block;
  color: lightgray;
  background-color: #F7F5F6;
  background-image: linear-gradient(to bottom, red, rgb(199, 80, 37));
  width: 100px;
  height: 30px;
  margin: 0px 10px 10px 5px;
}

#client-delete-btn:hover {
  border: 1px solid #ADADAD;
  background-color: #E0E0E0;
  background-image: linear-gradient(to bottom, red, darkred);
}

label.main {
  margin-top: 7px;
  font-weight: bold;
  text-align: right;
  width: 150px;
  float: left;
}

input.main {
  float: left;
  border: solid 1px #aacfe4;
  width: 350px;
  margin: 2px 0 10px 10px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -op-border-radius: 5px;
  -webkit-border-radius: 5px;
  font-size: 14px;
}

input.main {
  height: 18px;
  padding: 4px 10px;
}

hr:first-of-type {
  margin-bottom: 20px;
}

hr:last-of-type {
  margin-top: 20px;
}
</style>
