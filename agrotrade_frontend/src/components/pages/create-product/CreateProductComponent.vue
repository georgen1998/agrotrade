<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Προσθήκη Προιόντος</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmitForm()">

          <div class="form-group">
            <label class="font-weight-bold">Είδος</label>
            <select v-model="productForm.product_id" class="form-control">
              <option v-for="product in products" :key="product.product_id"
                      :value="product.id">
                {{ product.name }}
              </option>
            </select>
            <div v-if="isSubmitted && !$v.productForm.product_id.required" class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Τιμή</label>
            <input type="number"
                   id="price"
                   name="price"
                   class="form-control"
                   v-model="productForm.price"
                   :class="{ 'is-invalid': isSubmitted && $v.productForm.price.$error }" />
            <div v-if="isSubmitted && !$v.productForm.price.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Περιγραφή</label>
            <input type="text"
                   id="description"
                   name="description"
                   class="form-control"
                   v-model="productForm.description"
                   :class="{ 'is-invalid': isSubmitted && $v.productForm.description.$error }" />
            <div v-if="isSubmitted && !$v.productForm.description.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <button @click="submitNewProduct"
                    class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'user-plus']" /> Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./CreateProduct.js"></script>

<style src="" scoped>
  .form-check{
      padding:0px 20px;
  }
  .invoice-options{
      display:flex;
  }
</style>
