import Vue from 'vue';

var AddNote = Vue.component('add-note', {
  template: '#tpl-journal-note-add',
  data() {
    return {
      title: '',
      note: '',
      links: [{title: '', url: ''}]
    };
  },
  methods: {
    add_link: function () {
      console.log('narf;');
      this.links.push({title: '', url: ''});
    }
  }
});

export default AddNote;
