<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Επεξεργασία Διοργάνωσης</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="updateFormEvent()">

          <div class="form-group">
            <label class="font-weight-bold">Τύπος</label>
            <input type="text"
                   id="type"
                   name="type"
                   class="form-control"
                   v-model="eventForm.type"
                   :class="{ 'is-invalid': isSubmitted && $v.eventForm.type.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.type.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Έναρξή</label>
            <input type="text"
                   id="start_date"
                   name="start_date"
                   class="form-control"
                   v-model="eventForm.start_date"
                   :class="{ 'is-invalid': isSubmitted && $v.eventForm.start_date.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.start_date.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Λήξη</label>
            <input type="text"
                   id="end_date"
                   name="end_date"
                   class="form-control"
                   v-model="eventForm.end_date"
                   :class="{ 'is-invalid': isSubmitted && $v.eventForm.end_date.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.end_date.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Διεύθυνση</label>
            <input type="text"
                   id="address"
                   name="address"
                   class="form-control"
                   v-model="eventForm.address"
                   :class="{ 'is-invalid': isSubmitted && $v.eventForm.address.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.address.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Επανάληψη</label>
            <input type="text"
                   id="repeat"
                   name="repeat"
                   class="form-control"
                   v-model="eventForm.repeat"
                   :class="{ 'is-invalid': isSubmitted && $v.eventForm.repeat.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.repeat.required"
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
                   v-model="eventForm.image"
                   :class="{ 'is-invalid': isSubmitted && $v.eventForm.image.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.image.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'user-edit']" /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./EditEvent.js"></script>

<style src="" scoped></style>
