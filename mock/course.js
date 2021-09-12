const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@csentence(5, 10)',
    cover: '@image("200x100")',
    try: '@cparagraph',
    content: '@cparagraph',
    'price|1': [10, 5, 15, 8, 50, 90],
    't_price|1': [10, 5, 15, 8, 50, 90],
    'status|1': [0, 1],
    created_time: '@now',
    updated_time: '@now',
    'sub_count|1': [234, 5456, 7, 57, 335, 7, 567, 578]
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/course/list',
    type: 'get',
    response: config => {
      const {status, title, page = 1, limit = 20, sort} = config.query

      let mockList = List.filter(item => {
        // if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/course/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/course/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/course/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

