app.component('market-buttons', {
  props: {
    buttons:  { type:Array,  required:true },
    selected: { type:Number, required:true }
  },
  emits: ['select'],
  methods:{ clickBtn(b){ this.$emit('select', b); } },
  template: /*html*/`
    <div class="market-sidebar">
      <div v-for="b in buttons" :key="b.id"
           class="category-btn" :class="{ active: selected===b.id }"
           @click="clickBtn(b)">
        <span>{{ b.name }}</span>
        <img :src="'./assets/img/'+b.img+'.png'" :alt="b.name">
      </div>
    </div>
  `
});
