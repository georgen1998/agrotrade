<template>
  <div id="app">
    <a class="navbar logo p-1" href="/">
      <img src="/favicon.ico" alt="logo" width="40" /><span>AGROTRADE</span>
    </a>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="mr-auto ml-auto mb-0">
        <router-link class="btn btn-dark mx-2" to="/list-events">
          <i class="fi fi-ts-calendar-days"></i><span>&nbsp;Διοργανώσεις</span>
        </router-link>

        <router-link class="btn btn-dark mx-2" to="/list-products">
          <i class="fi fi-rs-box-open"></i><span>&nbsp;Προιόντα</span>
        </router-link>

        <router-link class="btn btn-dark mx-2" to="/list-posts">
          <i class="fi fi-brands-instagram"></i><span>&nbsp;Δημοσιεύσεις</span>
        </router-link>

        <router-link class="btn btn-dark mx-2" to="/favorites">
          <i class="fi fi-bs-heart"></i><span>&nbsp;Αγαπημένα</span>
        </router-link>
      </ul>
    </nav>

    <div class="m-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<style src="">
  .navbar a {
    display: flex;
    align-items: center;
  }
  .navbar ul {
    display: flex;
    direction: initial;
  }
  #app .logo {
    position: absolute;
    z-index: 1;
    right: 30px;
    top: 0;
    color: #8fcdb8;
  }
  #app .logo:hover {
    color: #8fcdb8;
    text-decoration: none;
  }
  .navbar .card {
    text-align: left;
  }
  .navbar i {
    font-size: 20px;
  }
  body {
    text-align: center !important;
  }

  .navbar .toggle-select {
    float: right;
  }
  @media only screen and (max-width: 600px) {
    .navbar span {
      display: none;
    }
    #app .logo {
      left: 10px;
      right: auto;
    }
  }
</style>
