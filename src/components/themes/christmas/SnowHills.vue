<template>
  <section class="mountains">
    <div class="mt1">
      <div class="mtsnow1"></div>
      <div class="snow-peak-1a"></div>
      <div class="snow-peak-1b"></div>
    </div>
    <div class="mt2">
      <div class="snow2"></div>
      <div class="snow-peak-2a"></div>
      <div class="snow-peak-2b"></div>
      <div class="snow-peak-2c"></div>
    </div>
    <div class="mt3">
      <div class="snow3"></div>
      <div class="snow-peak-3a"></div>
      <div class="snow-peak-3b"></div>
      <div class="snow-peak-3c"></div>
      <div class="snow-peak-3d"></div>
    </div>
    <div class="mt4">
      <div class="snow4"></div>
      <div class="snow-peak-4a"></div>
      <div class="snow-peak-4b"></div>
    </div>
    <div class="mt5">
      <div class="snow5"></div>
      <div class="snow-peak-5a"></div>
      <div class="snow-peak-5b"></div>
      <div class="snow-peak-5c"></div>
    </div>
    <div class="mt6">
      <div class="snow6"></div>
      <div class="snow-peak-6a"></div>
      <div class="snow-peak-6b"></div>
      <div class="snow-peak-6c"></div>
      <div class="snow-peak-6d"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component for snow hills at the bottom
</script>

<style scoped>
.mountains {
  width: 80%;
  position: relative;
  height: 150px;
}

.mt1 {
  position: absolute;
  content: "";
  left: 3%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 150px solid transparent;
  border-left: 150px solid transparent;
  border-bottom: 150px solid #0b364f;
  z-index: 3;
}

.mtsnow1 {
  position: absolute;
  content: "";
  left: -67px;
  bottom: -66px;
  border-top: 0px solid transparent;
  border-right: 67px solid transparent;
  border-left: 67px solid transparent;
  border-bottom: 66px solid #c1cfd7;
}

.snow-peak-1a {
  position: absolute;
  content: "";
  bottom: -86px;
  left: -40px;
  border-top: 30px solid #c1cfd7;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-1b {
  position: absolute;
  content: "";
  bottom: -86px;
  left: -7px;
  border-top: 30px solid #c1cfd7;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.mt2 {
  position: absolute;
  content: "";
  left: -5%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 150px solid transparent;
  border-left: 150px solid transparent;
  border-bottom: 100px solid #094669;
  z-index: 6;
}

.snow2 {
  position: absolute;
  content: "";
  left: -95px;
  bottom: -66px;
  border-top: 0px solid transparent;
  border-right: 90px solid transparent;
  border-left: 95px solid transparent;
  border-bottom: 66px solid #e4e8eb;
}

.snow-peak-2a {
  position: absolute;
  content: "";
  bottom: -72px;
  left: -60px;
  border-top: 20px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-2b {
  position: absolute;
  content: "";
  bottom: -80px;
  left: -25px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-2c {
  position: absolute;
  content: "";
  bottom: -85px;
  right: -60px;
  border-top: 20px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.mt3 {
  position: absolute;
  content: "";
  left: 22%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 150px solid transparent;
  border-left: 150px solid transparent;
  border-bottom: 85px solid #094669;
  z-index: 6;
}

.snow3 {
  position: absolute;
  content: "";
  left: -92px;
  bottom: -53px;
  border-top: 0px solid transparent;
  border-right: 90px solid transparent;
  border-left: 92px solid transparent;
  border-bottom: 60px solid #e4e8eb;
}

.snow-peak-3a {
  position: absolute;
  content: "";
  bottom: -66px;
  left: -60px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-3b {
  position: absolute;
  content: "";
  bottom: -66px;
  left: -20px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-3c {
  position: absolute;
  content: "";
  bottom: -66px;
  right: -20px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-3d {
  position: absolute;
  content: "";
  bottom: -66px;
  right: -60px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.mt4 {
  position: absolute;
  content: "";
  left: 67%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 150px solid transparent;
  border-left: 150px solid transparent;
  border-bottom: 125px solid #0b364f;
  z-index: 3;
}

.snow4 {
  position: absolute;
  content: "";
  left: -60px;
  bottom: -50px;
  border-top: 0px solid transparent;
  border-right: 60px solid transparent;
  border-left: 60px solid transparent;
  border-bottom: 53px solid #c1cfd7;
}

.snow-peak-4a {
  position: absolute;
  content: "";
  bottom: -66px;
  left: -45px;
  border-top: 30px solid #c1cfd7;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-4b {
  position: absolute;
  content: "";
  bottom: -66px;
  left: -7px;
  border-top: 30px solid #c1cfd7;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.mt5 {
  position: absolute;
  content: "";
  left: 38%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 200px solid transparent;
  border-left: 200px solid transparent;
  border-bottom: 75px solid #094669;
  z-index: 6;
}

.snow5 {
  position: absolute;
  content: "";
  left: -130px;
  bottom: -50px;
  border-top: 0px solid transparent;
  border-right: 130px solid transparent;
  border-left: 130px solid transparent;
  border-bottom: 50px solid #e4e8eb;
}

.snow-peak-5a {
  position: absolute;
  content: "";
  bottom: -63px;
  left: -60px;
  border-top: 20px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-5b {
  position: absolute;
  content: "";
  bottom: -66px;
  left: -25px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-5c {
  position: absolute;
  content: "";
  bottom: -63px;
  right: -60px;
  border-top: 20px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.mt6 {
  position: absolute;
  content: "";
  left: 79%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 150px solid transparent;
  border-left: 150px solid transparent;
  border-bottom: 85px solid #094669;
  z-index: 6;
}

.snow6 {
  position: absolute;
  content: "";
  left: -90px;
  bottom: -53px;
  border-top: 0px solid transparent;
  border-right: 90px solid transparent;
  border-left: 90px solid transparent;
  border-bottom: 60px solid #e4e8eb;
}

.snow-peak-6a {
  position: absolute;
  content: "";
  bottom: -66px;
  left: -60px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-6b {
  position: absolute;
  content: "";
  bottom: -66px;
  left: -20px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-6c {
  position: absolute;
  content: "";
  bottom: -66px;
  right: -20px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-6d {
  position: absolute;
  content: "";
  bottom: -66px;
  right: -60px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .mountains {
    height: 130px;
  }
  
  .mt1, .mt2, .mt3, .mt4, .mt5, .mt6 {
    transform: scale(0.6);
    transform-origin: bottom center;
  }
}
</style>
