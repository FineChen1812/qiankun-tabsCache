export const menuDataList = [
  {
    title: '主应用-表单(保活)',
    path: '/main/form',
  },
  {
    title: '主应用-列表(不保活)',
    path: '/main/list',
  },
  {
    title: '子应用1-表单(保活)',
    path: '/micro1/form',
  },
  {
    title: '子应用1-列表(不保活)',
    path: '/micro1/list',
  },
  {
    title: 'App2-User',
    path: '/app2/user',
  },
  {
    title: 'App2-About',
    path: '/app2/about',
  },
  {
    title: '再次打开->App2-About',
    path: '/app2/about?id=123&age=999岁&name=kuaifengle',
  },
  {
    title: '强制打开->App2-userDeatil',
    path: '/app2/user/detail?mustJump=true&pageTabTitle=用户详情',
  },
  {
    title: '假装打开一个加载失败的应用',
    path: '/app3/abc',
  },
]
