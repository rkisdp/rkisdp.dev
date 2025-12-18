<template>
  <section class="snow-hills relative w-full pointer-events-none z-10">
    <div class="mountains">
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
    </div>
  </section>
</template>

<script setup lang="ts">
// Component for snow hills at the bottom
</script>

<style scoped>
.snow-hills {
  height: 300px;
  overflow: hidden;
  margin-top: -1px; /* Slight overlap with footer border if any */
}

.mountains {
  width: 100%;
  position: relative;
  height: 100%;
}

/* Increased sizing for better coverage */
.mt1 {
  position: absolute;
  content: "";
  left: 10%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 200px solid transparent; /* Increased from 150 */
  border-left: 200px solid transparent; /* Increased from 150 */
  border-bottom: 300px solid #0b364f;
  z-index: 3;
}

.mtsnow1 {
  position: absolute;
  content: "";
  left: -66px; /* Adjusted for wider scale */
  bottom: -100px;
  border-top: 0px solid transparent;
  border-right: 66px solid transparent;
  border-left: 66px solid transparent;
  border-bottom: 100px solid #c1cfd7;
}

.snow-peak-1a {
  position: absolute;
  content: "";
  bottom: -130px;
  left: -45px;
  border-top: 30px solid #c1cfd7;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.snow-peak-1b {
  position: absolute;
  content: "";
  bottom: -130px;
  left: -7px;
  border-top: 30px solid #c1cfd7;
  border-right: 25px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 25px solid transparent;
}

.mt2 {
  position: absolute;
  content: "";
  left: -10%; /* Shifted left to cover edge */
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 200px solid transparent; /* Increased */
  border-left: 200px solid transparent; /* Increased */
  border-bottom: 200px solid #094669;
  z-index: 6;
}

.snow2 {
  position: absolute;
  content: "";
  left: -100px;
  bottom: -98px;
  border-top: 0px solid transparent;
  border-right: 100px solid transparent;
  border-left: 100px solid transparent;
  border-bottom: 100px solid #e4e8eb;
}

/* ... peaks 2a, 2b, 2c stay same relative position or adjust slightly if needed, keeping simple for now as they are small details */
.snow-peak-2a {
  position: absolute;
  bottom: -110px;
  left: -60px;
  border-top: 20px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
}
.snow-peak-2b {
  position: absolute;
  bottom: -120px;
  left: -25px;
  border-top: 30px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
}
.snow-peak-2c {
  position: absolute;
  bottom: -110px;
  right: -60px;
  border-top: 20px solid #e4e8eb;
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
}


.mt3 {
  position: absolute;
  content: "";
  left: 25%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 200px solid transparent;
  border-left: 200px solid transparent;
  border-bottom: 175px solid #094669;
  z-index: 6;
}

.snow3 {
  position: absolute;
  content: "";
  left: -93px;
  bottom: -80px;
  border-top: 0px solid transparent;
  border-right: 93px solid transparent;
  border-left: 93px solid transparent;
  border-bottom: 90px solid #e4e8eb;
}

/* Peaks 3a-3d ... */
.snow-peak-3a { position: absolute; bottom: -100px; left: -60px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-3b { position: absolute; bottom: -100px; left: -20px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-3c { position: absolute; bottom: -100px; right: -20px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-3d { position: absolute; bottom: -100px; right: -60px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }

.mt4 {
  position: absolute;
  content: "";
  left: 60%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 200px solid transparent;
  border-left: 200px solid transparent;
  border-bottom: 250px solid #0b364f;
  z-index: 3;
}

.snow4 {
  position: absolute;
  content: "";
  left: -64px;
  bottom: -75px;
  border-top: 0px solid transparent;
  border-right: 64px solid transparent;
  border-left: 64px solid transparent;
  border-bottom: 80px solid #c1cfd7;
}
/* Peaks 4a-4b ... */
.snow-peak-4a { position: absolute; bottom: -100px; left: -45px; border-top: 30px solid #c1cfd7; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-4b { position: absolute; bottom: -100px; left: -7px; border-top: 30px solid #c1cfd7; border-right: 25px solid transparent; border-left: 25px solid transparent; }


.mt5 {
  position: absolute;
  content: "";
  left: 45%;
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 250px solid transparent; /* Even wider */
  border-left: 250px solid transparent;
  border-bottom: 150px solid #094669;
  z-index: 6;
}

.snow5 {
  position: absolute;
  content: "";
  left: -125px;
  bottom: -75px;
  border-top: 0px solid transparent;
  border-right: 125px solid transparent;
  border-left: 125px solid transparent;
  border-bottom: 75px solid #e4e8eb;
}
/* Peaks 5a-5c ... */
.snow-peak-5a { position: absolute; bottom: -95px; left: -60px; border-top: 20px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-5b { position: absolute; bottom: -100px; left: -25px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-5c { position: absolute; bottom: -95px; right: -60px; border-top: 20px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }


.mt6 {
  position: absolute;
  content: "";
  left: 85%; /* Push to right edge */
  bottom: 0;
  border-top: 0px solid transparent;
  border-right: 200px solid transparent;
  border-left: 200px solid transparent;
  border-bottom: 175px solid #094669;
  z-index: 6;
}

.snow6 {
  position: absolute;
  content: "";
  left: -93px;
  bottom: -80px;
  border-top: 0px solid transparent;
  border-right: 93px solid transparent;
  border-left: 93px solid transparent;
  border-bottom: 90px solid #e4e8eb;
}

/* Peaks 6a-6d ... */
.snow-peak-6a { position: absolute; bottom: -100px; left: -60px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-6b { position: absolute; bottom: -100px; left: -20px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-6c { position: absolute; bottom: -100px; right: -20px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }
.snow-peak-6d { position: absolute; bottom: -100px; right: -60px; border-top: 30px solid #e4e8eb; border-right: 25px solid transparent; border-left: 25px solid transparent; }


/* Responsive adjustments */
@media (max-width: 768px) {
  .snow-hills {
    height: 200px;
  }
  
  /* On mobile, we might need even wider relative shapes or just ensure scaling doesn't shrink coverage */
  .mt1, .mt2, .mt3, .mt4, .mt5, .mt6 {
    /* Scale down slightly but ensure width covers */
    /* Since we increased base size, 0.7 scale might be okay, but let's check positions */
    transform: scale(0.7);
    transform-origin: bottom center; /* Ensure they scale from bottom to stay aligned */
  }
  
  /* Adjust left positions for mobile to maintain overlap */
  .mt2 { left: -20%; }
  .mt6 { left: 90%; } 
}
</style>
