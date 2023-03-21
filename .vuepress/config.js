module.exports = {
  title: "WXL570CN's Blog",
  description: "姑妄听之，如是我闻",
  base: '/react-visual-drag-demo/my-blog/',
  dest: "my-blog",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    ["meta", { name: "keywords", content: "WXL570CN,博客,conimi,nico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "关于",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/WXL570CN",
            icon: "reco-github",
          },
        ],
      },
    ],
    type: "blog",
    logo: "/logo.jpg",
    search: true,
    sidebar: "auto",
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "WXL570CN",
    authorAvatar: "/avatar.jpg",
    record: "570",
    startYear: "2017",
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [["@vuepress-reco/vuepress-plugin-extract-code", true]],
};
