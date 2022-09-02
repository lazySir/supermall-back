import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { constantRoutes,anyRoutes,asyncRoutes,resetRouter } from "@/router";
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    //存储用户名
    name: "",
    //存储用户头像
    avatar: "",
    //存储用户路由
    routes: [],
    //存储按钮权限
    buttons: [],
    //存储用户角色
    roles: [],
    //对比：项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由
    resultAsyncRoutes:[],
    //最终需要展示的路由
    resultAllroutes:[],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  //最终计算出来的路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    //vuex保留当前用户的异步路由
    state.resultAsyncRoutes=asyncRoutes
    //将需要展示的路由合并
    state.resultAllroutes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    //给路由器添加新的路由
    router.addRoutes(state.resultAllroutes)
  },
  //存储用户信息
  SET_USERINFO: (state, userInfo) => {
    //用户名
    state.name = userInfo.name;
    //用户头像
    state.avatar = userInfo.avatar;
    //菜单权限标记
    state.routes = userInfo.routes;
    //按钮权限标记
    state.buttons = userInfo.buttons;
    //角色
    state.roles = userInfo.roles;
  },
};
//定义一个函数，两个数组进行对比，对比出当前的用户需要展示的路由
const computedAsycRoutes=(asyncRoutes,routes)=>{
  return asyncRoutes.filter(item=>{
    //数组当中如果没有这个元素 返回的索引值是-1，如果有返回的索引值不是-1
      if(routes.indexOf(item.name)!=-1){
        //递归 :可能还有二级路由 三级路由
        if(item.children&&item.children.length){
          item.children=computedAsycRoutes(item.children,routes)
        }
        return true
      }
   })
} 
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          const { name, avatar } = data;
          //vuex存储用户全部信息
          commit("SET_USERINFO", data);
          //存储最终routes
          commit('SET_RESULTASYNCROUTES',computedAsycRoutes(asyncRoutes,data.routes));
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
