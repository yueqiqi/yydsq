<template>
	<view class="container">
		<view>
		</view>
		<view><bw-swiper :swiperList="swiperList"></bw-swiper></view>
		<grid-swiper :list="grid" @press="onPress"></grid-swiper>
		<title title='爆款推荐' :showMore='false' line='linear-gradient(45deg,rgba(218,25,22,1) 0%,rgba(241,82,51,1) 100%)'></title>
		<view><top-img :list="topImg"></top-img></view>
		<view style=" margin-bottom:100upx">
			<tab :tabList="tabList" :tabCur.sync="TabCur" textFlex @change="tabChange" tab-class="text-center text-black bg-white" select-class="text-orange"></tab>
			<swiper
				:current="TabCur"
				class="swiper"
				duration="300"
				:circular="true"
				indicator-color="rgba(255,255,255,0)"
				indicator-active-color="rgba(255,255,255,0)"
				@change="swiperChange"
				:style="{ height: swiperHeight+30 + 'px'}"
			>
				<swiper-item >
					<view class="list">
						<goods-swiper></goods-swiper>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="copy">Clowns Laughing At You 提供技术支持</view>
	</view>
</template>

<script>
import test from '@/untils/test.js';
import bwSwiper from '@/components/swiper/swiper.vue';
import tab from '@/components/tabs/index.vue';
import gridSwiper from '@/components/grid-swiper/index.vue';
import topImg from '@/components/topImg/index.vue';
import goodsSwiper from '@/components/swiper-goods/index.vue';
import title from '@/components/title/index.vue';
export default {
	components: {
		bwSwiper,
		gridSwiper,
		tab,
		topImg,
		goodsSwiper,
		title
	},
	data() {
		return {
			listHeight: 0, //内部的高度
			swiperHeight: 0, //外部的高度
			swiperList: [],
			grid: [], //金刚区
			tabList: [{ name: '电视墙' }, { name: '隔断柜' }], //选项卡
			TabCur: 0,
			topImg: [],
			detail: [],
			config: {
				more: true,
				autoplay: false,
				multiple: 3,
				shadow: true
			}
		};
	},
	onShow() {
		let _this = this;
		setTimeout(function() {
			let list = '.list';
			// console
			_this.getlistHeight(list);
			setTimeout(()=>{
			console.log('gaodu',_this.swiperHeight);
				
			},1500)
		}, 10);
	},
	methods: {
		getlistHeight(list) {
			let _this = this;
			let info = uni.createSelectorQuery().select(list);
			info.boundingClientRect(function(data) {
				console.log(data)  // 获取元素的各种参数
				_this.listHeight = data.height; // 获取元素高度
				_this.getHeight();
			}).exec();
		},
		getHeight() {
			let _this = this;
			_this.swiperHeight = _this.listHeight;
			return _this.swiperHeight;
		},
		tapFun(val){
			console.log(val)
		},
		tabChange(index) {
			this.TabCur = index;
		},
		swiperChange(e) {
			let { current } = e.target;
			this.TabCur = current;
		},
		onPress(val) {
			console.log(val);
		}
	},
	onLoad() {
		this.swiperList = test.banner;
		test.grid.map(item => {
			item.icon = item.img;
			item.title = item.text;
		});
		this.grid = test.grid;
		this.topImg = test.topImg;
		this.detail = test.details;
		console.log(this.detail)
	}
};
</script>

<style>
.container {
	padding-top: 30upx;
	background: #ffffff;
}
.text-center {
	text-align: center;
}
.copy{
	font-size: 22upx;
	color: #909090;
	background: #f3f4f6;
	width: 100%;
	text-align: center;
	padding-top: 15upx;
	padding-bottom: 15upx;
}
</style>
