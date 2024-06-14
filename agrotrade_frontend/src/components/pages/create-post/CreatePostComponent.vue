<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Προσθήκη Δημοσίευσης</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmitForm()">

          <div class="form-group">
            <label class="font-weight-bold">Τίτλος</label>
            <input type="text"
                   id="title"
                   name="title"
                   class="form-control"
                   v-model="postForm.title"
                   :class="{ 'is-invalid': isSubmitted && $v.postForm.title.$error }" />
            <div v-if="isSubmitted && !$v.postForm.title.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Εικόνα</label>
            <input type="file"
                   id="image"
                   name="image"
                   class="form-control h-100"
                   @change="onFileChange"
                   :class="{ 'is-invalid': isSubmitted && $v.eventForm.image.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.image.required"
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
                   v-model="postForm.description"
                   :class="{ 'is-invalid': isSubmitted && $v.postForm.description.$error }" />
            <div v-if="isSubmitted && !$v.postForm.description.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <button @click="submitNewPost"
                    class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'user-plus']" /> Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./CreatePost.js"></script>

<style src="" scoped></style>
