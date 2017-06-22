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
        name: '模板列表',
        to: '/quest-tpl/list'
      },
      {
        name: '创建模板',
        to: '/quest-tpl/edit'
      },
      {
        name: '创建问题',
        to: '/question/edit'
      }
    ]
  }
]