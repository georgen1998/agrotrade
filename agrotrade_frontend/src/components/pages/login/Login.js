import Api from '@/services/Api';

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: false,
      errorMessage: '',
      id: null,
    };
  },
  methods: {
    login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      Api().post('/login', credentials)
        .then((response) => {
          const token = response.data.token;
          const userId = response.data.userId;
          const type = response.data.type;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('type', type);
          this.isLoggedIn = true;
          if (type === 'Consumer') {
            this.$router.push('/list-posts');
          } else {
            this.$router.push({ name: 'list-person', params: { id: userId } });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.errorMessage = 'Incorrect username or password';
          } else {
            this.errorMessage = 'Internal Error';
          }
        });
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    },
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  },
  mounted() {
    this.id = localStorage.getItem('userId');
  },
};
