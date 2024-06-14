import PostService from '@/services/PostService';
import PersonService from '@/services/PersonService'; // Προσθήκη της υπηρεσίας PersonService

export default {
  name: 'ListPostComponent',
  data() {
    return {
      posts: [],
      columns: ['farmer_id', 'title', 'image', 'description'],
      columnNativeNames: {
        farmer_id: 'ID Αγρότη',
        title: 'Τίτλος',
        image: 'Εικόνα',
        description: 'Περιγραφή',
      },
      type: null,
      selectedColumns: [], // To store selected columns
      showSelect: false,
      farmers: {},
    };
  },
  mounted() {
    this.type = localStorage.getItem('type');
    this.listAllPosts();
    this.arg = this.$route.params.id;
  },
  methods: {
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
    async listAllPosts() {
      const response = await PostService.getPosts();
      this.posts = response;
      // Ανάκτηση των δεδομένων των αγροτών
      const farmerPromises = this.posts.map(async (post) => {
        if (post.farmer_id && !this.farmers[post.farmer_id]) {
          const farmer = await PersonService.getPersonId(post.farmer_id);
          return { id: post.farmer_id, farmer };
        }
        return null;
      });
      const farmerResults = await Promise.all(farmerPromises);
      farmerResults.forEach((result) => {
        if (result) {
          this.farmers = {
            ...this.farmers,
            [result.id]: result.farmer,
          };
        }
      });
    },
    async removePost(id) {
      this.$swal({
        title: 'Delete post',
        text: 'Are you sure you want to delete the post?',
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
          await PostService.deletePost(id);
          this.$swal('Deleted', 'Successfully deleted', 'success');
          this.listAllPosts();
        } else {
          this.$swal('Cancelled', 'Cancel deletion', 'info');
        }
      });
    },
  },
};
