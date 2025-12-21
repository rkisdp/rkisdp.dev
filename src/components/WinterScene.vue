<template>
  <div align="center" style="padding-top:150px; width: 100%; overflow: hidden; position: relative; transform: scale(1.25); transform-origin: bottom center;" class="fond">
    <div class="contener_home_one">
      <!--El contenedor de la casa, las montañas y los arboles -->
      <div class="fireplace">&nbsp;</div>
      <div class="fireplace_top">&nbsp;</div>
      <div class="triangle">&nbsp;</div>
      <div class="parallelogram">&nbsp;</div>
      <div class="door">&nbsp;</div>
      <div class="window_one">&nbsp;</div>
      <div class="window_two">&nbsp;</div>
      <div class="home_base">&nbsp;</div>

      <!--segunda casa -->
      <div class="home_base" style="left:-380px;">&nbsp;</div>
      <div class="home_base" style="left:-380px;">&nbsp;</div>
      <div class="window_two" style="left:-300px;">&nbsp;</div>
      <div class="window_one" style="left:-360px;">&nbsp;</div>
      <div class="door" style="left:-330px;">&nbsp;</div>
      <div class="triangle" style="left:-385px;">&nbsp;</div>
      <div class="parallelogram" style="left:-360px;">&nbsp;</div>

      <div class="christmas_tree"></div>
      <div class="christmas_tree" style="left:-120px;"></div>
      <div class="christmas_tree_dos" style="left:-150px;"></div>
      <div class="christmas_tree_dos" style="left:-180px;"></div>
      <div class="christmas_tree" style="left:-210px;"></div>
      <div class="christmas_tree" style="left:-440px;"></div>
      <div class="christmas_tree_dos" style="left:-470px;"></div>
      <div class="christmas_tree_dos" style="left:-500px;"></div>
      <div class="christmas_tree" style="left:-520px;"></div>
      <div class="christmas_tree_dos"></div>
      <div class="christmas_tree_dos" style="left:225px;"></div>
      <!-- New trees on the right -->
      <div class="christmas_tree" style="left:400px;"></div>
      <div class="christmas_tree_dos" style="left:450px;"></div>
      <div class="christmas_tree" style="left:500px;"></div>
    </div>
    
    <!-- Keep only the snowman in the contener_snow, remove snowflakes and flying santa -->
    <div class="contener_snow">
      <div class="snowman">
        <div class="body" id="scaled3" style="left:140px;">
          <div class="head"></div>
          <div class="hat"></div>
          <div class="scarf"></div>
          <div class="buttons"></div>
          <div class="hands">
            <div class="right-hand"></div>
            <div class="left-hand"></div>
          </div>
          <div class="shadow"></div>
        </div>
      </div>
    </div>

    <div style="width:100%; height:25px; background-color:#ffffff; position: relative; z-index: 100;">&nbsp;</div>
    <div style="position: absolute; bottom: 25px; left: 0; width: 100%; z-index: -2;">
      <SnowHills />
    </div>
  </div>
</template>

<script setup lang="ts">
import SnowHills from "./SnowHills.vue";
// WinterScene component
</script>

<style scoped>


@keyframes color {
  0% {
    color: #FB0505;
  }
  25% {
    color: #052FFB;
  }
  50% {
    color: #FB05C4;
  }
  85% {
    color: #F4FB05;
  }
  100% {
    color: #05FBD1;
  }
}

.contener_home_one {
  width: 150px;
  height: 76px;
  position: relative;
  z-index: 0;
}

.home_base {
  position: absolute;
  bottom: 0;
  background-color: #d75f3d;
  width: 125px;
  left: 14px;
  height: 40px;
}

.triangle {
  left: 8px;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 36px solid #ffffff;
}

.parallelogram {
  left: 34px;
  position: absolute;
  width: 102px;
  height: 36px;
  transform: skew(26deg);
  background-color: #ffffff;
}

.door {
  background-color: #742e1a;
  z-index: 1;
  width: 15px;
  height: 25px;
  position: absolute;
  bottom: 0;
  left: 65px;
}

.window_one {
  background-color: #f9eb32;
  z-index: 1;
  width: 15px;
  height: 15px;
  position: absolute;
  bottom: 10px;
  left: 32px;
  -webkit-animation: light 1.8s linear;
  -webkit-animation-iteration-count: infinite;
  animation: light 1.8s linear;
  animation-iteration-count: infinite;
}

.window_two {
  background-color: #f9eb32;
  z-index: 1;
  width: 15px;
  height: 15px;
  position: absolute;
  bottom: 10px;
  left: 95px;
  -webkit-animation: light 1.4s linear;
  -webkit-animation-iteration-count: infinite;
  -moz-animation: light 1.4s linear;
  -moz-animation-iteration-count: infinite;
  animation: light 1.4s linear;
  animation-iteration-count: infinite;
}

.christmas_tree {
  right: -20px;
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 70px solid green;
}

.christmas_tree_dos {
  right: -20px;
  left: 350px;
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 70px solid #185706;
}



.fireplace {
  background-color: #d75f3d;
  z-index: 1;
  width: 15px;
  height: 25px;
  position: absolute;
  top: -10px;
  right: 30px;
}

.fireplace_top {
  background-color: #ffffff;
  z-index: 1;
  width: 20px;
  height: 5px;
  position: absolute;
  top: -15px;
  right: 28px;
}

@-webkit-keyframes light {
  0% {
    background-color: #f9eb32;
  }
  70% {
    background-color: #f9ac32;
  }
  10% {
    background-color: #f99032;
  }
}

@-moz-keyframes light {
  0% {
    background-color: #f9eb32;
  }
  70% {
    background-color: #f9ac32;
  }
  10% {
    background-color: #f99032;
  }
}

@-ms-keyframes light {
  0% {
    background-color: #f9eb32;
  }
  70% {
    background-color: #f9ac32;
  }
  10% {
    background-color: #f99032;
  }
}

@keyframes light {
  0% {
    background-color: #f9eb32;
  }
  70% {
    background-color: #f9ac32;
  }
  10% {
    background-color: #f99032;
  }
}

/* Keep contener_snow for positioning snowman */
.contener_snow {
  position: absolute;
  top: 70px;
  left: 50%;
  margin-left: -150px;
  z-index: 50;
}

/* Snowman CSS */
#scaled3 {
  top: -25px;
  transform: scale(0.30);
}

.snowman .body {
  width: 200px;
  height: 200px;
  background: #ecf0f1;
  box-shadow: -13px -8px 0 rgba(0, 0, 0, 0.1) inset;
  border-radius: 50%;
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  margin-top: 70px;
}

.snowman .body:before {
  width: 100px;
  height: 100px;
  background: #ecf0f1;
  box-shadow: -5px 0 0 rgba(0, 0, 0, 0.1) inset;
  border-radius: 50%;
  display: inline-block;
  content: "";
  position: relative;
  top: -191px;
  left: 46px;
  z-index: 30;
}

.snowman .body:after {
  width: 160px;
  height: 160px;
  background: #ecf0f1;
  box-shadow: -7px -5px 0 rgba(0, 0, 0, 0.1) inset;
  border-radius: 50%;
  display: inline-block;
  content: "";
  position: relative;
  top: -203px;
  left: 20px;
}

.snowman .body .head {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 41px 8px 0;
  border-color: transparent #FA9A20 transparent transparent;
  content: "";
  position: relative;
  top: -229px;
  display: inline-block;
  left: -50px;
  transform: rotate(10deg);
  box-shadow: 0 43px rgba(0, 0, 0, 0.2) inset;
  z-index: 30;
}

.snowman .body .head:before {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2c3e50;
  display: inline-block;
  position: absolute;
  top: -23px;
  left: 20px;
}

.snowman .body .head:after {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2c3e50;
  display: inline-block;
  position: absolute;
  top: -26px;
  left: 40px;
}

.scarf {
  border-bottom: 21px solid rgb(243, 77, 77);
  border-left: 18px solid transparent;
  border-right: 29px solid transparent;
  height: 0;
  width: 104px;
  position: absolute;
  top: -101px;
  z-index: 30;
  left: 50px;
  border-radius: 0 100% 5px 10px;
}

.scarf:after {
  width: 74px;
  height: 17px;
  transform: rotate(86deg);
  background: rgb(243, 77, 77);
  display: inline-block;
  content: "";
  position: absolute;
  top: 34px;
  left: 15px;
  border-radius: 50% 0 50% 50%;
  box-shadow: -4px 0 rgba(0, 0, 0, 0.1) inset;
}

.snowman .body .shadow {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  width: 190px;
  height: 30px;
  position: absolute;
  bottom: -29px;
  z-index: 2;
  left: 30px;
}

.left-hand {
  position: absolute;
  top: -30px;
  left: -7px;
  transform: rotate(15deg);
  border-bottom: 6px solid rgba(151, 102, 13, 1);
  border-left: 2px solid transparent;
  border-right: 0 solid transparent;
  height: 0;
  width: 36px;
}

.left-hand:before {
  width: 81px;
  left: -82px;
  position: absolute;
  content: "";
  display: inline-block;
  transform: rotate(-12deg);
  top: 8px;
  border-bottom: 7px solid rgba(128, 84, 6, 1);
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  height: 0;
  z-index: 30;
}

.left-hand:after {
  width: 47px;
  left: -88px;
  position: absolute;
  content: "";
  display: inline-block;
  transform: rotate(17deg);
  top: 3px;
  border-bottom: 4px solid rgba(128, 84, 6, 1);
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  height: 0;
  border-radius: 20px 50% 10% 20%;
}

.right-hand {
  position: absolute;
  top: -30px;
  right: -37px;
  transform: rotate(-12deg);
  border-bottom: 6px solid rgba(151, 102, 13, 1);
  border-right: 2px solid transparent;
  border-left: 0 solid transparent;
  height: 0;
  width: 66px;
}

.right-hand:before {
  width: 80px;
  right: -82px;
  position: absolute;
  content: "";
  display: inline-block;
  transform: rotate(10deg);
  top: 7px;
  border-bottom: 6px solid rgba(128, 84, 6, 1);
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  height: 0;
  z-index: 30;
}

.right-hand:after {
  width: 47px;
  right: -47px;
  position: absolute;
  content: "";
  display: inline-block;
  transform: rotate(-16deg);
  top: -6px;
  border-bottom: 4px solid rgba(128, 84, 6, 1);
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  height: 0;
  border-radius: 20px 50% 10% 20%;
}

.snowman .hat {
  top: -260px;
  left: 95px;
  transform: rotate(10deg);
  position: absolute;
  border-radius: 0;
  z-index: 30;
  border-top: 56px solid rgb(37, 37, 37);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  width: 90px;
  border-bottom: 27px solid rgb(246, 62, 62);
}

.snowman .buttons {
  height: 8px;
  width: 8px;
  background: #2c3e50;
  position: absolute;
  border-radius: 50%;
  left: 60px;
  top: -23px;
  z-index: 30;
}

.snowman .buttons:before {
  height: 10px;
  width: 10px;
  background: #2c3e50;
  position: absolute;
  content: "";
  display: inline-block;
  border-radius: 50%;
  top: -30px;
  left: 5px;
}

.snowman .buttons:after {
  height: 6px;
  width: 6px;
  background: #2c3e50;
  position: absolute;
  content: "";
  display: inline-block;
  border-radius: 50%;
  top: 30px;
  left: 5px;
}
</style>
