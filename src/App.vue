<template >
<!-- <div style="background-color: aqua; width: 100vw;"> <AppHeader /> </div> -->
<div id="app_header" class="header"> <AppHeader v-bind:user="uuid"/> </div>

<!-- <div id="body" style="background-color: burlywood; width: 100vw; min-height: 80vh;"></div> -->
<div id="body" class="body">

    <div id="app"  ref="block" style="display: flex ; flex-direction: row; align-items: top; min-height: 70vh; position: sticky;">
        <div class="component-body">
          <!-- <component :is="titleComponent" v-bind="this[propsTitle]" @sendData="getData" ></component> -->
          <component :is="titleComponent" v-bind="this[propsTitle]" @sendData="getData" ></component>         
        </div>
      
        <!-- <div class="scroll-body">  
              <div v-for="item in pagNum" :key="item" class="scroll-item">
                <div style="margin: 15px 5px 15px 5px;">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle v-if = "(item-1) == scrollView" id="496b537c" cx="6" cy="6" r="5.5" transform="rotate(-90 6 6)" fill="#E0DFE7" stroke="#31344B"></circle>
                      <circle v-else id="0adf4dea" cx="6" cy="6" r="6" transform="rotate(-90 6 6)" fill="#31344B"> </circle>
                    </svg>
                </div>
         </div>
        </div> -->
    </div>


</div>


<div style="background-color: aqua; width: 100vw;"> <AppFooter v-bind:user="uuid"/> </div>
<!-- <div id="footer" class="footer"> <AppFooter /> </div> -->

</template>


<script>
import axios from 'axios';
// Устанавливаем базовый URL для всех запросов
axios.defaults.baseURL = process.env.SERVER_URL;
// axios.defaults.baseURL = 'http://localhost:2025';
// Добавляем заголовки CORS
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // Разрешаем доступ со всех доменов
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'; // Разрешенные методы
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type'; // Разрешенные заголовки

// import HelloWorld from './components/HelloWorld.vue'
// import AppIcons from './components/AppIcons.vue';
import AppHeader from './components/AppHeader.vue';
import AppWelcome from './components/AppWelcome.vue';
import AppProjectOrder from './components/AppProjectOrder.vue';
// import AppProductAssemble from './components/AppProductAssemble.vue';
import AppSelectOptions from './components/AppSelectOptions.vue';
import AppCheck from './components/AppCheck.vue';
import AppFormOrder from './components/AppFormOrder.vue';
import AppThanks from './components/AppThanks.vue';
import AppFooter from './components/AppFooter.vue';

export default {
name: 'App',
components: {
  // AppIcons,
  AppHeader, 
  AppWelcome, 
  AppProjectOrder, 
  // AppProductAssemble, 
  AppSelectOptions, 
  AppCheck, 
  AppFormOrder, 
  AppThanks, 
  AppFooter 
},
data() {
return {
  scrollY: 0,
  scrollView: 0, // Индекс переключаемого компонента

  scrollDalay: 2500, // Задержка на обновление компонента
  propsTitle: 'propsAppSelectOptions', // Свойства компонента
  titleComponent:'AppWelcome', // Текущий выбранный компонент
  listComponents: [ // Список доступных компонентов
    'AppWelcome',
    'AppProjectOrder', 
    // 'AppProductAssemble', 
    'AppSelectOptions', 
    'AppCheck', 
    'AppFormOrder',
    'AppThanks',
    // 'AppFooter'
    ],
    pagNum: 0,

// Флаги отрисовки копонентов
  flagAppCheck: false, // Флаг разрешения отображения Компонента AppCheck
  flagAppFormOrder: localStorage.getItem('appFormOrder') || false, // Флаг разрешения отображения Компонента AppFormOrder
  flagAppFormOrder_project: false, // Флаг разделяющий информацию в Компоненте AppFormOrder True - если делает запрос на персональный проект, False - если выбирает из текущих вариантов 
  flagScrollView: true, // Флаг разрешения на смену компонента
  flagScrollDown: localStorage.getItem('scrollDown') || true, // Флаг разрешения скрола вниз (отображения кнопки вниз)
  
  //clientURL: 'http://129.47.1.60:2025',
  clientURL: process.env.SERVER_URL || 'http://129.47.1.60:2025',
  // clientURL: 'http://localhost:2025',
  // clientURL: process.env.SERVER_URL,
  uuid: localStorage.getItem('uuid') || null,
  moduls: [],
  types: [],
  functions: [],
  config: {}, //определяет состав функций для каждой конфигурации Modul - Type
  // id_modul id_type mainf  addf
// Работа с Компонентом AppFormOrder
  dict_descr_mod: [], // Массив пользовательской информации из DB
  keyAppFO: null,

  selectedModul: 1,
  selectedType: 1,
  selectedModuls: [],
  selectedAddOpts: [],
  tableList: [
  'gr_functions',
  'gr_functionstypes',
  'functions',
  'dict_descr_mod',
  // 'configures',
  // 'gr_functionclass',
  ],
  customerSelect: [],
  customerPrice: localStorage.getItem('price') || 0,
  customerOrder: localStorage.getItem('order') || 0,
};
},
computed: {

propsAppWelcome() { 
  return {
  }
},
propsAppProjectOrder() {
  return {
    }
  },
propsAppProductAssemble() {
  return {
    }
  },
propsAppSelectOptions() {
  return {
    MODULS: this.moduls, 
    TYPES: this.types, 
    FUNC: this.functions, 
    CONFIG: this.config,
    user: this.uuid,
    }
  },
  propsAppCheck() {
  return {
    // @showFormOrder = "processAppCheck"
    SELECTED: this.customerSelect,
    PRICE: this.customerPrice,
    ORDER: this.customerOrder,
    }
  },
  propsAppFormOrder() {
  return {
    // @getPersonalData = "processFormOrder"
    DESCRMOD: this.dict_descr_mod,
    KEY_FORMORDER: this.keyAppFO,
    UUID: this.uuid,
  }
},
propsAppThanks() {
  return {
    ORDER: this.customerOrder,
    }
  },
},
props: {
user: null
},
created() {
this.fetchUUID();
this.fetchTables();
this.fetchConfig();
this.customerOrder = localStorage.getItem('order');


window.addEventListener('scroll', this.handleScroll);
console.log('Инициализируем addEventListener', this.handleScroll, scroll); // Для отслеживания scroll
this.pagNum = this.listComponents.length;
console.log('paginationNumber: ', this.pagNum);
this.scrollView = 0;
this.flagScrollView = true;
localStorage.setItem('flagScrollDown', true);
},
unmounted() {
 window.removeEventListener('scroll', this.handleScroll);
},

methods: {
  async fetchUUID() { // Отправка запроса на создание uuid, проверка его существование в текущей сесии
  try {
    // this.uuid = localStorage.getItem('uuid');
    if (this.uuid !== null) {
      console.log('UUID существует:', this.uuid);
    } else {
      console.log('UUID не существует - Отправляем запрос на сервер');
      const response = await axios.get(this.clientURL + '/req', {
      headers: {
        'title': 'Uuid', 
      }
    });
    console.log('Получаем ответ с  сервера', response);

    this.uuid = response.data.uuid; // сохраняем uuid в локальной переменной
    localStorage.setItem('uuid', response.data.uuid);
    console.log('UUID создан:',this.uuid);
    this.customerOrder = response.data.order;
    localStorage.setItem('order', response.data.order);
    console.log('Номер заказа:',this.customerOrder);
    }
  } catch (error) {
    console.error('Ошибка при получении uuid:', error);
  }
},
async fetchTables() {
  for (const table of this.tableList) {
    try {
      const response = await axios.get(this.clientURL + `/init/${table}`);
      switch (table) {
        case 'gr_functions':
          this.moduls = JSON.parse(response.data); // преобразуем из json
          console.log(table, 'получена успешно ', this.moduls);
         
          break;
        case 'gr_functionstypes':
          this.types = JSON.parse(response.data); // преобразуем из json
          console.log(table, 'получена успешно ', this.types);
          break;
        case 'functions':
          this.functions = JSON.parse(response.data); // преобразуем из json
          console.log(table, 'получена успешно ', this.functions);
          break;
          case 'configures':
          this.config = JSON.parse(response.data); // преобразуем из json
          console.log(table, 'получена успешно');
          break;
          case 'dict_descr_mod':
          this.dict_descr_mod = JSON.parse(response.data); // преобразуем из json
          console.log(table, 'получена успешно', this.dict_descr_mod);
          break;
        default:
          this.class = JSON.parse(response.data); // преобразуем из json
          console.log(table, 'получена успешно');
      }
    } catch (error) {
      console.error(`Ошибка при получении данных из ${table}: `, error);
    }
  }
},
async fetchConfig () {
    // Первая часть - Получам объект со всеми возможными конфигурациями из DB 
    const response = await axios.get(this.clientURL + `/config`);
        const CONFIG = JSON.parse(response.data);
        this.config = CONFIG; // преобразуем из json
        console.log('Config получена успешно ', CONFIG);
  },
  getScrollView(scrollView) {
    // console.log('Получен запрос на обновления компонента scrollView - ', scrollView);
    if (this.flagScrollView === true) {
      this.flagScrollView = false;
  // console.log('Флаг разрешения на обновление компонента переводим в значение - ', this.flagScrollView );
  this.scrollView = this.checkScroll(scrollView);
  this.titleComponent = this.listComponents[this.scrollView];
  // console.log('Имя нового компонента - ', this.titleComponent);
  this.getTitleComponent();
  window.scrollTo(0, 10);
  this.timeOut(this.scrollDalay);
    } else {
      // console.log('getScrollView - Обновление компонента запрещено');
    }

},
timeOut(time) {
  setTimeout(() => {
    this.flagScrollView = true;
    // return window.scrollDalay;
    // console.log('Возвращаем флаг разрешения на обновление компонента в значение - ', this.flagScrollView );
  }, time);
},

checkScroll(scrollView) {
  if (scrollView >= this.pagNum || scrollView < 0) {
    const tempScrollView = 0;
    return tempScrollView;
  } if ((this.scrollView - scrollView) === 1 && this.flagAppFormOrder_project === true) {
    const tempScrollView = 0;
    this.flagAppFormOrder_project = false;
    // console.log('scrollView - ', this.scrollView, 'flagAppFormOrder_project - ', this.flagAppFormOrder_project);
    return tempScrollView;
  } else { 
    return scrollView;
  // console.log('Выполнена проверка на превышение значения для ScrollView - ', tempScrollView);
  }
},


getTitleComponent(){ // Переключаем компоненты по событию
  console.log('Обновляем Компонент свойства компонента- ', this.titleComponent);

    try {
    if (this.titleComponent === 'AppWelcome') {
        this.propsTitle = 'propsAppWelcome';
        this.flagScrollDown = true;
        localStorage.setItem('flagScrollDown', true);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
        return;
      } else if (this.titleComponent === 'AppProjectOrder') {
        this.propsTitle = 'propsAppProjectOrder';
        this.flagScrollDown = true;
        localStorage.setItem('flagScrollDown', true);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
        return;
      } else if (this.titleComponent === 'AppProductAssemble') {
        this.propsTitle = 'propsAppProductAssemble';
        this.flagScrollDown = true;
        localStorage.setItem('flagScrollDown', true);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
        return;
      } else if (this.titleComponent === 'AppSelectOptions') {
        this.propsTitle = 'propsAppSelectOptions';
        this.flagScrollDown = false;
        localStorage.setItem('flagScrollDown', false);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
        return;
      } else if (this.titleComponent === 'AppCheck') {
        this.propsTitle = 'propsAppCheck';
        this.flagScrollDown = false;
        localStorage.setItem('flagScrollDown', false);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
        return;
      } else if (this.titleComponent === 'AppFormOrder') {
        this.propsTitle = 'propsAppFormOrder';
        this.flagScrollDown = false;
        localStorage.setItem('flagScrollDown', false);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
        return;
      } else if (this.titleComponent === 'AppThanks') {
        this.propsTitle = 'propsAppThanks';
        this.flagScrollDown = true;
        localStorage.setItem('flagScrollDown', true);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
        return;
      } else {
        this.titleComponent === 'AppError';
        this.propsTitle = 'propsAppError';
        this.flagScrollDown = true;
        localStorage.setItem('flagScrollDown', true);
        console.log('Функция getTitleComponent - flagScrollDown = ', this.flagScrollDown);
      }
    } catch (error) {
    console.error('getTitleComponent - Ошибка при переключении компонента: ', error);
    }
},

handleScroll() {
  // console.log('', window);
  // console.log('', window.clientInformation.geolocation);
  // console.log('', window.scrollbars);
  // console.log('', window.top);
  // console.log('', window.scrollbars);

  // console.log('handleScroll RUN');
  // console.log('flagScrollView - ', this.flagScrollView, 'flagScrollDown - ', this.flagScrollDown);
    if (this.flagScrollView) {
        if (this.flagScrollDown) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;
        // console.log('windowHeight: ', windowHeight, 'documentHeight', documentHeight, 'scrollPosition', scrollPosition);
            if (scrollPosition + windowHeight >= documentHeight) {
              this.getScrollView(this.scrollView + 1);
              return;
            }  else {
              // console.log('handleScroll - Условие  scrollPosition + windowHeight >= documentHeight  не выполнено');
            }
            if (scrollPosition === 0) {
              this.getScrollView(this.scrollView - 1);
              return;
            }
        } 

    } else {
      // console.log('handleScroll - Запрещено обновление компонента');
    }


  },
    getHandleWheel(event) {
    // console.log('Функция обработки движения колесика Мыши ЗАПУЩЕНА !!!', event.clientY, event.clientX);
    console.log('Функция обработки движения колесика Мыши ЗАПУЩЕНА !!!', 'event_vts', event._vts, 'clientY - ', event.clientY, 'delta Y - ', event.deltaY );
  },








async postCustomerData(arr) {
  try {
      console.log('Отправляем запрос на сервер с данными пользователя');
      const response = await axios.post(this.clientURL + '/customer', arr);
      this.customerPrice = response.data;
      localStorage.setItem('price', response.data);
      console.log('Ответ сервера - ', this.customerPrice);
  } catch (error) {
      console.error('Ошибка при отправке заказа пользователя: ', error);
  }
},
  async postPersonalData (arr) {
    try {
      console.log('Начинаем отправку персональных данных', arr);
      const response = await axios.post(this.clientURL + '/personal', arr);
      return response;
    } catch (error) {
      console.error('Ошибка при отправке персональных данных пользователя: ', error);
    }
  },




  getData(mesage) {
      // console.log('получено от текущего компонента ', this.titleComponent, ': ', mesage);

      if (mesage.title === 'AppProjectOrder') {
        console.log('Мы в обработке данных от AppProjectOrder');
        this.titleComponent = 'AppFormOrder';
        const scrollView_id = this.listComponents.findIndex(item => item === 'AppFormOrder');
        // console.log('scrollView_id: ', scrollView_id);
        this.flagAppFormOrder_project = true; // Изменяем информацию в форме ввода персональных данных

        this.getScrollView(scrollView_id);
        return;
      } 
      if (mesage.title === 'AppSelectOptions') {
        console.log('Мы в обработке данных от AppSelectOptions');
      const data = mesage.data;
      // Перебираем все объекты массива 
          data.forEach((element, idx) => {
            let func;
            let flag = false;
            // let funcMainDescr;
            const configEntry = this.config.find(entry => entry.id_modul === element.id && entry.id_type === element.type);
            console.log('Массив для функций для каждого объекта конфигурации :  ', configEntry);

              // Дополнительные функции
            // const funcAddDescr = (this.functions.filter(f => f && element.opts.includes(f.id)).map(item => {return {id: item.id, title: item.title}}));
            // console.log('Дополнительные функции Add functions:  ', funcAddDescr);

            if (configEntry && configEntry.mainf) { // проверяем есть ли массив mainf в найденном объекте
              // Основные функции
            // funcMainDescr = this.functions.filter(f => f && configEntry.mainf.includes(f.id)).map(item => {return {id: item.id, title: item.title}});
            // console.log('Основные функции Main functions:  ', funcMainDescr);

            // Объединяем массивы функций в единый массив
              func = (this.functions.filter(f => f && configEntry.mainf.includes(f.id)).map(item => {return {id: item.id, title: item.title, descr: item.descr }})).concat(this.functions.filter(f => f && element.opts.includes(f.id)).map(item => {return {id: item.id, title: item.title, descr: item.descr}}));
              console.log('все функции func : ', func);
            } else {    
            console.error(' массив Mainf не найден'); // Обработка случая, когда соответствующий массив не найден
          }

          // console.log('this.moduls:  ', this.moduls);
          const modulDescr = Object.values(this.moduls.filter(m => m.id === element.id).map(item => {return {id: item.id, title: item.title, descr: item.descr}}));
          // console.log('Текущий модуль:  ', modulDescr);

          const typeDescr = this.types.filter(m => m.id === element.type).map(item => {return {id: item.id, title: item.title, descr: item.descr}});
          // console.log('Текущий тип:  ', typeDescr);
          if (element.opts.length !== 0) {
            flag = true;
            console.log(element.opts, 'Устаналиваем флаг flag=',flag);
          } else {
            flag = false;
          }
        this.customerSelect.splice(idx, 0, { 
              id: element.id,
              order: localStorage.getItem('order'),
              uuid: this.uuid,
              modul: modulDescr,
              type: typeDescr,
              // opts: funcAddDescr,
              // mains: this.funcMainDescr,
              func: func,
              keyAddOpts: flag, // Флаг указывает на наличие дополнительных опций
            });
            this.flagAppCheck = true;
            this.postCustomerData(this.customerSelect);
            console.log('updateArray -- Добавили новую запись: ', this.customerSelect);
          });
          this.flagScrollDown = true;
          localStorage.setItem('flagScrollDown', true);
          this.flagScrollView = true;
          this.getScrollView(this.scrollView+1);
          return;
        }
        if (mesage.title === 'AppCheck') {
          const data = mesage.data;
          console.log('Мы в обработке данных от AppSelectOptions ',data);
          this.flagScrollDown = true;
          localStorage.setItem('flagScrollDown', true);
          this.flagScrollView = true;
          this.getScrollView(this.scrollView+1);
          return;
        }
        if (mesage.title === 'AppFormOrder') {
          const data = mesage.data;
          console.log('Мы в обработке данных от AppSelectOptions',data);
          this.processFormOrder(data);
          this.flagScrollDown = true;
          localStorage.setItem('flagScrollDown', true);
          this.flagScrollView = true;
          this.getScrollView(this.scrollView+1);
          return;
        }
  },

  processAppCheck() {
    this.flagAppFormOrder = !this.flagAppFormOrder;
  },

  processFormOrder(data) {
    const res = this.postPersonalData (data);
    console.log('Результат отправки данных пользователя (App.vue)', res);
    }
    
}
}
</script>

<style>

</style>
