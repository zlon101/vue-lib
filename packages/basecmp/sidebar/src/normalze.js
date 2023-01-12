/*
* 规范化 route, 修改 path 和 vpath
* path 是真实的路由全路径
* vpath 用于导航栏和面包屑的伪路径
* */

const createSup = (route) => {
  const meta = route.meta;
  return {
    name: route.name,
    title: meta.title,
    vpath: meta.vpath,
    fullpath: meta.fullpath,
    sup: route.meta.sup,
  };
};

const joinPath = (prePath, nowPath) => {
  /* if (new RegExp(`${nowPath}$`).test(prePath)) {
    return prePath;
  } */
  return `${prePath}/${nowPath}`;
};

/**
 * supRoute: 父级路由
 * route: 当前路由配置
 * ****/
const normalize = (supRoute, route) => {
  !supRoute.meta && (supRoute.meta = {});

  const childs = route.children || [];
  const path = route.path;
  const supMeta = supRoute.meta;
  if (!supMeta.fullpath) {
    supMeta.fullpath = supRoute.path;
  }
  if (!supMeta.vpath) {
    supMeta.vpath = supMeta.fullpath;
  }

  if (!route) return;
  // path=/xxx/xx
  let fullpath = '';
  if (/^\//.test(path)) {
    fullpath = path;
  } else {
    fullpath = joinPath(supMeta.fullpath, path);
  }
  route.meta ? (route.meta.fullpath = fullpath) : (route.meta = { fullpath });

  // 添加 vpath
  let tmpMeta = route.meta;
  tmpMeta.vpath = fullpath;
  let tmpRoute = route;
  const supChilds = supRoute.children || [];
  if (!tmpMeta.parent) {
    tmpRoute.meta.sup = createSup(supRoute);
  }
  while (tmpMeta.parent) {
    const ind = supChilds.findIndex(item => item.path === tmpMeta.parent);
    if (ind === -1) {
      throw new Error(`meta.parent=${tmpMeta.parent} 配置未找到`);
    } else {
      const pathFrag = tmpRoute.path.split('/').pop();
      const parentRoute = supChilds[ind];
      const parentvpath = parentRoute.meta.vpath || parentRoute.path;
      tmpRoute.meta.vpath = joinPath(parentvpath, pathFrag);
      tmpRoute.meta.sup = createSup(parentRoute);
      tmpRoute = parentRoute;
      tmpMeta = parentRoute.meta || {};
    }
  }

  childs.forEach(item => normalize(route, item));
};


export default normalize;