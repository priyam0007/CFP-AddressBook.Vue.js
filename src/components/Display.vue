<template>
 <body>
      <router-link to="/form"><v-btn 
        color="primary"
        absolute
        right
        >
        <v-icon>mdi-account-plus</v-icon>Add User</v-btn>
        <h2>Persons Details</h2>
      
      </router-link> 
      
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            First Name
          </th>
          <th class="text-left">
            Last Name
          </th>
          <th class="text-left">
            Address
          </th>
          <th class="text-left" @click="getsortCity()">
            City
          </th>
          <th class="text-left" @click="getsortState()">
            State
          </th>
          <th class="text-left">
            Zipcode
          </th>
          <th class="text-left">
            Phone Number
          </th>
          <th class="text-left">
            Email
          </th>
           <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Contact in Contacts"
          :key="Contact.id"
        >
          <td class="text-left">{{ Contact.fname }}</td>
          <td class="text-left">{{ Contact.lname }}</td>
          <td class="text-left">{{ Contact.address }}</td>
          <td class="text-left">{{ Contact.city }}</td>
          <td class="text-left">{{ Contact.state }}</td>
          <td class="text-left">{{ Contact.zipcode }}</td>
          <td class="text-left">{{ Contact.phonenumber }}</td>
          <td class="text-left">{{ Contact.email }}</td>
         
           <td >
            <v-icon @click="remove(Contact.id)">mdi-delete</v-icon>
           <v-icon @click="update(Contact.id)"> mdi-pencil</v-icon>
           </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </body>
</template>


<script>
  import Service from "../service/AddressBookService";
export default {
  name: "Displayhome",
  data() {
    return {
      Contacts: [],
    };
  },
  methods: {
    getEmployee() {
      Service.getAllAddressbookData().then((response) => {
        console.log(response.data.data);
        this.Contacts = response.data.data;
      });
    },
        getsortCity(){
            Service.getsortCity().then((response) => {
              console.log(response.data.data);
                this.Contacts = response.data.data;   
            });
        },
         getsortState(){
            Service.getsortState().then((response) => {
              console.log(response.data.data);
                this.Contacts = response.data.data;   
            });
        },
     update(id){
          console.log(id);
          this.$router.push({name: "EditForm",params:{id:id}})
        },
        remove(id){
     console.log(id)
        Service
          .deleteContact(id)
          .then((data) => {
            var answer = window.confirm(" Employee data once deleted cannot be restored!! Do you wish to continue ?",data);
            if(answer === true){
                alert("Employee data deleted successfully!!");
                window.location.reload();
                this.getContact();
            }
            else{
              window.location.reload();
            }
          })
          .catch((error) => {
            alert("Something Went Wrong!");
          });
        }
  },
   created() {
    this.getEmployee();
  },
}
   
</script>
<style>
body {
  margin: 0;
  height: 100%;
}
.header {
  padding: 10px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  opacity: 1;
}
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
}
.addressBook-text {
  text-align: left;
  font: normal normal bold 22px/25px Montserrat;
  letter-spacing: 0px;
  text-transform: uppercase;
  opacity: 1;
  color: #098df8;
  margin-left: 10px;
}
.addressBook-book {
  color: #3d4e5d;
}
* {
  box-sizing: border-box;
}
</style>