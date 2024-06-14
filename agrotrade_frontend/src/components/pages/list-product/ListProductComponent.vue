<template>
  <div class="product-page container">
    <router-link v-if="type=='Farmer'"
                 :to="{ name: 'add-product' }" class="btn btn-dark">
      <i class="fi fi-sr-add"></i>&nbsp; Προσθήκη
    </router-link>
    <router-link class="btn btn-dark mx-2"
                 :to="{ name: 'farmer-products', params: { id: userid } }">
      <i class="fi fi-rs-apple-crate"></i><span>&nbsp;Προιοντα μου</span>
    </router-link>
    <h3>Όλα τα Προϊόντα</h3>
    <div class="product-container">
      <div v-for="product in products"
           :key="product.id"
           class="product-item col-6 col-md-3"
           @click="goToProductDetails(product.id)"
           @keydown.enter="goToProductDetails(product.id)">

        <div class="product-box">
          <i :class="product.image" class="product-image"></i>
          <p class="product-name">{{ product.name }}</p>
        </div>

      </div>
    </div>
  </div>
</template>
<script src="./ListProduct.js"></script>
<style scoped>
  .product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .product-item {
    width: 50%; /* Ρυθμίζει το πλάτος του κάθε προϊόντος */
    padding: 10px; /* Ρυθμίζει το περιθώριο γύρω από τα προϊόντα */
    text-align: center;
    cursor: pointer;
  }

  .product-box {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .product-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .product-name {
    margin-bottom: 0px;
  }
</style>
