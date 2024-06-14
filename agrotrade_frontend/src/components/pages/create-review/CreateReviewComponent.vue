<template>
  <div class="container">
    <div v-if="type=='Consumer' && flag" class="card">
      <div class="card-header">
        <h3>Προσθήκη Κριτικής</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmitForm">
          <div class="form-group">
            <label class="font-weight-bold">Αστέρια</label>
            <input type="number"
                   id="stars"
                   name="stars"
                   class="form-control"
                   placeholder="Δώστε τα αστέρια (1-5)"
                   v-model="reviewForm.stars"
                   :class="{ 'is-invalid': isSubmitted && $v.reviewForm.stars.$error }" />
            <div v-if="isSubmitted && !$v.reviewForm.stars.required" class="invalid-feedback">
              Απαιτείται!
            </div>
            <div v-if="isSubmitted && !$v.reviewForm.stars.between" class="invalid-feedback">
              Πρέπει να είναι μεταξύ 1 και 5!
            </div>
          </div>
          <div class="form-group">
            <label class="font-weight-bold">Περιγραφή</label>
            <textarea id="description"
                      name="description"
                      class="form-control"
                      placeholder="Περιγράψτε την εμπειρία σας"
                      v-model="reviewForm.description"
                      :class="{
                        'is-invalid': isSubmitted && $v.reviewForm.description.$error
                      }"></textarea>
            <div v-if="isSubmitted && !$v.reviewForm.description.required" class="invalid-feedback">
              Απαιτείται!
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'user-plus']" /> Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>

    <h3>Κριτικές</h3>
    <div class="reviews-container mt-4 row">
      <div v-for="review in reviews" :key="review.id" class="review-card card mb-3 col-12 col-md-4">
        <div class="card-body">
          <div class="review-header d-flex align-items-center mb-2">
            <img :src="review.customer.profile_image ? 'https://agrotrade.shopitnow.gr' + review.customer.profile_image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-post.jpg'" class="rounded-circle profile-image" alt="image" />
            <span class="ml-2">{{ review.customer.username }}</span>
          </div>
          <div class="review-stars mb-2">
            <span v-for="star in review.stars" :key="star" class="star">&#9733;</span>
            <span v-for="star in 5 - review.stars" :key="star" class="star">&#9734;</span>
          </div>
          <p class="review-description">{{ review.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script src = "./CreateReview.js" > </script>
<style scoped>
.profile-image {
  width: 40px;
  height: 40px;
}
.star {
  color: gold;
  font-size: 1.2rem;
}
</style>
