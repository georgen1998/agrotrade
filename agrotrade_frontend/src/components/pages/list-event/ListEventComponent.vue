<template>
  <div class="event-list">
    <div class="title-wrapper">
      <router-link v-if="type=='Farmer'"
                   :to="{ name: 'add-event' }" class="btn btn-dark">
        <i class="fi fi-sr-add"></i>&nbsp; Προσθήκη
      </router-link>
      <h3>Διοργανώσεις</h3>
      <router-link :to="{ name: 'map' }" class="map">
        <h4>Δες τον χάρτη</h4><i class="fi fi-rs-map-marker"></i>
      </router-link>
    </div>
    <div class="container-list" v-for="(event, index) in events" :key="index">
      <div class="card-container">
        <div class="photo-container">
          <div class="date">
            <div class="day">{{ getDay(event.start_date) }} {{ getMonth(event.start_date) }}</div>
            <span v-if="event.start_date != event.end_date">
              -<div class="day">{{ getDay(event.end_date) }} {{ getMonth(event.end_date) }}</div>
            </span>
            <br />
            <h6 class="month">{{ event.repeat_interval }}</h6>
          </div>
        </div>
        <div class="info-container">
          <div class="event-name">
            {{ event.type }}
          </div>
          <div class="event-location">
            {{ event.address }}
          </div>
          <router-link :to="{ name: 'list-farmers-events', params: { id: event.id } }"
                       class="btn btn-light m-1">
            Δες τους συμμετεχοντες
          </router-link>
          <div class="image-container">
            <img :src="event.image ? 'https://agrotrade.shopitnow.gr' + event.image : 'https://agrotrade.shopitnow.gr' + '/uploads/default-event.jpg'" class="w-100" alt="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./ListEvent.js"></script>

<style src="" scoped>

  body {
    height: 700px;
    background-color: #e4e4e4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container-list {
    text-align: -webkit-center;
  }

  .photo-container {
    font-size: 1.5em;
    background-color: #2c3e52;
    color: white;
    padding: 20px;
    text-align: center;
    grid-area: photo;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-container {
    margin: 10px;
    display: grid;
    grid-template-areas: 'photo info';
    grid-template-columns: 150px 1fr;
    width: 500px;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    line-height: 1.75em;
  }

  .info-container {
    padding: 20px;
    grid-area: info;
  }

  .event-name {
    font-weight: bold;
    padding-bottom: 5px;
  }

  .event-location {
    font-weight: 500;
  }

  .day {
    font-weight: 500;
  }

  .month {
    font-weight: 300;
  }

  @media( max-width: 600px ) {
    .card-container {
      width: 95%;
    }
  }

  .fi-rs-map-marker {
    font-size: 50px;
    padding: 10px;
    color: #2c3e52;
  }

  a:hover {
    text-decoration: none;
  }

  .map {
    justify-content: center;
    align-items: center;
    display: flex;
    color: #2c3e52;
  }
</style>
