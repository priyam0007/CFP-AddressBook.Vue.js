<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-app-bar color="primary" dark>
        <h2 style="margin-left: 223px">Person Address Form</h2>
        <v-icon style="margin-left: 249px">mdi-close</v-icon>
      </v-app-bar>
  <div>
            <pre>
            {{JSON.stringify(formValues,null,2)}}
            </pre>
            </div>
      <v-card ref="form" style="padding: 132px" elevation="2">
        <v-card-text>
          <v-text-field
            outlined
            ref="fname"
            v-model="fname"
            :rules="[() => !!fname || 'This field is required']"
            :error-messages="errorMessages"
            label="First Name"
            required
          ></v-text-field>

          <v-text-field
            outlined
            ref="lname"
            v-model="lname"
            :rules="[() => !!lname || 'This field is required']"
            :error-messages="errorMessages"
            label="Last Name"
            required
          ></v-text-field>

          <v-text-field
            outlined
            ref="email"
            v-model="email"
            label="E-mail"
          ></v-text-field>

          <v-text-field
            outlined
            ref="phonenumber"
            v-model="phonenumber"
            :rules="[() => !!phonenumber || 'This field is required']"
            label="Phone number"
            required
            placeholder="79938"
          ></v-text-field>

          <v-text-field
            outlined
            ref="address"
            v-model="address"
            :rules="[() => !!address || 'This field is required']"
            label="Address Line"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="4">
              <v-autocomplete
                outlined
                ref="city"
                v-model="city"
                :rules="[() => !!city || 'This field is required']"
                :items="cities"
                label="city"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-col>

            <v-col cols="4">
              <v-autocomplete
                outlined
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                :items="states"
                label="state"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                ref="zipcode"
                v-model="zipcode"
                :rules="[() => !!zipcode || 'This field is required']"
                label="zipcode"
                required
                placeholder="79938"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions style="justify-content: flex-end">
          <router-link to="/">
            <v-btn
              class="text-capitalize"
              width="180px"
              height="53px"
              color="#E2E2E2"
              depressed
              >Cancel</v-btn
            >
          </router-link>

          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            class="ml-10 text-capitalize"
            width="180px"
            height="53px"
            color="#E2E2E2"
            @click="submit"
            depressed
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import service from "../service/AddressBookService";
export default {
  name: "form",
  data: () => ({
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Asam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujrat",
      "Haryana",
      "HP",
      "Jarkhand",
      "Karnataka",
      "kerela",
      "MP",
      "Maharastrta",
      "Manipur",
      "Meghalay",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Panjab",
      "Rajasthan",
      "Sikkiam",
      "TamilNadu",
      "Tripura",
      "Telengana",
      "UK",
      "UP",
      "WB",
    ],
    cities: [
      "Ajmer",
      "Barmer",
      "Baran",
      "Bansawada",
      "Bikaner",
      "Bhilwara",
      "Bundi",
      "Churu",
      "Chittorgarh",
      "Dosa",
      "Dungarpur",
      "Dholpur",
      "Ganganagar",
      "Jaipur",
      "Jaisalmer",
      "Jodhpur",
      "Jalawar",
      "Jalor",
      "Junjunnu",
      "Hunumangarh",
      "Kota",
      "Karoli",
      "Nagaor",
      "Pali",
      "Rajsamand",
      "Tonk",
      "Sirohi",
      "Sikar",
      "Pratapgarh",
      "Sawai-Madhopur",
      "Udaipur",
      "Bijapuar",
    ],
    errorMessages: "",
    fname: null,
    lname: null,
    address: null,
    email: null,
    city: null,
    phonenumber: null,
    state: null,
    zipcode: null,
    formHasErrors: false,
  }),
  computed: {
    form() {
      return {
        fname: this.fname,
        lname: this.lname,
        address: this.address,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
        email: this.email,
        phonenumber: this.phonenumber,
      };
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
  },
  methods: {
    addressCheck() {
      this.errorMessages =
        this.address && !this.fname && !this.lname
          ? `Hey! I'm required`
          : "";
      return true;
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    submit(event) {
      event.preventDefault();
      console.log(this.form);
      const data = this.form;
      service
        .addAddressBookData(data)
        .then((response) => {
          console.log(response);
          console.log(response.data.data);
          this.addAddressBookData = response.data.data;
          alert("Contact Added Successfully", response);
        })
        .catch((error) => {
          console.log(error);
          alert("Contact is not Addedd");
        })
    },
  }
 }
</script>