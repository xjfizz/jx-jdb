const config = {
	key: '123456987',
	 //HOST: "http://192.168.1.32:8891/dev-api", // 东强线下测试
	   HOST:"https://pdtest.qingchuangweb.com:8891/stage-api", // 测试环境
	statusSty: [
		{status: 0, statusText:'已取消',color:'#00DB7B'},
		{status: 1, statusText:'待受理',color:'#007AFF'},
		{status: 2, statusText:'受理中',color:'#0ACFF4'},
		{status: 3, statusText:'待支付定金',color:'#FFC800'},
		/* 供应商 */
		{status: 4, statusText:'待生产',color:'#ffcf0e'}, // 4,5   
		{status: 5, statusText:'洽谈中',color:'#007AFF'}, // 4,5
		{status: 6, statusText:'进行中',color:'#1EC9FE'}, // 6,7
		{status: 7, statusText:'待验货',color:'#44fbfe'}, // 6,7
		{status: 8, statusText:'配送中',color:'#405CFF'},
		{status: 9, statusText:'配送中',color:'#405CFF'},
		{status: 10, statusText:'配送中',color:'#405CFF'},
		{status: 11, statusText:'待平台打款',color:'#FF8500'},// 11、12
		{status: 12, statusText:'已完成',color:'#00DB7B'},
	]
}

export default config
