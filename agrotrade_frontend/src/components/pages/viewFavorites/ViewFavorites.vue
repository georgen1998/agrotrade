<template>
  <div class="container">
    <h3>Τα Αγαπημένα μου</h3>
    <div v-if="favorites.length">
      <hr />
      <h4>Παραγωγοί</h4>
      <div class="row">
        <div v-for="favorite in farmerFavorites" :key="favorite.id" class="col-6 col-md-3 p-3">
          <div class="card text-center">
            <div class="card-body">
              <router-link :to="{ name: 'list-person', params: { id: favorite.id } }">
                <img :src="favorite.image ? 'https://agrotrade.shopitnow.gr' + favorite.image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-person.jpg'" class="rounded-circle profile-image" alt="image" />
                <div class="name">{{ favorite.username }}</div>
              </router-link>
            </div>
            <button @click="removeFarmer(favorite.id)" class="btn btn-danger">
              <font-awesome-icon :icon="['fas', 'trash']" /> Delete
            </button>
          </div>
        </div>
      </div>
      <hr />
      <h4>Προϊόντα</h4>
      <div class="row">
        <div v-for="favorite in productFavorites" :key="favorite.id" class="col-6 col-md-3 p-3">
          <div class="card text-center">
            <div class="card-body">
              <i :class="favorite.image" class="product-icon"></i>
              <div class="name">{{ favorite.name }}</div>
            </div>
            <button @click="removeProduct(favorite.id)" class="btn btn-danger">
              <font-awesome-icon :icon="['fas', 'trash']" /> Delete
            </button>
          </div>
        </div>
      </div>
      <hr />
      <h4>Events</h4>
      <div class="row">
        <div v-for="favorite in eventFavorites" :key="favorite.id" class="col-6 col-md-3 p-3">
          <div class="card text-center">
            <router-link :to="{ name: 'list-farmers-events', params: { id: favorite.id } }">
              <div class="card-body">
                <span class="ml-2">{{ favorite.type }}</span>
                <br>
                <span class="ml-2">{{ favorite.address }}</span>
              </div>
            </router-link>
            <button @click="removeEvent(favorite.id)" class="btn btn-danger">
              <font-awesome-icon :icon="['fas', 'trash']" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Δεν έχουν προστέθει</p>
    </div>
  </div>
</template>

<script src="./Favorites.js"></script>

<style scoped>
.profile-image {
  width: 75px;
  height: 75px;
  margin: 0 auto; /* Κεντράρισμα της εικόνας */
}
.profile-icon {
  font-size: 50px;
  display: block;
  margin: 0 auto;
}
.product-icon {
  font-size: 30px;
  display: block;
  margin: 0 auto;
}
.name {
  margin-top: 5px;
  text-align: center; /* Κεντράρισμα του κειμένου */
  font-size: 20px; /* Αυξήστε ή μειώστε το μέγεθος του κειμένου ανάλογα με τις ανάγκες σας */
  color: black;/* Ορισμός του χρώματος του κειμένου σε μαύρο */
}
.card {
  max-width: 200px; /* Μέγιστο πλάτος για κάθε κάρτα */
  margin: 0 auto; /* Κεντράρισμα της κάρτας */
}
h4 {
  padding-top: 20px;
}
.card-body {
  color: black; /* Ορισμός του χρώματος του κειμένου της κάρτας σε μαύρο */
}
</style>
