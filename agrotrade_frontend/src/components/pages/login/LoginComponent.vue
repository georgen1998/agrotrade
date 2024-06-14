<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <div v-if="isLoggedIn" class="text-center">
              <p>You are already logged in!</p>
              <router-link :to="{ name: 'edit-person', params: { id } }"
                           class="btn btn-light">
                Edit Profile
              </router-link>
              <button @click="logout" class="btn btn-danger">Logout</button>
            </div>
            <div v-else>
              <h2 class="card-title text-center">Welcome</h2>
              <img src="/logo.png" alt="logo" width="100%" class="mt-2 mb-4">
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" id="username"
                         v-model="username" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password"
                         v-model="password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">LOGIN</button>
                <br /><br />
                <div class="text-center">
                  <label for="username">New to AgroTrade? </label>
                  <router-link :to="{ name: 'add-person' }" class="">
                    Join Now !
                  </router-link>
                </div>
                <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src = "./Login.js" > </script>
