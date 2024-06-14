σ<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Επεξεργασία Προιόντος</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="updateFormProduct()">

          <div class="form-group">
            <label class="font-weight-bold">Όνομα</label>
            <input type="text"
                   id="name"
                   name="name"
                   class="form-control"
                   v-model="productForm.name"
                   :class="{ 'is-invalid': isSubmitted && $v.productForm.name.$error }" />
            <div v-if="isSubmitted && !$v.productForm.name.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Τύπος</label>
            <input type="text"
                   id="type"
                   name="type"
                   class="form-control"
                   v-model="productForm.type"
                   :class="{ 'is-invalid': isSubmitted && $v.productForm.type.$error }" />
            <div v-if="isSubmitted && !$v.productForm.type.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Εικόνα</label>
            <input type="text"
                   id="image"
                   name="image"
                   class="form-control"
                   v-model="productForm.image"
                   :class="{ 'is-invalid': isSubmitted && $v.productForm.image.$error }" />
            <div v-if="isSubmitted && !$v.productForm.image.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'user-edit']" /> Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./EditProduct.js"></script>

<style src="" scoped>
  .form-check {
    padding: 0px 20px;
  }

  .invoice-options {
    display: flex;
  }
</style>
