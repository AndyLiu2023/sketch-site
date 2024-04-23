<script setup>



import homeIntro from '../components/home_Intro.vue';
import modeSelection from '../components/mode_selection.vue';
import credit from '@/components/credit.vue';
import contentWarning from '../components/contentwarning.vue';
import thefooter from '../components/footer.vue';







</script>
<template>



<header>
  <Transition name="slieIn" appear>
  <h1>速寫練習</h1> 
  </Transition>
</header>

<body>
  
<Transition name="slieIn-first" appear>
    <div class="intro-div">
        <homeIntro>

        </homeIntro>
    </div>
</Transition>

<Transition name="slieIn-second" appear>
    <div class="intro-div">
        <modeSelection>

        </modeSelection>
    </div>
</Transition>

<Transition name="slieIn-third" appear>
    <div class="intro-div">
        <credit>
    
        </credit>
    </div>
</Transition>

</body>

<thefooter></thefooter>

<contentWarning></contentWarning>
    
</template>

<style scoped>

.slieIn-enter-active,
.slieIn-leave-active {
  transition: opacity 2s ease;
}

.slieIn-enter-from,
.slieIn-leave-to {
  opacity: 0;
}


.slieIn-first-enter-active,
.slieIn-first-leave-active {
  transition: opacity 2s ease;
  transition-delay: 0.25s;

}

.slieIn-first-enter-from,
.slieIn-first-leave-to {
  opacity: 0;
}

.slieIn-second-enter-active,
.slieIn-second-leave-active {
  transition: opacity 2s ease;
  transition-delay: 0.5s;

}

.slieIn-second-enter-from,
.slieIn-second-leave-to {
  opacity: 0;
}

.slieIn-third-enter-active,
.slieIn-third-leave-active {
  transition: opacity 2s ease;
  transition-delay: 1s;

}

.slieIn-third-enter-from,
.slieIn-third-leave-to {
  opacity: 0;
}





</style>../../apiconnect/checkToken.js