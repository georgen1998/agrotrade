<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>ΕΓΓΡΑΦΗ</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmitForm()">

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
            <input type="password"
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
            <button @click="submitNewPerson"
                    class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'user-plus']" /> Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./CreatePerson.js"></script>

<style src="" scoped></style>
