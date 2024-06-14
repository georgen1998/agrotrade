import { required, email, numeric } from 'vuelidate/lib/validators';
import EventService from '@/services/EventService';
import PersonService from '@/services/PersonService';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

// Custom validator for date format validation
const dateValidator = (value) => {
  if (!value) return true;
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormat.test(value);
};

export default {
  name: 'EditEventComponent',
  components: { DatePicker },
  data() {
    return {
      eventForm: {
      },
      isSubmitted: false,
      persons: [],
    };
  },
  validations: {
    eventForm: {
      type: { required },
      start_date: { required },
      end_date: { required },
      address: { required },
      repeat: { },
      image: { },
    },
  },
  async mounted() {
    this.getEventById();
    try {
      this.persons = await PersonService.getPersons();
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async getEventById() {
      const { id } = this.$route.params;
      const response = await EventService.getEventId(id);

      this.eventForm = { ...response };
    },
    async updateFormEvent() {
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }

        await EventService.updateEvent(this.eventForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Event updated successfully!',
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
          customClass: {
            popup: 'd-flex align-items-center justify-content-center',
          },
        }).then((data) => {
          this.$router.push({
            name: 'list-events',
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
