import Vue from 'vue'
import App from './App'
import apiReq from './utils/request.js'

import API from './api/index.js'
import URL from './utils/public/url.js'
import config from './utils/public/config.js'
import share from './utils/mixins/share.js'



import store from './store'

import customTarbar from '@/components/custom-tarbar/custom-tarbar.vue'; // 全局tabBar
import ourLoading from '@/components/plugins/our-loading/our-loading.vue'
import passwordInput from '@/components/plugins/password/password-input/password-input.vue' // 密码输入框
import numberKeyboard from '@/components/plugins/password/number-keyboard/number-keyboard.vue' // 密码键盘

import uniPopup from '@/components/uni-popup/uni-popup.vue' // 弹出层
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue' // 弹出层
import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue' // 弹出层
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue' // 弹出层
// import mingPop from '@/components/custom-components/ming-pop/ming-pop.vue' // 弹出层
import keFuPop from '@/components/uni-popup/kefu-popup.vue' // 弹出层
import lxcCount from '@/components/plugins/lxc-count/lxc-count.vue' // 计数器
import imgUpload from '@/components/plugins/imgUpload/imgUpload.vue' // 上传图片
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue' // 日历组件
import TabPane from '@/components/plugins/uni-tabs/wiszx-tabs/tabPane.vue' // tabs组件
import Tabs from '@/components/plugins/uni-tabs/wiszx-tabs/tabs.vue' // tabs组件
import QsTabs from '@/components/plugins/uni-tabs/QS-tabs/QS-tabs.vue' // tabs组件
import uploadProgress from '@/components/uni-popup/upload-progress-popup.vue' // 上传进度弹出层
import passwordPay from '@/components/uni-popup/password-pay.vue' // 密码支付弹出层
import circleProgress from '@/components/uni-popup/circleProgress.vue' // 上传进度弹出层

Vue.mixin(share)
Vue.component('tab-bar', customTarbar)
Vue.component('ourLoading', ourLoading)
Vue.component('uniPopup', uniPopup)
Vue.component('uniPopupMessage', uniPopupMessage)
Vue.component('uniPopupShare', uniPopupShare)
Vue.component('uniPopupDialog', uniPopupDialog)
// Vue.component('mingPop', mingPop)
Vue.component('keFuPop', keFuPop)
Vue.component('lxcCount', lxcCount)
Vue.component('imgUpload', imgUpload)
Vue.component('uniCalendar', uniCalendar)
Vue.component('TabPane', TabPane)
Vue.component('Tabs', Tabs)
Vue.component('QsTabs', QsTabs)
Vue.component('uploadProgress', uploadProgress)
Vue.component('circleProgress', circleProgress)
Vue.component('passwordInput', passwordInput)
Vue.component('numberKeyboard', numberKeyboard)
Vue.component('passwordPay', passwordPay)

Vue.prototype.$store = store

Vue.prototype.$apiReq = apiReq

Vue.prototype.API = API
Vue.prototype.URL = URL
Vue.prototype.$config = config

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
