<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Προσθήκη Διοργάνωσης</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmitForm()">

          <div class="form-group">
            <label class="font-weight-bold">Τύπος</label>
            <select type="text"
                    id="type"
                    name="type"
                    class="form-control"
                    v-model="eventForm.type"
                    :class="{ 'is-invalid': isSubmitted && $v.eventForm.type.$error }">
              <option value="Παζάρι">Παζάρι</option>
              <option value="Εκδήλωση">Εκδήλωση</option>
              <option value="Φεστιβάλ">Φεστιβάλ</option>
              <option value="Λαϊκή Αγορά">Λαϊκή Αγορά</option>
              <option value="Ιδιωτική">Ιδιωτική στον χώρο μου</option>
            </select>

            <div v-if="isSubmitted && !$v.eventForm.type.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Έναρξή</label>
            <date-picker type="text"
                         id="start_date"
                         name="start_date"
                         class="form-control w-100 h-100"
                         v-model="eventForm.start_date"
                         :class="{ 'is-invalid': isSubmitted && $v.eventForm.start_date.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.start_date.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Λήξη</label>
            <date-picker type="text"
                         id="end_date"
                         name="end_date"
                         class="form-control w-100 h-100"
                         v-model="eventForm.end_date"
                         :class="{ 'is-invalid': isSubmitted && $v.eventForm.end_date.$error }" />
            <div v-if="isSubmitted && !$v.eventForm.end_date.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Οδός</label>
            <input type="text"
                   id="street"
                   name="street"
                   class="form-control"
                   v-model="address.street"
                   :class="{ 'is-invalid': isSubmitted && $v.address.street.$error }" />
            <div v-if="isSubmitted && !$v.address.street.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>
          <div class="form-group">
            <label class="font-weight-bold">Αριθμός</label>
            <input type="number"
                   id="number"
                   name="number"
                   class="form-control"
                   v-model="address.number"
                   :class="{ 'is-invalid': isSubmitted && $v.address.number.$error }" />
            <div v-if="isSubmitted && !$v.address.number.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>
          <div class="form-group">
            <label class="font-weight-bold">Πόλη</label>
            <input type="text"
                   id="city"
                   name="city"
                   class="form-control"
                   v-model="address.city"
                   :class="{ 'is-invalid': isSubmitted && $v.address.city.$error }" />
            <div v-if="isSubmitted && !$v.address.city.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>
          <div class="form-group">
            <label class="font-weight-bold">ΤΚ</label>
            <input type="number"
                   id="postalCode"
                   name="postalCode"
                   class="form-control"
                   v-model="address.postalCode"
                   :class="{ 'is-invalid': isSubmitted && $v.address.postalCode.$error }" />
            <div v-if="isSubmitted && !$v.address.postalCode.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>
          <div class="form-group">
            <label class="font-weight-bold">Χώρα</label>
            <input type="text"
                   id="country"
                   name="country"
                   class="form-control"
                   v-model="address.country"
                   :class="{ 'is-invalid': isSubmitted && $v.address.country.$error }" />
            <div v-if="isSubmitted && !$v.address.country.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Επανάληψη</label>
            <select type="text"
                    id="repeat"
                    name="repeat"
                    class="form-control"
                    v-model="eventForm.repeat"
                    :class="{ 'is-invalid': isSubmitted && $v.eventForm.repeat.$error }">
              <option value="">Οχι</option>
              <option value="Κάθε μέρα">Κάθε μέρα</option>
              <option value="Κάθε εβδομάδα">Κάθε εβδομάδα</option>
              <option value="Κάθε μήνα">Κάθε μήνα</option>
              <option value="Κάθε χρόνο">Κάθε χρόνο</option>
            </select>
            <div v-if="isSubmitted && !$v.eventForm.repeat.required"
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
            <button @click="submitNewEvent"
                    class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'user-plus']" /> Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./CreateEvent.js"></script>

<style src="" scoped></style>
