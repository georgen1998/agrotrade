<template>
  <div class="product-details-and-farmers container">
    <div class="product-info">
      <h1>{{ product.name }}</h1>&nbsp;&nbsp;
      <i :class="product.image"></i>
      <i v-if="liked" class="fi fi-ss-heart p-2 like"></i>
      <i v-else class="fi fi-bs-heart p-2" @keydown.space="addlike" @click="addlike"></i>
    </div>
    <div class="sort-buttons">
      <button @click="sortFarmersByPrice('asc')"
       class="btn btn-light">Ταξινόμηση κατά αυξούσα τιμή</button>
      <button @click="sortFarmersByPrice('desc')"
       class="btn btn-light">Ταξινόμηση κατά φθίνουσα τιμή</button>
    </div>
    <h2>Αγρότες που πουλάνε αυτό το προϊόν</h2>
    <div class="row">
      <div v-for="farmer in farmers" :key="farmer.id"
          class="farmer-item col-12 col-md-6"
          @click="navigateToFarmer(farmer.id)"
          @keypress.enter="navigateToFarmer(farmer.id)"
          tabindex="0"
          style="outline: none;">
        <div class="farmer-image-container">
          <img :src="farmer.image ? 'https://agrotrade.shopitnow.gr' + farmer.image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-person.jpg'" class="farmer-image" alt="image" />
        </div>
        <div class="farmer-details">
          <p class="farmer-name">{{ farmer.fullname }}</p>
          <span class="">{{ farmer.farmer_product.description }}</span>
          <p class="farmer-product-price">Τιμή: {{ formatPrice(farmer.farmer_product.price) }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./ProductDetailsAndFarmers.js"></script>
<style scoped>
  .product-info {
    font-size: 35px;
    display: flex;
    justify-content: center;
  }
  .product-image {
    width: 200px;
    height: auto;
    margin-bottom: 20px;
  }

  .like {
    color: red;
  }

  .product-description {
    margin-bottom: 10px;
  }

  .product-price {
    font-weight: bold;
  }

  .sort-buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .sort-buttons .btn {
    margin-left: 10px;
  }

  .farmers-container {
    display: flex;
    flex-wrap: wrap;
  }

  .farmer-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom:10px;
  }

  .farmer-image-container {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }

  .farmer-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .farmer-details {
    display: flex;
    flex-direction: column;
  }

  .farmer-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .farmer-product-price {
    font-weight: bold;
  }
</style>
