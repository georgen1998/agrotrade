<template>
  <div class="container">
    <router-link v-if="type=='Farmer'"
                 :to="{ name: 'add-post' }" class="btn btn-dark">
      <i class="fi fi-sr-add"></i>&nbsp; Προσθήκη
    </router-link>
    <h3 class="text-center">Δημοσιεύσεις</h3>
    <div v-for="post in posts" :key="post.id" class="post">
      <div v-if="farmers[post.farmer_id]" class="farmer-info">
        <router-link :to="{ name: 'list-person', params: { id:post.farmer_id } }"
                     class="farmer-username">
          <img :src="farmers[post.farmer_id].image ? 'https://agrotrade.shopitnow.gr' + farmers[post.farmer_id].image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-person.jpg'" class="farmer-image" alt="image" />
          {{ farmers[post.farmer_id].username }}
        </router-link>
      </div>
      <img :src="post.image ? 'https://agrotrade.shopitnow.gr' + post.image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-post.jpg'" class="w-100 post-image" alt="image" />
      <p class="post-title-description">
        <span class="post-title">{{ post.title }}</span>: {{ post.description }}
      </p>
      <hr />
    </div>
  </div>
</template>

<script src = "./ListPost.js" > </script>
<style scoped>
 /* Container */
.container {
  max-width: 600px;
  margin: 0 auto;
}

/* Post */
.post {
  margin-bottom: 40px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Farmer Info */
.farmer-info {
  display: flex;
  align-items: center;
  padding: 10px;
}

.farmer-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.farmer-username {
  font-size: 16px;
  color: #000;
  text-decoration: none;
}

/* Post Image */
.post-image {
  max-width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

/* Post Title Description */
.post-title-description {
  padding: 20px;
}

.post-title {
  font-weight: bold;
}

/* Delete Button */
.delete-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  color: #ff5e3a;
  border: 1px solid #ff5e3a;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ff5e3a;
  color: #fff;
}

/* Separator */
hr {
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin: 0;
}

</style>
