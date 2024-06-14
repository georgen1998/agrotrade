import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import EventService from '@/services/EventService';

export default {
  name: 'MapPage',
  data() {
    return {
      events: [],
      map: null,
      userLocation: null,
    };
  },
  async mounted() {
    await this.fetchEvents();
    this.initializeMap();
    await this.getCurrentLocationAndCenterMap();
  },
  methods: {
    async fetchEvents() {
      try {
        this.events = await EventService.getEvents();
      } catch (error) {
        console.error('Σφάλμα κατά την λήψη των events:', error);
      }
    },
    initializeMap() {
      this.map = L.map(this.$refs.map)
        .setView([37.9838, 23.7275], 6); // Προκαθορισμένη θέση στην Αθήνα
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    async getCurrentLocationAndCenterMap() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.userLocation = [latitude, longitude];
        this.map.setView(this.userLocation, 12);
        L.marker(this.userLocation, {
          icon: L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        }).addTo(this.map)
          .bindPopup('Η τρέχουσα τοποθεσία σας')
          .openPopup();
        this.addEventMarkers();
      } catch (error) {
        console.error('Σφάλμα κατά την λήψη της τρέχουσας θέσης:', error);
      }
    },
    addEventMarkers() {
      if (!this.map) return;

      this.events.forEach((event) => {
        const location = event.address;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const lat = data[0].lat;
              const lon = data[0].lon;
              const popupContent = `
                <div>
                  <p>${location}</p>
                  <a href=" " class="view-farmers-link" data-event-id="${event.id}">
                    Δες τους παραγωγούς του event και τα προιόντα τους εδώ
                  </a>
                </div>
              `;
              const marker = L.marker([lat, lon], {
                icon: L.icon({
                  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                }),
              }).addTo(this.map)
                .bindPopup(popupContent);

              // Προσθέστε event listener για τον σύνδεσμο
              marker.on('popupopen', () => {
                const link = document.querySelector('.view-farmers-link');
                link.addEventListener('click', (e) => {
                  e.preventDefault();
                  const eventId = e.target.getAttribute('data-event-id');
                  this.$router.push({ name: 'list-farmers-events', params: { id: eventId } });
                });
              });
            } else {
              console.log(`Η διεύθυνση δεν βρέθηκε: ${location}`);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
      this.$nextTick(() => {
        this.map.invalidateSize();
      });
    },
  },
};
