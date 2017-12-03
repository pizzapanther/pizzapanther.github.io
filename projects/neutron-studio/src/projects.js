import Vue from 'vue';

var PROJECTS = [
  {
    title: "Neutron Academy",
    subtitle: "Learn Out Loud. Study with voice enabled quizzes.",
    icon: "school",
    url: "https://www.neutron.academy/",
    desc: "Neutron Academy is quiz based learning system that\
    works with voice interactions on Google Assistant and the web. \
    You can create quizzes, assign them to your class, and track \
    your students' progress."
  },
  {
    title: "Codacation",
    subtitle: "Git workflow for your coding education",
    icon: "code",
    url: "https://www.codacation.com/",
    github: "https://github.com/pizzapanther/codacation",
    desc: "Codacation is an open source tool to assign and track \
    work via Github and Github Issues. Our goal is to teach coding \
    using tools with used in the technology industry."
  },
  {
    title: "Bible Fish",
    subtitle: "The quickest and simplest way to read the Bible on any device.",
    icon: "book",
    url: "https://www.bible.fish/",
    desc: "A free Progressive Web App Bible. Bible.Fish is a Bible app that \
    allows quick access to scriptures with just your web browser. You can also \
    use Bible.Fish offline without any internet on Chrome, Firefox, and Opera."
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
