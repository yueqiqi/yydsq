<template>
	<view class="container">
		<view><bw-swiper :swiperList="swiperList" style="width:100%"></bw-swiper></view>
		<grid-swiper :list="grid" @press="onPress"></grid-swiper>
		<view><top-img :list="topImg"></top-img></view>
		<view class=""><goodsSwiper :datas="detail" :config="config" @change="swiperChange" @tapFun="tapFun"></goodsSwiper></view>
		<view>
			<tab :tabList="tabList" :tabCur.sync="TabCur" textFlex @change="tabChange" tab-class="text-center text-black bg-white" select-class="text-orange"></tab>
			<swiper
				:current="TabCur"
				class="swiper"
				duration="300"
				:circular="true"
				indicator-color="rgba(255,255,255,0)"
				indicator-active-color="rgba(255,255,255,0)"
				@change="swiperChange"
			>
				<swiper-item v-for="(item, index) in tabList3" :key="index">
					<div class="bg-white padding margin text-center text-black">{{ item.name }}</div>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import test from '@/untils/test.js';
import bwSwiper from '@/components/swiper/swiper.vue';
import tab from '@/components/tabs/index.vue';
import gridSwiper from '@/components/grid-swiper/index.vue';
import topImg from '@/components/topImg/index.vue';
import goodsSwiper from '@/components/swiper-goods/index.vue';
export default {
	components: {
		bwSwiper,
		gridSwiper,
		tab,
		topImg,
		goodsSwiper
	},
	data() {
		return {
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
	methods: {
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
</style>
