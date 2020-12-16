const URL = {
	// 巨象派单小程序接口
	getWXOpendId:"/pdb-wechat-user-info/openid", // 获取微信openId
	getTel: "/pdb-wechat-user-info/decrypt", // 获取手机号
	registerCheck: "/pdb-wechat-user-info/check-register", // 检查用户是否注册
	register: "/pdb-wechat-user-info/user-register", // 注册
	industryList: "/commonData/industryList", // 获取行业列表
	wxUserSignUP: "/user/wxUserSignUP", // 注册
	//loginToken: '/pdb-wechat-user/login', // 获取登陆token
	//loginOut: '/pdb-wechat-user/logout', // 退出登陆
	// getUser: '/pdb-wechat-user-info/get', // 获取用户信息
	// updateUserInfo: '/pdb-wechat-user-info/update', // 更新用戶信息
	// getCustomer: '/xcb-mine/get-customer-service', // 获取客服电话
	getOrderClassM: '/pdb-wechat-user-order/list-main-classification', // 获取订单产品主分类
	getOrderClassS: '/pdb-wechat-user-order/list-sub-classification', // 获取订单产品子分类
	// upload: '/obs-bucket-file/upload', // 上传图片
	payCharge: '/pay/charge', // 微信充值
	orderAdd: '/pdb-wechat-user-order/add', // 新增订单
	addressAdd: '/pdb-wechat-user/address/add', // 新增地址
	addressEdit: '/pdb-wechat-user/address/update', // 修改地址
	addressList: '/pdb-wechat-user/address/list', // 地址列表
	addressDel: '/pdb-wechat-user/address', // 删除地址
	addressDetail: '/pdb-wechat-user/address', // 地址详情
	addressSetDefault: '/pdb-wechat-user/address/set', // 地址详情
	// orderList: '/pdb-wechat-user-order/list', // 订单列表
	orderUpdate: '/pdb-wechat-user-order/update', // 修改订单
	orderCancel: '/pdb-wechat-user-order/cancel-order', // 取消订单
	// orderDetail: '/pdb-wechat-user-order/get', // 订单详情
	
	/* 接单宝 xcb */
	login: '/xcb-login/login', // 用户登陆
	loginOut: '/xcb-login/logout', // 用户登陆退出
	getCustomer: '/xcb-mine/get-customer-service', // 获取客服电话
	getUser: '/xcb-mine/get', // 获取用户信息
	updateUserInfo: '/xcb-mine/update', // 更新用戶信息
	upload: '/obs-bucket-file/upload', // 上传图片
	orderRobList: '/xcb-grab-order/list', // 抢单列表
	orderRobDetail: '/xcb-grab-order/get', // 抢单详情
	orderRob: '/xcb-grab-order/grab-order', // 抢单
	cancelRob: '/xcb-grab-order/cancel-grab-order', // 取消抢单
	cancelConfirm: '/xcb-order/cancel-order', // 取消接单
	orderConfirm: '/xcb-order/confirm-order', // 确认接单
	orderDetail: '/xcb-order/get', // 订单详情
	orderList: '/xcb-order/list', // 订单列表
	uploadProgress: '/xcb-order/report-progress', // 上传进度
	processList: '/xcb-order/list-report-progress', // 生产进度详情
	finishProgress: '/xcb-order/finished-order', // 加工完成
	cancelInspection: '/xcb-order/cancel-inspection', // 取消验货
	getMyBankCard: '/xcb-wechat-wallet/get-bank-card', // 获取银行卡
	addBankCard: '/xcb-wechat-wallet/save-bank-card', // 新增银行卡
	updateBankCard: '/xcb-wechat-wallet/update-bank-card', // 更新银行卡
	myBanlance: '/xcb-wechat-wallet/get-wallet-balance', // 我的余额
	myBanlanceDetail: '/xcb-wechat-wallet/list-wallet-details', // 我的余额明细
	cashWithdrawal: '/xcb-wechat-wallet/cash-withdrawal', // 提现
	/* 字典-start */
	industryDictionary: '/xcb-mine/list-industry', // 行业字典
	/* 字典-end */
}

export default URL