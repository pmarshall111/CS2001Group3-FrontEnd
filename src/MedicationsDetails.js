import axios from "axios";
const MedicationPath =
  "http://localhost:8080/api/medications/residents?medForResId=0";

class MedicationDetailsService {
  getDetails() {
    return axios.get(MedicationPath);
  }
}

export default new MedicationDetailsService();
