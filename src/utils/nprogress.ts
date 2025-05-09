import NProgress from 'nprogress'
 
//全局进度条的配置
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 500, // 自动递增间隔
    minimum: 0.3, // 更改启动时使用的最小百分比
    parent: 'body', //指定进度条的父容器
    template: '<div class="bar" role="bar" style="background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);"></div>'
})
 
export default NProgress