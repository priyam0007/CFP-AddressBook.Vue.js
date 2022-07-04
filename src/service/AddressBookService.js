import axios from 'axios';

const Addressbook_url = 'http://localhost:8096/addressbook';

class service {

  addAddressBookData(data) {
    return axios.post(`${Addressbook_url}/create`, data);
  }
  getAllAddressbookData() {
    return axios.get(`${Addressbook_url}/get`);
  }
  deleteContact(id) {
    return axios.delete(`${Addressbook_url}/${id}`);
  }
  getContact(id) {
    return axios.get(`${Addressbook_url}/${id}`);
  }
  updateAddressBookData(id, data) {
    return axios.put(`${Addressbook_url}/update/${id}`, data);
  }
  getsortCity() {
    return axios.get(`${Addressbook_url}/get/sortbycity`);
  }
  getsortState() {
    return axios.get(`${Addressbook_url}/get/sortbystate`);
  }
}

export default new service()
