export default {
  pages: [
    'pages/home/index',
    'pages/activity/index',
    'pages/course/index',
    'pages/my/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#1aad19',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        // iconPath: './assets/images/tabbar/home.png',
        // selectedIconPath: './assets/images/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/activity/index',
        text: '活动',
        // iconPath: './assets/images/tabbar/activity.png',
        // selectedIconPath: './assets/images/tabbar/activity-active.png'
      },
      {
        pagePath: 'pages/course/index',
        text: '课程',
        // iconPath: './assets/images/tabbar/course.png',
        // selectedIconPath: './assets/images/tabbar/course-active.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        // iconPath: './assets/images/tabbar/my.png',
        // selectedIconPath: './assets/images/tabbar/my-active.png'
      }
    ]
  }
}
