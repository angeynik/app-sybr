<template>
  <div> <!-- Выбор модуля-->

  <div class="text_title"> <h4 style="padding-left: 6px;"> МОДУЛЬ</h4> </div>
  <!-- <div class="block_title_right"> <h1> Безопасность </h1> </div> -->
    <div id="appmoduls"  @change="sortFunction(CONFIG, FUNC)" class="text_title" >
    <select v-model="selectedModul"  @change="addSelectedmodul">
      <option disabled value=""> Модуль:</option>
      <option v-for="modul in MODULS" :key="modul.id" :value="modul.id">
     {{ modul.descr}}
      </option>
    </select>
  </div>
  <hr />
  </div>
  <div class="allBlocks"> <!-- Блок с основными функциями  -->
  
  <div class="block_baseSet">
  <div class="text_title" >
  <!-- <h2> Базовый набор</h2> -->
  <div id="apptype" @change="sortFunction(CONFIG, FUNC)">
    <select v-model="selectedType" @change="addSelectedType" style="width: 100%;">
      <option disabled value=""> Тип набора:</option>
      <option class="option" v-for="(type, id) in TYPES" :key="id" :value="type.id">
        <h2>  {{ type.descr }} </h2>
      </option>
    </select>
  </div>

  </div>
  
  <div id="appmainopt" class="item_dark">
  <div class="item_list">
  <li class="li_btn_main" v-for="mainopt in mainopts" :key="mainopt.id" :value="mainopt.id">
    <button class="block_btnBase"> {{ mainopt.title }} </button> 

  </li>
  
</div>
  </div>
  </div>
  <!-- Блок с дополнительными функциями -->
  <div class="block_addSet">
  <div class="text_title">
  <h2> Дополнительные опции</h2>
  </div>
  <div id="appaddopt" >
  <div class="item_list">
  <ul>
    <li class="li_btn" v-for="addopt in addopts" :key="addopt.id" :value="addopt.id">
      <button @click="toggleAddOpt(addopt.id)"
      class="block_btnAdd" 
      :class="{'selected': selectedList.includes(addopt.id)}"> 
      {{ addopt.title }} 
    </button> 
    <!-- <AppSelOptsTooltip
    :descr = addopt.descr
    />  -->
    </li>
  
  </ul>
  </div>
  </div>
  </div>
  <!-- Блок с текстом  -->
  <div class="block_textSet">
    <p>{{ selectedModuleDescription }}</p>
  <!-- <p> Снизить уровень напряженности от беспокойства за сохранность жилья. Умный дом позволит контролировать все жизненно важные системы: электро и водоснабщение и состав воздуха. Если по каким то причинам остался выключенным электроприбор и произошло его возгарание датчик задымленности своевременно отреагирует и выключит электричество. В случае протечки клапана перекроют воду и предотвратят последствия, а в случае неисправности систем соседей оперативно проинформируют и тем самым минимизируют ущерб. При проникновении злоумышленнеков Вы сможете оперативно вызвать правоохранительные органы и зафиксировать нарушение и нарушителей.</p> -->
  
</div>



  </div>




<hr />
<div> <!-- Список выбранных модулей -->
  <!-- <div class="block_title_left"> <h3> Выбранные модули: </h3> </div>  -->
  <div class="text_title"> <h2 style="margin: 15px 0 50px 0;"> Выбранные модули:  </h2> </div>

  <ul class="text_title">
    <div class="item_list">
      <li v-for="(modul, index) in selectedModuls" :key="index" style="list-style-type: none">
        <div style="display: flex; justify-content: center; margin: 6px;">
          <button class="btnModulSelected"> 
            <!-- <h3 class="up_case"> {{ module.descr }} / {{ module.selectedType }} </h3>  -->
            <h4 class="up_case"> {{ modul.descr }} </h4> 
          </button>
          <button @click="removeModule(index)" class="btnDelModulSelected">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="04e66bf6">
                <line id="6ab58573" y1="-3" x2="39.8972" y2="-3" transform="matrix(-0.70528 0.708929 -0.70528 -0.708929 29.3755 1)" stroke="#F97B00" stroke-width="6"></line>
                <line id="5ab6d0c3" y1="-3" x2="39.8972" y2="-3" transform="matrix(0.70528 0.708929 -0.70528 0.708929 0.533203 4.53552)" stroke="#F97B00" stroke-width="6"></line>
              </g>
            </svg>
          </button>
        </div>
      </li>
    </div>
  </ul>
    
</div>
<hr />



  <div class="block_btn">   <!-- Блок с кнопками  -->
  <button class="btn_orange" @click="finishSelect" style="min-width: 310px;"> 
    <h2 v-if="flagSelected" style="line-height: 1.5;">рассчитать СТОИМОСТЬ</h2>
    <h2 class="up_case" v-else>Пересчитать</h2>
  </button>
  </div>
  <!-- <div> {{ FUNC }}</div>
  <div> {{ CONFIG }}</div> -->
</template>

  <script>
  import axios from 'axios';
  // import AppSelOptsTooltip from './AppSelOptsTooltip.vue'

  export default {
    components: {
      // AppSelOptsTooltip,
    },
  data () {
    return {
      testArray: [
      {
        opt: [1, 4, 12, 18],
        modul: 'Безопасность',
        type: 'Базовый'
      },     
      {
        opt: [2, 6, 15, 29],
        modul: 'Климат',
        type: 'Расширенный'
      },
      {
        opt: [5, 8, 13, 25],
        modul: 'Свет',
        type: 'Максимальный'
      },
    ],
      flagSelected: localStorage.getItem('flagSelected') || false,
      clientURL: 'http://localhost:2025',
      // clientHeader : '1',
      moduls: [],
      selectedModul: 1,
      selectedModuls: [ ],
      selectedType: 1,
      mainopts: this.initMainopts,
      selectedMainOpt: '',
      addopts: this.initAddopts,
      // массивы работы с пользовательским выбором
      selectedList: [],
      titleSelectedListAdd: [],
      titleSelectedListMain: [],
      allAddOpts: [], // Промежуточный список выбранных дополнительных функций, модулей и типов - Приложение подгружает с него выбранную пользователем конфигурацию
      selectedAddOpts: [], // Финальный список выбранных дополнительных функций, модулей и типов - Содержит только одну пару Modul - Type с дополнительными функциями
    
    }
  },
  props: {   // Отправка запроса на получение uuid и таблиц выполняется в App.vue
    user: String,
    MODULS: Array,
    TYPES: Array,
    FUNC: Array,
    CONFIG: Object,
  },
  // ['user', 'MODULS', 'TYPES', 'FUNC', 'CONFIG',],

  beforeCreate() {
    // setTimeout(() => { debugger }, 2500);
    // this.$emit('updateData', {selectedModul: this.selectedModul, selectedType: this.selectedType }); // Передаем в основной компонент выбранные модуль и тип 

  },
  created() {
    this.initData (1);// Запрос на сервер для определения первоначального набора ОСНОВНЫХ функций
    this.initData (2); // Запрос на сервер для определения первоначального набора ДОПОЛНИТЕЛЬНЫХ функций
    // console.log ('mainops в момент создания: ', this.mainopts);
    // console.log ('addops в момент создания: ', this.addopts);
    // console.log ('MODULS: ', this.MODULS);
  },
  
  
 watch: {
  // selectedModul() { 
  // this.$emit('updateData', {selectedAddOpts: this.selectedAddOpts,}); // Передаем в основной компонент выбранные модуль и тип 
  // console.log(' ------- updateData -Modul-------');
  // },
  
    // selectedModul(newVal) {
  //   localStorage.setItem('selectedModul', newVal);
  // },
  // selectedType(newType) {
  //   localStorage.setItem('selectedType', newType);
  // }
},

// mounted: {

// },

computed: {
    selectedModuleDescription() {
      const selectedModule = this.MODULS.find((module) => module.id === this.selectedModul);
      return selectedModule ? selectedModule.text : '';
    },
  //   selectedModulObject() {
  //   return this.MODULS.find(modul => modul.id === this.selectedModul);
  // }
  },
  // emits: ['updateData'], // Событие emit вызываем при каждом обновлении массива выбора пользоватя - selectedAddOpts
 
  methods: {

  async initData (key) {
      console.log('AppSelectOptions: ', key);
      const response = await axios.get(this.clientURL + '/option', {
        headers: {
          'title': key, 
        }
      });
        console.log ('ответ сервера: ', response);
        if (key === 1) {
        this.mainopts = Object.values(response.data); // преобразуем масив из объекта
        console.log ('преобразуем масив из объекта  - this.mainopts: ', this.mainopts);
      } else if (key === 2) {
        this.addopts = Object.values(response.data); // преобразуем масив из объекта
        console.log ('преобразуем масив из объекта - this.addopts: ', this.addopts);
      } else {
        console.log('Параметр для initData не определен');
      }

      // Проверка на наличие Модуля с текущим (выбранным пользователем) индексом

      if (this.checkIndex(this.selectedModuls, this.selectedModul, 'id') !== -1) {
        this.selectedType = 1;
      } else {
        const module = this.MODULS.find(m => m.id === this.selectedModul);
       console.log ('Инициализация initData - module: ', module);
      this.updateArray (this.selectedModuls, module, this.selectedType, []);
      this.updateArray (this.allAddOpts, module, this.selectedType, []);
        console.log('Инициализация initData - selectedModuls: ', this.selectedModuls);
      }
  },


    sortFunction (objConfig, arrFunc) { // Метод формирует массив id функций соответствующих выбранному Модулю и Типу
      let mainfSelected = [];
      let addfSelected = [];
      let id_modul = this.selectedModul;
      let id_type = this.selectedType;
      const configEntry = objConfig.find(entry => entry.id_modul === id_modul && entry.id_type === id_type);
    console.log('результат поиска по объету CONFIG ', configEntry);

    if (configEntry && configEntry.mainf) { // проверяем есть ли массив mainf в найденном объекте
      mainfSelected = Object.values(configEntry.mainf); // Object.values преобразует прокси объект в массив
      console.log('массив Mainf сформирован', mainfSelected);
    } else {
      // Обработка случая, когда соответствующий массив не найден
      console.error(' массив Mainf не найден');
    }
    if (configEntry && configEntry.addf) { // проверяем есть ли массив addf в найденном объекте
      addfSelected = Object.values(configEntry.addf);
      console.log('массив Addf сформирован', addfSelected);
    } else {
      // Обработка случая, когда соответствующий массив не найден
      console.error('массив Addf не найден');
    }

    this.mainopts = arrFunc.filter(f => f && mainfSelected.includes(f.id));
    console.log('mainopts: ', this.mainopts);

    this.addopts = arrFunc.filter(f => f && addfSelected.includes(f.id));
    console.log('addopts: ', this.addopts);
},


    
    toggleAddOpt(id) { // Добавляет и удаляет в массив id выбранной функции
      const type = this.selectedType;

      // const modul = this.selectedModul;
      // const checkIdSelectedModulsM = this.checkIndex(this.selectedModuls, this.selectedModul, 'id');
      const checkIdselectedModulsM = this.checkIndex(this.selectedModuls, this.selectedModul, 'id');
      const checkIdAllAddOptsT = this.checkIndex(this.allAddOpts.filter(item => item.id === this.selectedModul), type, 'type');
      const index = this.selectedList.indexOf(id);
      console.log('toggleAddOpt - Выбрана функция: ', index, id);
      if (index >= 0) {
        this.selectedList.splice(index, 1);

       this.titleSelectedListAdd = (Object.values(this.FUNC.filter(f => f && this.selectedList.includes(f.id)))).map(item => {return {id: item.id, title: item.title}});
        
        console.log('toggleAddOpt - Дополнительные функции Удалены id : title - ', this.titleSelectedListAdd);

        this.allAddOpts[checkIdAllAddOptsT].opts = Object.values(this.selectedList);
        this.selectedModuls[checkIdselectedModulsM].opts = Object.values(this.selectedList);
        // console.log('Удалили функцию из списка опций', this.allAddOpts);

        // this.$emit('updateData', this.selectedModuls); 
        return;
      } else {
        this.selectedList.push(id);


// Фильтруем по списку функций и выбираем id и title
        // this.titleSelectedListAdd = (Object.values(this.FUNC.filter(f => f && this.selectedList.includes(f.id)))).map(item => {return {id: item.id, title: item.title}}); // Фильтруем массив Функций FUNC по значению списка выбранных selectedList
        // console.log('Дополнительные функции Добалены id : title - ', this.titleSelectedListAdd);

        this.allAddOpts[checkIdAllAddOptsT].opts = this.selectedList;
        this.selectedModuls[checkIdselectedModulsM].opts = this.selectedList;
        // console.log('Добавили функцию в список опций', this.allAddOpts);

        return;
      }

      // console.log('Массив выбранных функций: ', this.selectedList);
    },


    finishSelect () {
      this.$emit('sendData', { title: "AppSelectOptions" , data: this.selectedModuls}); // Передаем в основной компонент массив выбранных пользователем модулей (this.selectedModuls) и наименование модуля; 
      this.flagSelect = !this.flagSelect;
      localStorage.setItem('flagSelected', this.flagSelected);
    },
    // Работа с пользовательским
    addSelectedType() { // Добавляем выбранный пользователем Тип
        const type = this.selectedType;
        const module = this.MODULS.find(m => m.id === this.selectedModul);
        const checkIdSelectedModulsM = this.checkIndex(this.selectedModuls, this.selectedModul, 'id');
        // const checkIdAllAddOptsM = this.checkIndex(this.allAddOpts, this.selectedModul, 'id');
        const checkIdAllAddOptsT = this.checkIndex(this.allAddOpts.filter(item => item.id === this.selectedModul), type, 'type');
        // console.log('---- !!!!! ------ Результат checkIdAllAddOptsT --- ', checkIdAllAddOptsT);

        // console.log('------ addType ----- Запись для модуля с текущим индексом : ',this.selectedModuls[checkIdSelectedModulsM]);
        // console.log('------ addType ----- checkIdSelectedModulsT ',checkIdSelectedModulsT, this.selectedModuls[checkIdSelectedModulsM] );

        if (checkIdAllAddOptsT !== -1 ) {

          // console.log('------ addType ----- выбранный тип есть в AllAddOpts');
          // console.log('------ addType ----- Берем значение Типа из AllAddOpts : ',this.allAddOpts[checkIdAllAddOptsM].type); 
          this.selectedModuls[checkIdSelectedModulsM].type = type; // Обновляем значение Type для существующей записи
          this.selectedList = this.allAddOpts[checkIdAllAddOptsT].opts;
          // console.log('Загрузили значения выбора доп опций', this.selectedList);
          this.selectedModuls[checkIdSelectedModulsM].opts = this.allAddOpts[checkIdAllAddOptsT].opts;
          // console.log('------ addType -- selectedModuls -- selectedType ',this.selectedModuls[checkIdSelectedModulsM].type, this.selectedList ); 
          // this.$emit('updateData', this.selectedModuls); 
          return;
        } else {
          // console.log('------ addType ----- выбранного типа нет в AllAddOpts');
            this.selectedList = [];
            this.selectedModuls[checkIdSelectedModulsM].type = type; 
            this.updateArray (this.allAddOpts, module, type, []);
          // console.log ('------ addType ----- AllAddOpts Добавляем запись ', this.allAddOpts);
          // console.log ('------ addType ----- selectedModuls Обновили Тип ', this.selectedModuls);
          // this.$emit('updateData', this.selectedModuls); 
          return;
        }


    },
    addSelectedmodul() { // Добавляем выбранный пользователем Модуль
      const selectedM = this.selectedModul;
      const checkIdSelectedModulsM = this.checkIndex(this.selectedModuls, this.selectedModul, 'id');
      const checkIdAllAddOptsM = this.checkIndex(this.allAddOpts, this.selectedModul, 'id');

      const module = this.MODULS.find(m => m.id === selectedM); // Выбирает запись (весь объект) в массиве модулей MODULS которая соответствует id модуля выбранного пользователем
      // console.log('addSelectedmodul -- Выбран модуль', selectedM, 'Объект (запись) для выбранного модуля: ', module);

      if (checkIdSelectedModulsM !== -1) { // Проверяем наличие Модуля в selectedModuls условие выполняется когда модуля нет в массиве
        // console.log ('Модуль есть в массиве checkIdAllAddOptsM: ', this.selectedModul,  this.allAddOpts );
        this.selectedType = this.selectedModuls[checkIdSelectedModulsM].type;
        this.selectedList = this.selectedModuls[checkIdSelectedModulsM].opts;
        // console.log ('selectedList: ', this.selectedList );
        return;
      } else { // Добавляем запись в selectedModuls с новым модулем
          // this.updateArray (this.selectedModuls, module, this.selectedType, []);
          if (checkIdAllAddOptsM !== -1) {
            this.selectedType = this.allAddOpts[checkIdAllAddOptsM].type;
            this.selectedList = this.allAddOpts[checkIdAllAddOptsM].opts;
            this.selectedModuls[checkIdSelectedModulsM].type = this.allAddOpts[checkIdAllAddOptsM].type;
            this.selectedModuls[checkIdSelectedModulsM].opts = this.allAddOpts[checkIdAllAddOptsM].opts;
            // this.$emit('updateData', this.selectedModuls); 
            return;
          } else {
            this.selectedType = 1;
            this.selectedList = [];
            this.updateArray (this.selectedModuls, module, this.selectedType, Object.values(this.selectedList));
            this.updateArray (this.allAddOpts, module, this.selectedType, Object.values(this.selectedList));
            // console.log ('Добавляем Модуль в массив allAddOpts : ', this.allAddOpts);
            // console.log ('Добавляем Модуль в массив selectedModuls : ', this.selectedModuls);
            // this.$emit('updateData', this.selectedModuls);    
            return; 
              }
          }
    },

    checkIndex (arr, index, name) {
      console.log('Работа с CheckIndex: ', name);
      console.log('Проверка наличия индекса - ', index, ' в массиве - ', arr);
      const res = arr.findIndex(m => m[name] === index); 
      console.log('--- Результат CheckIndex: ', res);
      return res;
    },
    updateArray (arr, modul, type, opts) {
      // console.log ('--- updateArray ---');
      const module = modul;
        arr.push({ 
          ...module,
          type: type,
          opts: opts });
        // console.log('updateArray -- Добавили новую запись: ', arr);
    },


    removeModule(index) { // Удаляем запись выбранных пользователем Модуля и Типа
      this.selectedModuls.splice(index, 1);
      // this.$emit('updateData', this.selectedModuls); // Передаем в основной компонент массив выбранных пользователем модулей
    },
  },
} 

  </script>
  
  <style>
  .selected {
    font-size: 24px;
    font-weight: 200;
    color: var(--dark_font);
    background-color: var(--light_font);
    width: 94%;
    padding: 16px 5px 16px 5px;
    border-color: var(--dark_font);
    border-radius: 16px;
    border-style: solid;
    border-width: 3px;
    margin: 13px;
}
.option {
  background-color: var(--light_font);
  width: 100vw;
}
  </style>