const getBundlerChildren = bundler => {
  return [
    {
      text: 'Angular',
      path: `/${bundler}/angular`
    }, {
      text: 'React',
      path: `/${bundler}/react`
    }, {
      text: 'Vue',
      path: `/${bundler}/vue`
    }, 
  ]
}

export let HEADER_MENU_ITEMS = [
  {
    text: "На главную",
    link: "/"
  },
  {
    text: "Обо мне",
    link: "/about"
  },
  {
    text: "Другие версии",
    children: [
      {
        text: "Webpack",
        children: getBundlerChildren('webpack')
      }, {
        text: "browserify",
        children: getBundlerChildren('browserify')
      }, {
        text: "Rollup",
        children: getBundlerChildren('rollup')
      }, {
        text: "Parcel",
        children: getBundlerChildren('parcel')
      }, 
    ]
  },
  {
    text: 'Всякое',
    link: '/other'
  }
]

export const FOOTER_LINKS = [
  {
    text: 'VK',
    link: 'https://vk.com'
  }, {
    text: 'Git',
    link: 'https://git.com'
  }, {
    text: 'Телега',
    link: 'https://tele.click'
  }, {
    text: 'Почта',
    link: 'mailto:mishalevshin@gmail.com'
  }
]