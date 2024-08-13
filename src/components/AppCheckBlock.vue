<template>
  <div class="appcheck" >
  <!-- Заголовок блока -->
  <div class="appcheck_title"> 
      <div style="display: flex; justify-content: space-between;">
      <h4 class="up_case" > Модуль </h4>
      <h4 class="up_case">Тип -  {{ type[0].descr }} </h4>
      </div>
      <div style="justify-self: start;">
      <h2 class="up_case">{{ modul[0].descr }} </h2>
      </div>
      <hr class="hr_bright">
    </div>

  <div>
  <div class="appcheck_list">
    <div style="columns: 3 320px; ">
      <ul v-for="(item) in funcs" :key="item.id" >
        <li>  {{ item.title }} </li>
      </ul>
  </div>
  </div>
<!-- Иконка редактирования -->
  <!-- <div class="block_check_icon">
    <button> <img src="img/edit.png" alt="Edit"> </button>
  </div> -->
</div>
  <hr class="hr_bright">
</div>
</template>

<script>

export default {
    props: {
        modul: Array,
        type: Array,
        funcs: Array
    },
}
</script>

<style>

</style>