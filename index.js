import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Analysis from "../views/Analysis.vue";
import store from "../store";

Vue.use(VueRouter);

const DEFAULT_TITLE = "Build Analyitics";

const requireAuth = () => (from, to, next) => {
  // if (store.getters.getIsAuth) return next()
  // next('/')

  // 임시 start
  let useId = [
      'wips2002033'
    , 'wips2019017'
    , 'wips2017059'
    , 'wips2005062'
    , 'wips2016018'
    , 'wips2018071'
    , 'wips2019084'
    , 'wips2018059'
    , 'wips2021027'
    , 'wips2019052'
    , 'wips2021016'
    , 'wips2020093'
    , 'wips2021017'
    , 'wips2020083'
    , 'wips2020038'
    , 'wips2021009'
    , 'wips2018075'
    , 'wips9999313'
    , 'wips2020054'
    , 'minisoft'
  ]

  let authFlag = useId.filter(useId => {
      return store.state.userInfo.userId === useId;
  });

  if (store.getters.getIsAuth && authFlag.length > 0) {
    return next()
  } else {
      localStorage.clear();

      store.dispatch('setUserInfo', {
          userId: null
      });

      store.dispatch('setIsAuth', {
          flag: false
      });

      next('/')
  }
  // 임시 end

}

const checkAuth = () => (from, to, next) => {
  if (store.getters.getIsAuth.flag) return next('/analysis')
  next()
}

const routes = [
  {
    // 로그인 화면
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: checkAuth(),
    meta: { title: `로그인 - ${DEFAULT_TITLE}` }
  },
  // 메인화면
  {
    path: "/main",
    name: "Main",
    component: Main,
    beforeEnter: requireAuth(),
    meta: { title: `메인 - ${DEFAULT_TITLE}` }
  },
  // 기존 프로젝트 분석화면
  {
    path: "/analysis/:isNewProject/:objectId",
    name: "Analysis",
    component: Analysis,
    beforeEnter: requireAuth(),
    meta: { title: DEFAULT_TITLE }
  },
  // 신규 프로젝트 분석화면
  {
    path: "/analysis",
    name: "NewAnalysis",
    component: Analysis,
    beforeEnter: requireAuth(),
    meta: { title: DEFAULT_TITLE }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

export default router;
