import EventService from '@/services/EventService';
import PersonService from '@/services/PersonService';
import Favorite from '@/services/FavoritesService';

export default {
  name: 'ListEventComponent',
  data() {
    return {
      events: [],
      columns: [
        'type', 'start_date', 'end_date', 'address', 'repeat_interval', 'image',
      ],
      columnNativeNames: {
        type: 'Τύπος',
        start_date: 'Έναρξή',
        end_date: 'Λήξη',
        address: 'Διεύθυνση',
        repeat_interval: 'Επανάληψη',
        image: 'Εικόνα',
      },
      selectedColumns: [], // To store selected columns
      showSelect: false,
      personNames: {},
      type: null,
    };
  },
  computed: {
    day() {
      const date = new Date(this.event.start_date);
      return date.getUTCDate();
    },
    month() {
      const date = new Date(this.event.start_date);
      // Months are 0-indexed in JavaScript, so add 1
      return date.getUTCMonth() + 1;
    },
  },
  mounted() {
    this.type = localStorage.getItem('type');
    this.listAllEvents();
  },
  methods: {
    getDay(dateString) {
      const date = new Date(dateString);
      return date.getUTCDate();
    },
    getMonth(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('default', { month: 'short' });
    },
    getEventImage(image) {
      const completeImageUrl = `https://agrotrade.shopitnow.gr/${image}`;
      if (completeImageUrl) {
        return completeImageUrl;
      }
      return '/uploads/default-event.jpg';
    },
    toggleSelect() {
      this.showSelect = !this.showSelect;
    },
    saveColumns() {
      localStorage.setItem('selectedColumns', JSON.stringify(this.selectedColumns));
    },
    toggleColumn(column) {
      const index = this.selectedColumns.indexOf(column);
      if (index === -1) {
        this.selectedColumns.push(column);
      } else {
        this.selectedColumns.splice(index, 1);
      }
    },
    async listAllEvents() {
      const response = await EventService.getEvents();
      this.events = response;
    },
    async removeEvent(id) {
      this.$swal({
        title: 'Delete event',
        text: 'Are you sure you want to delete the event?',
        icon: 'warning',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#F0F0F0',
        confirmButtonText: 'Yes, delete it',
      }).then(async (result) => {
        if (result.value) {
          await EventService.deleteEvent(id);
          this.$swal('Deleted', 'Successfully deleted', 'success');
          this.listAllEvents();
        } else {
          this.$swal('Cancelled', 'Cancel deletion', 'info');
        }
      });
    },
  },
};
