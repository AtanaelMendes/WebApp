<template>
  <ap-modal ref="newCulturaModal" title="Nova Cultura" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaCultura" @slide-trigger="setStepperIndex">
      <!--INFORMAÇÕES-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Defina as informações básicas dessa cultura</span>
        </div>

      </q-carousel-slide>

      <!--CLASSIFICAÇÕES-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Selecione uma cultura</span>
        </div>
      </q-carousel-slide>

    </q-carousel>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  export default {
    name: "NewCulturaModal",
    components: {
      apModal
    },
    data(){
      return {
        isModalOpened: false,
        currentStep: 0,
      }
    },
    methods: {
      openModal() {
        this.isModalOpened = true;
      },
      closeModal() {
        this.isModalOpened = false;
        this.resetModal();
      },
      resetModal(){
        this.$refs.stepperNovaCultura.goToSlide(0);
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      goToNextStep(){
        this.$refs.stepperNovaCultura.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovaCultura.previous();
      },
    }
  }
</script>

<style scoped>

</style>
