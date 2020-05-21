<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	.icon{
		color: #303133;
		font-size: 40upx;
		font-family: texticons;
	}
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1827932_2zb34bpi6xk.ttf') format('truetype')
	}
	.flex{
		display: flex;
	}
	.sp{
		justify-content: space-between;
	}
	.left{
		justify-content: left;
	}
	.center{
		align-items: center;
	}
page{
	background: #f3f4f6!important;
	height: 100%!important;
}
.bg-green{
	background: linear-gradient(45deg,rgba(92,233,212,1) 0%,rgba(109,219,226,1) 100%);
}
.font-main{
	font-size: 32upx;
	color: #303133;
}
</style>
