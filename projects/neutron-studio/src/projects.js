import Vue from 'vue';

var PROJECTS = [
  {
    title: "Neutron64",
    subtitle: "The honey badger of code editors.",
    icon: "laptop",
    url: "https://www.neutron64.com/",
    desc: "Neutron64 is a web based code editor build as a progressive\
    web app. Neutron is simple yet powerful and supports editing files\
    locally, remotely, and through cloud storage systems like\
    Google Drive. Neutron turns your web browser into a development \
    environment."
  },
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
  // {
  //   title: "Codacation",
  //   subtitle: "Git workflow for your coding education",
  //   icon: "code",
  //   url: "https://www.codacation.com/",
  //   github: "https://github.com/pizzapanther/codacation",
  //   desc: "Codacation is an open source tool to assign and track \
  //   work via Github and Github Issues. Our goal is to teach coding \
  //   using tools with used in the technology industry."
  // },
  {
    title: "Bible Fish",
    subtitle: "The quickest and simplest way to read the Bible on any device.",
    icon: "local_library",
    url: "https://www.bible.fish/",
    desc: "A free Progressive Web App Bible. Bible.Fish is a Bible app that \
    allows quick access to scriptures with just your web browser. You can also \
    use Bible.Fish offline without any internet on Chrome, Firefox, and Opera."
  },
  {
    title: "Top Cat",
    subtitle: "Always on Top Windows",
    icon: "file_upload",
    url: "https://chrome.google.com/webstore/detail/top-cat/fpocjghbecdohcpgnaledaoflojibhfn",
    desc: "A free Chrome OS app that lets you open URLs that float on top of all other windows."
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
