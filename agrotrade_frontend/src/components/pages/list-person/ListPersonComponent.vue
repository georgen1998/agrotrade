<template>
  <div class="profile container">
    <div class="profile-picture" :style="{ backgroundImage: `url(${person.image ? 'https://agrotrade.shopitnow.gr' + person.image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-person.jpg'})` }"></div>

    <div class="description">
      <h2 class="username">
        {{ person.username }}
      </h2>
      {{person.type}}
      <h3 class="fullname">
        {{ person.fullname }}
        <i v-if="liked" class="fi fi-ss-heart p-2 like"></i>
        <i v-else class="fi fi-bs-heart p-2" @keydown.space="addlike" @click="addlike"></i>
      </h3>
    </div>
    <div class="button-container" v-if="arg == this.favoriteForm.customer_id">
      <router-link :to="{ name: 'edit-person', params: { id: person.id } }" class="btn btn-light">
        Επεξεργασία Προφίλ
      </router-link>
      <router-link  v-if="person.type=='Farmer'"
                   :to="{ name: 'add-post', params: { id: person.id } }" class="btn btn-light">
        Δημοσίευση Εικόνας
      </router-link>
    </div>
    <div class="address-container">
      <a :href="'https://maps.google.com/maps?q=' + encodeURIComponent(person.address)" class="address">{{ person.address }}</a>
      <a :href="'mailto:' + person.email" class="address">{{ person.email }}</a>
      <a :href="'tel:' + person.telephone" class="address">{{ person.telephone }}</a>
    </div>
    <div class="product-button-container" v-if="person.type=='Farmer'">
      <router-link :to="{ name: 'farmer-products', params: { id: person.id } }"
                   class="btn btn-success m-1">
        Προϊόντα Αγρότη
      </router-link>
      <router-link :to="{ name: 'add-review', params: { arg } }" class="btn btn-success m-1">
        Κριτικές Αγρότη
      </router-link>
      <p class="publications">Δημοσιεύσεις</p>
      <div class="photos-container row">
        <!-- Λούπα για τις δημοσιεύσεις του αγρότη -->
        <div v-for="post in filteredPosts" :key="post.id" class="post-item col-md-4 col-12">
          <div class="post-box">
            <img :src="post.image ? 'https://agrotrade.shopitnow.gr' + post.image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-post.jpg'" class="w-100 post-image" alt="image" />
            <div class="post-content">
              <h4 class="post-title">{{ post.title }}</h4>
              <p class="post-description">{{ post.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./ListPerson.js"></script>

<style scoped>
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-size: cover;
  }

  .description {
    margin-top: 20px;
  }

  .username {
    font-weight: bold;
    text-decoration: underline;
  }

  .button-container {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .profile-button {
    margin-left: 10px;
  }

  .event-container {
    margin-top: 10px;
  }

  .event-text {
    font-size: larger;
  }

  .address-container {
    margin-top: 10px;
    display:grid;
  }

  .address a {
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
  }

  .address a:hover, .address a:focus {
      text-decoration: underline;
      color: blue;
    }

  .product-button-container {
    margin-top: 20px;
  }

  .like {
      color:red;
  }

  .product-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .publications {
    margin-top: 10px;
    font-size: 24px; /* Αλλάξτε το μέγεθος γραμμάτων εδώ */
    color: #000000;
  }

  .photos-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 10px;
  }

  .photo {
    width: 23%;
    height: auto;
    margin-bottom: 10px;
    cursor: pointer;
  }
</style>
