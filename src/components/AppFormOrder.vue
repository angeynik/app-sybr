<template>
  <div class="apporder">

  <div class="text_title "> <h2> Персональные данные </h2> </div>
  <hr>

  <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-around;">


  <!-- Блок с персональными данными -->
  <div class="block_orderPersonal">
    <!-- <div class="apporder_data"> -->

        <div class="block_orderPersonal_input">
          <h4 style="color: var(--light_font); padding: 0 0 4px 20px;"> фио </h4>
         <input type="text" v-model="fio"  >
        </div>

        <div class="block_orderPersonal_input"> 
            <div style="display: flex; flex-direction: row; justify-content: flex-start; width: 100%;">

              <div >
                  <h4 style="color: var(--light_font); padding: 0 0 4px 20px; width: 100px;"> код </h4>
                  <input type="number" v-model="phone_cod" style="width: 45%;">
              </div>

              <div >
                  <h4 style="color: var(--light_font); padding: 0 0 4px 20px;"> телефон </h4>
                  <input type="number" v-model="phone" style="width: 100%;">
              </div>
            </div>
        </div>

        <div class="block_orderPersonal_input">
          <h3 style="color: var(--light_font); padding: 0 0 4px 20px;"> комментарий </h3>
          <input type="text" style="width: 90%; min-height: 180px;" v-model="comment">
        </div>

  </div>
  <!-- Блок с описанием (текстом)  -->
  <div class="block_orderText">
      <li> Мы предоставим Вам полную информацию о возможностях выбранного продукта </li>
      <li> Проконсультируем о возможностях расширения и модернизации системы </li>
      <li> Предложим варианты оплаты и доставки </li>
      <li> Предоставим услуги по монтажу и запуску Продукта (Вы можете все эти работы выполнить самостоятельно)</li>
      <li> При необходимости подберем альтернативные конфигурации системы </li>
      <p> Отправляя запрос, Вы подтверждаете согласие на обработку персональных данных. Политика обработки персональных данных </p>
  </div>
</div>
<hr>
<!-- Иконки Месенджеров -->
<div class="text_title "> <h2> Удобный для Вас способ коммуникации: </h2> </div>
<div class="allBlocks">
  <div style="width: 18%; margin-left: 5%;">  
    <button :class="{ 'selected': selectedButton === 'telegram' }" @click="messenger = 'telegram'; selectButton('telegram')"> <img src="img/icons_media_Telegram.png" alt="Whatsapp">  </button> 
  </div>
  <div style="width: 18%;"> 
    <button :class="{ 'selected': selectedButton === 'whatsapp' }" @click="messenger = 'whatsapp'; selectButton('whatsapp')"> <img src="img/icons_media_WA.png" alt="Whatsapp"> </button> 
  </div>
  <div style="width: 18%; margin-right: 5%;"> 
    <button :class="{ 'selected': selectedButton === 'phone' }" @click="messenger = 'phone'; selectButton('phone')"> <img src="img/icons_media_phone.png" alt="Phone"> </button> 
  </div>
</div>


    <div class="block_btn" style="width: 80%;"> 
      <button class="btn_dark" @click="sendData"> 
        <h2 class="up_case"> Отправить </h2> 
      </button>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      fio: localStorage.getItem('fio') || '',
      phone_cod: localStorage.getItem('phone_cod') || '',
      phone: localStorage.getItem('phone') || '',
      comment: localStorage.getItem('comment') || '',
      messenger: 'не выбран',
      selectedButton: null,
      personalData: localStorage.getItem('personalData') || [],
    }
  },
  watch: {
    fio(newFio) {
      localStorage.setItem('fio', newFio);
      this.fio = localStorage.getItem('fio');
    },
    phone_cod(newCod) {
      localStorage.setItem('phone_cod', newCod);
      this.phone_cod = localStorage.getItem('phone_cod');
    },
    phone(newPhone) {
      localStorage.setItem('phone', newPhone);
      this.phone = localStorage.getItem('phone');
    },
    comment(newComment) {
      localStorage.setItem('comment', newComment);
      this.comment = localStorage.getItem('comment');
    }
  },
  props: {
    DESCRMOD: Array,
    KEY_FORMORDER: Boolean,
    UUID: String,
  },
  methods: {
    sendData () {
      this.personalData = {
        uuid: this.UUID,
        fio: this.fio,
        phone_cod: this.phone_cod,
        phone: this.phone,
        comment: this.comment,
        messenger: this.messenger
      },
      console.log('сохраняем данные пользователя', this.personalData);
      this.$emit('sendData', { title: "AppFormOrder" , data: this.personalData});
      },
    selectButton(button) {
      this.selectedButton = button;
      this.messenger = button;
    }
  },
}
</script>

<style>
  /* .selected {
  border: 8px solid #000;
} */
</style>