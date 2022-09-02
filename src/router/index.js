import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
//路由的配置：为什么不同用户登陆项目，菜单都是一样的？
//因为路由是‘死的’，
//需要把项目中的路由进行拆分。
//常量路由：就是不管用户的身份 都是可以看见的路由//登录、首页、404
//异步路由：就是根据用户的身份，来决定是否显示的路由

//常量路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
    meta: { title: "supermall后台管理系统" },
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },

];
//异步路由
export const asyncRoutes = [  
{
  name: "Acl",
  path: "/acl",
  component: Layout,
  redirect: "/acl/user/list",
  meta: {
    title: "权限管理",
    icon: "el-icon-lock",
  },
  children: [
    {
      name: "User",
      path: "user/list",
      component: () => import("@/views/acl/user/list"),
      meta: {
        title: "用户管理",
      },
    },
    {
      name: "Role",
      path: "role/list",
      component: () => import("@/views/acl/role/list"),
      meta: {
        title: "角色管理",
      },
    },
    {
      name: "RoleAuth",
      path: "role/auth/:id",
      component: () => import("@/views/acl/role/roleAuth"),
      meta: {
        aciveMenu: "/acl/role/list",
        title: "角色授权",
      },
      hidden: true,
    },
    {
      name: "Permission",
      path: "permission/list",
      component: () => import("@/views/acl/permission/list"),
      meta: {
        title: "菜单管理",
      },
    },
  ],
},
{
  path: "/product",
  component: Layout,
  name: "Product",
  meta: {
    title: "商品管理",
    icon: "el-icon-goods",
  },
  children: [
    {
      path: "trademark",
      name: "trademark",
      component: () => import("@/views/product/tradeMark"),
      meta: {
        title: "品牌管理",
      },
    },
    {
      path: "attr",
      name: "Attr",
      component: () => import("@/views/product/Attr"),
      meta: {
        title: "平台属性管理",
      },
    },
    {
      path: "sku",
      name: "Sku",
      component: () => import("@/views/product/Sku"),
      meta: {
        title: "Sku管理",
      },
    },
    {
      path: "spu",
      name: "Spu",
      component: () => import("@/views/product/Spu"),
      meta: {
        title: "Spu管理",
      },
    },
  ],
}
];
//任意路由
export const anyRoutes=[  
  // 当路径出现错误的时候重定向到404
{ path: "*", redirect: "/404", hidden: true }
];


const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
