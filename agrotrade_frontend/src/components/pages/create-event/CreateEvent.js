import { required, email, numeric } from 'vuelidate/lib/validators';
import EventService from '@/services/EventService';
import PersonService from '@/services/PersonService';
import UploadService from '@/services/UploadService';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

// Custom validator for date format validation
const dateValidator = (value) => {
  if (!value) return true;
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormat.test(value);
};

export default {
  name: 'CreateEventComponent',
  components: { DatePicker },
  data() {
    return {
      address: {
        street: '',
        number: '',
        city: '',
        postalCode: '',
        country: '',
      },
      eventForm: {
        type: null,
        start_date: null,
        end_date: null,
        address: null,
        repeat: null,
        image: null,
      },
      isSubmitted: false,
      imageError: '',
    };
  },
  validations: {
    eventForm: {
      type: { required },
      start_date: { required },
      end_date: { required },
      address: { required },
      repeat: {},
      image: {},
    },
  },
  computed: {
    combinedAddress() {
      return `${this.address.street}, ${this.address.number}, ${this.address.city}, ${this.address.postalCode}, ${this.address.country}`;
    },
  },
  watch: {
    combinedAddress(newAddress) {
      this.eventForm.address = newAddress;
    },
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Check file size (e.g., limit to 2MB)
        const maxSizeMB = 2;
        if (file.size > maxSizeMB * 1024 * 1024) {
          this.imageError = `File size should be less than ${maxSizeMB} MB`;
          this.eventForm.image = '';
          return;
        }

        try {
          const imageUrl = await UploadService.uploadImage(file);
          this.eventForm.image = imageUrl;
          this.imageError = ''; // Clear previous errors if any
        } catch (error) {
          this.imageError = 'Image upload failed';
        }
      }
    },

    handleSubmitForm() {},

    async submitNewEvent() {
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }

        await EventService.createNewEvent(this.eventForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Event added successfully!',
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
        console.error(error);
      }
    },
  },
  async mounted() {
    this.eventForm.address = this.combinedAddress;
  },
};
