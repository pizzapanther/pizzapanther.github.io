import Vue from 'vue';

var PROJECTS = [
  {
    title: "Neutron Academy",
    subtitle: "Learn Out Loud! Study with voice enabled quizzes.",
    url: "https://www.neutron.academy/",
    desc: "Neutron Academy is quiz based learning system that\
    works with voice interactions on Google Assistant and the web. \
    You can create quizzes, assign them to your class, and track \
    your students' progress."
  },
  {
    title: "Codacation",
    subtitle: "Git workflow for your coding education",
    url: "https://www.codacation.com/",
    desc: "Codacation is a tool to assign and track work via Github \
    and Github Issues. Our goal is to teach coding using tools with \
    used in the technology industry."
  }
];

var OurProjects = Vue.component('our-projects', {
  template: '#tpl-projects',
  data() {
    return {
      projects: PROJECTS
    };
  }
});

export default OurProjects;
