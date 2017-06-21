export default [
  {
    name: '书本管理',
    menus: [
      {
        name: '书本列表',
        to: '/book/list'
      }
    ]
  },
  {
    name: '单词管理',
    menus: [
      {
        name: '单词列表',
        to: '/word'
      }
    ]
  },
  {
    name: '问题管理',
    menus: [
      {
        name: '问题列表',
        to: '/question/list'
      },
      {
        name: '创建问题',
        to: '/question/edit'
      },
      {
        name: '问题树列表',
        to: '/quest-tree'
      }
    ]
  }
]