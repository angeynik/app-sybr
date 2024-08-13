<template>

  <div class="collumn">
    <div class="appcheck_title_right"> <h2> Заказ № SM-2407{{ ORDER }} </h2> </div> 
    <div class="appcheck_title_right"> <h1> Проверка конфигурации</h1> </div>
  </div>
  <hr /> 

    <!-- <div id="appcheck" v-for="(func, index) in FUNCS" :key="index" >  -->
  <div id="AppCheck" v-for="(select, index) in SELECTED" :key="index" > 
  <!-- <div>  -->
    
    <AppCheckBlock 
    :modul = select.modul
    :type = select.type
    :funcs = select.func
    /> 
  </div>


  <div class="appcheck_title" >
    <div class="appcheck_title_s">
      <h4 class="up_case" > Модуль </h4>
      <h4 class="up_case">Тип - Базовый </h4>
      </div>
      <div style="justify-self: start;">
      <h2 class="up_case"> Безопасность </h2>
      </div>

      <!-- <div class="appcheck_list"> 
      <ul >
        <li font-size: big >dvhbfshbvhfsh</li>
        <li>fsgbnfg</li>
        <li>hk,g</li>
        <li>q4dtr</li>
        <li>swiper-pagination-bullet-active</li>
        <li>dvhbfshbvhfsh</li>
        <li>scergr</li>
        <li>7685n5brtujr</li>
        <li>vytdb</li>
      </ul>
    </div> -->

  </div>




  <hr class="hr_bright">






 <!-- Блок с ценой и выбор действия - Заказ или получить предложение AppPreOrder.vue-->
  <p style="margin-top: 50px;"></p>
  <div class="block_dark">
    < style="min-width: 410px;">
      <div class="appcheck_worth"> 
        <h2 class="up_case"> Стоимость </h2>
        <h4 style="letter-spacing: 3px; padding: 10px;"> Конфигурация № SM-2407{{ ORDER }} </h4>
      </div>
  
    <div class="a1">
    <div class="a2">
      <button class="btn_bright"> 
        <h1 class="up_case"> {{ PRICE }} </h1>
        <h4> белоруских рублей </h4>
      </button>
      </div>
   
      <div class="a2">
        <div style="margin: 10px;"> 
          <button 
          class="btn_bright" 
          :class="{ selectedBtn: isSelected }"
          @mousedown="startPress"
          @mouseup="endPress"
          @mouseleave="endPress"
          @click="order"> 
            <h2 class="up_case"> Заказать </h2> 
          </button>  
        </div>

        <div style="margin: 10px;"> <button class="btn_dark_brightBorder" @click="createPDF"> 
          <h2 class="up_case"> {{ buttonPDF }}  </h2> 
        </button> </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCheckBlock from './AppCheckBlock.vue';
export default {
  name: 'AppCheck',
  components: {
    AppCheckBlock, 
  },
  data() {
  return {
    buttonPDF: 'Скачать PDF',
    buttonPDFact: false,
    isSelected: false,
  }
  },
  props: {   // Отправка запроса на получение  таблицы выбора пользователя выполняется в App.vue
    SELECTED: Array,
    PRICE: Number,
    ORDER: Number,
  },
  updated() {
    // this.checkSelected = this.SELECTED;
  },
  methods: {
    // checkSelected(data) {
    //   console.log('Компонент AppCheck - получение данных о выборе пользователя :  ', data);
    // },

    createPDF () { // Доработать экспорт в PDF
      
    },
    order () {
      console.log('Переходим к вводу персональных данных');
      this.$emit('sendData', { title: "AppCheck" , data: true}); 
    },
    startPress() {
      this.isSelected = true;
    },
    endPress() {
      setTimeout(() => {  // Добавляем задержку в 500 миллисекунд (по желанию)
        this.isSelected = false;
      }, 200);
    },
  },

}
</script>

<style>
  .selectedBtn {
    align-self: center;
    border-color: var(--orange);
    border-radius: 16px;
    border-style: solid;
    border-width: 6px;
}
</style>