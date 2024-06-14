<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Επεξεργασία Χρήστη</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="updateFormPerson()">

          <div class="form-group">
            <label class="font-weight-bold">Email</label>
            <input type="email"
                   id="email"
                   name="email"
                   class="form-control"
                   v-model="personForm.email"
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.email.$error }" />
            <div v-if="isSubmitted && !$v.personForm.email.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Username</label>
            <input type="text"
                   id="username"
                   name="username"
                   class="form-control"
                   v-model="personForm.username"
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.username.$error }" />
            <div v-if="isSubmitted && !$v.personForm.username.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Password</label>
            <input type="text"
                   id="password"
                   name="password"
                   class="form-control"
                   v-model="personForm.password"
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.password.$error }" />
            <div v-if="isSubmitted && !$v.personForm.password.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Πλήρες Όνομα</label>
            <input type="text"
                   id="fullname"
                   name="fullname"
                   class="form-control"
                   v-model="personForm.fullname"
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.fullname.$error }" />
            <div v-if="isSubmitted && !$v.personForm.fullname.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Τηλέφωνο</label>
            <input type="text"
                   id="telephone"
                   name="telephone"
                   class="form-control"
                   v-model="personForm.telephone"
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.telephone.$error }" />
            <div v-if="isSubmitted && !$v.personForm.telephone.required"
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
                   v-model="personForm.address"
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.address.$error }" />
            <div v-if="isSubmitted && !$v.personForm.address.required"
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
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.image.$error }" />
            <div v-if="isSubmitted && !$v.personForm.image.required"
                 class="invalid-feedback">
              required! {{ imageError }}
            </div>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Τύπος</label>
            <select type="text"
                    id="type"
                    name="type"
                    class="form-control"
                    v-model="personForm.type"
                    :class="{ 'is-invalid': isSubmitted && $v.personForm.type.$error }">
              <option value="Consumer">Consumer</option>
              <option value="Farmer">Farmer</option>
            </select>
            <div v-if="isSubmitted && !$v.personForm.type.required"
                 class="invalid-feedback">
              required!
            </div>
          </div>

          <div v-if="personForm.type=='Farmer'" class="form-group">
            <label class="font-weight-bold">ΑΦΜ</label>
            <input type="number"
                   id="vat_number"
                   name="vat_number"
                   class="form-control"
                   v-model="personForm.vat_number"
                   :class="{ 'is-invalid': isSubmitted && $v.personForm.vat_number.$error }" />
            <div v-if="isSubmitted && !$v.personForm.vat_number.required"
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

<script src="./EditPerson.js"></script>

<style src="" scoped></style>
