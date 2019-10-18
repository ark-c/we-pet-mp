<template>
	<view class="pet-detail-wrap">
		<view class="header-swiper">
			<swiper class="swiper" :indicator-dots="swiperConfig.indicatorDots" :autoplay="swiperConfig.autoplay" :interval="swiperConfig.interval" :duration="swiperConfig.duration">
				<swiper-item v-for="(item, index) in 2" :key="index" class="carousel-item">
					<image class="carousel-img" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import petItem from '@components/petItem.vue';

	@Component({
		components: {
			petItem
		}
	})
	export default class PetDetail extends Vue {
		swiperConfig: any = {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 1000
		};
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.pet-detail-wrap {

	}
</style>
