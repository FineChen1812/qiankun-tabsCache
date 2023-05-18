export const menuDataList = [
  {
    title: '子应用1-表单',
    path: '/micro1/form',
  }
  
]

let map = {}
menuDataList.forEach((item) => {
  map[item['path']] = item['title']
})

export const menuTitleData = map
