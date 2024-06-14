<template>
    <div>
      <h3 class="text-center">Χάρτης</h3>
      <div id="map" ref="map"></div>
    </div>
</template>
<script src = "./Map.js" > </script>
<style scoped>
#map {
  height: 600px;
  width: 100%;
}
.leaflet-bottom{
    display:none;
}
</style>
