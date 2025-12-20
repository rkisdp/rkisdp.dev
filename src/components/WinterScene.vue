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
      <div class="mountain_one">
        <div class="sub_mountain_one">&nbsp;</div>
      </div>
      <div class="mountain_one_dos">
        <div class="sub_mountain_one_dos">&nbsp;</div>
      </div>
      <div class="mountain_one_tres">
        <div class="sub_mountain_one_tres">&nbsp;</div>
      </div>
      <div class="mountain_two">
        <div class="sub_mountain_two">&nbsp;</div>
      </div>
      <div class="mountain_tres">
        <div class="sub_mountain_tres">&nbsp;</div>
      </div>
      <div class="mountain_cuatro">
        <div class="sub_mountain_cuatro">&nbsp;</div>
      </div>
      <div class="mountain_five">
        <div class="sub_mountain_five">&nbsp;</div>
      </div>
      <div class="mountain_six">
        <div class="sub_mountain_six">&nbsp;</div>
      </div>
      
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

    <div style="width:100%; height:25px; background-color:#ffffff;">&nbsp;</div>
  </div>
</template>

<script setup lang="ts">
// WinterScene component
</script>

<style scoped>
.contenedor {
  width: 100%;
}

#remove-bg {
  filter: brightness(1.1);
  mix-blend-mode: multiply;
}

.arbol_cont {
  width: 100%;
  height: 300px;
  text-align: center;
}

.estrella {
  font-size: 30px;
  width: 100%;
  height: 30px;
  animation: color infinite linear 2s;
}

.parrafo {
  font-size: 30px;
  animation: color infinite linear 3s;
}

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
  bottom: 0px;
  background-color: #d75f3d;
  width: 125px;
  left: 14px;
  height: 40px;
}

.triangle {
  left: 8px;
  position: absolute;
  width: 0px;
  height: 0px;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 36px solid #ffffff;
}

.parallelogram {
  left: 34px;
  position: absolute;
  width: 102px;
  height: 36px;
  -webkit-transform: skew(26deg);
  -moz-transform: skew(26deg);
  -o-transform: skew(26deg);
  transform: skew(26deg);
  background-color: #ffffff;
}

.door {
  background-color: #742e1a;
  z-index: 1;
  width: 15px;
  height: 25px;
  position: absolute;
  bottom: 0px;
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
  -ms-animation: light 1.4s linear;
  -ms-animation-iteration-count: infinite;
  animation: light 1.4s linear;
  animation-iteration-count: infinite;
}

.christmas_tree {
  right: -20px;
  position: absolute;
  bottom: 0px;
  width: 0px;
  height: 0px;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 70px solid green;
}

.christmas_tree_dos {
  right: -20px;
  left: 350px;
  position: absolute;
  bottom: 0px;
  width: 0px;
  height: 0px;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 70px solid #185706;
}

/* Mountains reduced by 50% */
.mountain_one {
  position: absolute;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 110px solid #E8F3E7;
}

.sub_mountain_one {
  position: absolute;
  top: 0px;
  left: -15px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.mountain_one_dos {
  position: absolute;
  left: -350px;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 110px solid #E8F3E7;
}

.sub_mountain_one_dos {
  position: absolute;
  top: 0px;
  left: -15px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.mountain_one_tres {
  position: absolute;
  left: 325px;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 110px solid #E8F3E7;
}

.sub_mountain_one_tres {
  position: absolute;
  top: 0px;
  left: -15px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.sub_mountain_two {
  position: absolute;
  top: 0px;
  left: -10px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.mountain_two {
  position: absolute;
  left: -175px;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 165px solid #E8F3E7;
}

.sub_mountain_tres {
  position: absolute;
  top: 0px;
  left: -10px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.mountain_tres {
  position: absolute;
  left: 175px;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 165px solid #DAE4D7;
}

.sub_mountain_cuatro {
  position: absolute;
  top: 0px;
  left: -10px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.mountain_cuatro {
  position: absolute;
  left: -500px;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 165px solid #DAE4D7;
}

.sub_mountain_five {
  position: absolute;
  top: 0px;
  left: -15px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.mountain_five {
  position: absolute;
  left: 450px;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 140px solid #E8F3E7;
}

.sub_mountain_six {
  position: absolute;
  top: 0px;
  left: -10px;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #ffffff;
}

.mountain_six {
  position: absolute;
  left: 580px;
  bottom: 0;
  z-index: -1;
  width: 0px;
  height: 0px;
  border-left: 90px solid transparent;
  border-right: 90px solid transparent;
  border-bottom: 160px solid #DAE4D7;
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

/* Wide snow layer under snowman */
.wide-snow {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  min-width: 1000px;
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
  box-shadow: -13px -8px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 50%;
  margin-top: -100px;
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
  box-shadow: -5px 0px 0px rgba(0, 0, 0, 0.1) inset;
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
  box-shadow: -7px -5px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 50%;
  display: inline-block;
  content: "";
  position: relative;
  top: -203px;
  left: 20px;
}

.snowman .body .head {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 8px 41px 8px 0;
  border-color: transparent #FA9A20 transparent transparent;
  content: "";
  position: relative;
  top: -229px;
  display: inline-block;
  left: -50px;
  -webkit-transform: rotate(10deg);
  -moz-transform: rotate(10deg);
  transform: rotate(10deg);
  box-shadow: 0px 43px rgba(0, 0, 0, 0.2) inset;
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
  border-radius: 0px 100% 5px 10px;
}

.scarf:after {
  width: 74px;
  height: 17px;
  -webkit-transform: rotate(86deg);
  -moz-transform: rotate(86deg);
  transform: rotate(86deg);
  background: rgb(243, 77, 77);
  display: inline-block;
  content: "";
  position: absolute;
  top: 34px;
  left: 15px;
  border-radius: 50% 0% 50% 50%;
  box-shadow: -4px 0px rgba(0, 0, 0, 0.1) inset;
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
  -webkit-transform: rotate(15deg);
  -moz-transform: rotate(15deg);
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
  -webkit-transform: rotate(-12deg);
  -moz-transform: rotate(-12deg);
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
  -webkit-transform: rotate(17deg);
  -moz-transform: rotate(17deg);
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
  -webkit-transform: rotate(-12deg);
  -moz-transform: rotate(-12deg);
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
  -webkit-transform: rotate(10deg);
  -moz-transform: rotate(10deg);
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
  -webkit-transform: rotate(-16deg);
  -moz-transform: rotate(-16deg);
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
  -webkit-transform: rotate(10deg);
  -moz-transform: rotate(10deg);
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
