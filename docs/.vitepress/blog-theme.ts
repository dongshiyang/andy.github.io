// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
import type { Theme } from '@sugarat/theme'

const baseUrl = 'https://blog.8866321.xyz'
const RSS: Theme.RSSOptions = {
  title: 'Andy',
  baseUrl,
  copyright: 'Copyright (c) 2018-2025, Andy',
  description: '道阻且长，行则将至',
  language: 'zh-cn',
  image: 'https://8866321.xyz/static/logo.png',
  favicon: 'https://8866321.xyz/static/favicon.ico',
}

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // markdown 图表支持（会增加一定的构建耗时）
  // mermaid: true

  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    message: '<a href="https://cloud.tencent.com" target="_blank" style="display:flex;align-items:center;justify-content:center;">本网站由  <img src="/tencentcloud-logo.svg">  提供云存储服务</a>',
    copyright: 'MIT License | Andy ',
    list:'<a href="https://icp.gov.moe/?keyword=20259886" target="_blank">萌ICP备20259886号</a>',
    icpRecord: {
      name: '鲁ICP备2025156177号-1',
      link: 'https://beian.miit.gov.cn/',

    },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: 'Andy',

  // 友链
  // friend: [
  //   {
  //     nickname: '粥里有勺糖',
  //     des: '你的指尖用于改变世界的力量',
  //     avatar:
  //       'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
  //     url: 'https://sugarat.top',
  //   },
  //   {
  //     nickname: 'Vitepress',
  //     des: 'Vite & Vue Powered Static Site Generator',
  //     avatar:
  //       'https://vitepress.dev/vitepress-logo-large.webp',
  //     url: 'https://vitepress.dev/',
  //   },
  // ],

  // 公告
  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '👇公众号👇---👇 微信 👇' },
  //     {
  //       type: 'image',
  //       src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp'
  //     },
  //     {
  //       type: 'text',
  //       content: '欢迎大家加群&私信交流'
  //     },
  //     {
  //       type: 'text',
  //       content: '文章首/文尾有群二维码',
  //       style: 'padding-top:0'
  //     },
  //     {
  //       type: 'button',
  //       content: '作者博客',
  //       link: 'https://sugarat.top'
  //     },
  //     {
  //       type: 'button',
  //       content: '加群交流',
  //       props: {
  //         type: 'success'
  //       },
  //       link: 'https://theme.sugarat.top/group.html',
  //     }
  //   ],
  //   duration: 0
  // },
})

export { blogTheme }
