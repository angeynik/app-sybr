<template>
      <div style="display: flex; justify-content: center;"> <h2> ИНДИВИДУАЛЬНЫЙ ПРОЕКТ </h2> </div> 
      <div class="appProject">
          <div class="text"> 
              <p>
                Многие из наших клиентов отлично знают какие функции системы нужны именно им и для них мы формируем уникальные, индивидуальные проектные решения.
                Вы можете выбрать как проект определенной группы классификации так и комбинацию из низ. В последнем случае много устройства смогут выполнять задачи из разных функциональных групп что, безусловно, сказывается на стоимости конечного решения.
              </p>
          </div>
          <div class="block_btn">
            <button class="btn_orange" @click="sendToFormOrder"> 
              <h2 class="up_case"> ЗАКАЗАТЬ ПРОЕКТ</h2>
            </button>
          </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
    componentName: 'AppProjectOrder',
    }
  },
  methods: {
    sendToFormOrder() {
      this.$emit('sendData',  { title: "AppProjectOrder" , data: this.componentName});
    }
  },
}
</script>

<style>

</style>