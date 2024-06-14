<template>
    <div class="product-page container">
      <router-link v-if="type == 'Farmer'" :to="{ name: 'add-product' }" class="btn btn-dark">
        <i class="fi fi-sr-add"></i>&nbsp; Add
      </router-link>
      <h3>Όλα τα Προϊόντα</h3>
      <div class="product-container row">
        <div v-for="product in products"
         :key="product.id" class="product-item col-md-4 col-sm-6 col-12">
          <div class="product-box"
               @click="goToProductDetails(product.id)"
                @keydown.enter="goToProductDetails(product.id)">
            <i :class="getProductImage(product.image)" class="product-icon"></i>
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">Τιμή: {{ product.price }} €</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script src="./FarmerProducts.js"></script>
<style scoped>
.product-page {
  padding: 20px;
}
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.product-item {
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
  height: 150px; /* Ύψος της εικόνας */
  object-fit: cover; /* Προσαρμογή της εικόνας στο πλαίσιο */
}
.product-name {
  margin-bottom: 5px;
  font-weight: bold;
}
.product-price {
  font-size: 0.9em;
  font-weight: bold;
}
</style>
