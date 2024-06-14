<template>
  <div class="farmer-page">
    <h1>
      {{ eventDetails.type }}
      <i v-if="liked" class="fi fi-ss-heart p-2 like"></i>
      <i v-else class="fi fi-bs-heart p-2" @keydown.space="addlike" @click="addlike"></i>
    </h1>
    <h2>{{ eventDetails.address }}</h2>
    <h3>Αγρότες</h3>
    <div class="farmer-container">
      <div v-for="farmer in farmers"
           :key="farmer.id"
           class="farmer-item col-12 col-md-6"
           @click="navigateToProfile(farmer.id)"
           @keypress.enter="navigateToProfile(farmer.id)"
           tabindex="0">
        <div class="farmer-image-container">
          <img :src="farmer.profile_image" class="farmer-image" alt="image" />
        </div>
        <div class="farmer-details">
          <p class="farmer-name">{{ farmer.fullname }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./CreateFarmerInEvent.js"></script>

<style scoped>

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: black; /* Μαύρο χρώμα για τον τίτλο */
}

h2 {
  font-size: 1.5em;
  margin-bottom: 1em;
  color: black; /* Μαύρο χρώμα για την υποτίτλο */
}

.like {
  color: red;
 }

.farmer-container {
  display: flex;
  flex-wrap: wrap;
}

.farmer-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: calc(50% - 20px); /* Δύο προϊόντα ανά σειρά */
  cursor: pointer;
}

.farmer-image-container {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.farmer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.farmer-details {
  display: flex;
  flex-direction: column;
}

.farmer-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: black; /* Ορισμός του χρώματος του κειμένου σε μαύρο */
}

.profile-link {
  color: black; /* Ορισμός του χρώματος του κειμένου σε μαύρο */
  text-decoration: none;
}
</style>
