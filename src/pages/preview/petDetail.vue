<template>
	<view class="pet-detail-wrap">
		<view class="header-swiper">
			<swiper class="swiper" :indicator-dots="swiperConfig.indicatorDots" :autoplay="swiperConfig.autoplay" :interval="swiperConfig.interval" :duration="swiperConfig.duration">
				<swiper-item v-for="(item, index) in 2" :key="index" class="carousel-item">
					<image class="carousel-img" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
				</swiper-item>
			</swiper>
		</view>
		<!--pet info-->
		<view class="info">
			<view class="u-flex-b-c">
				<text>no name de m m</text>
				<text>has been lock</text>
			</view>

			<view class="detail-inline">
				<view class="u-flex-s-c">
					<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
					<text>name:</text>
					<text>zhong hua tian </text>
				</view>
				<view class="">
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
				</view>
				<view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
				</view>
				<view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
						<text>name:</text>
						<text>zhong hua tian </text>
					</view>
				</view>
			</view>

			<view>
				<view class="u-flex-s-c">
					<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
					<view>
						<view>Merlin</view>
						<view class="u-flex-b-c">
							<text>placeholder</text>
							<text>placeholder</text>
						</view>
					</view>
				</view>
				<view>
					a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
					a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
					a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
					a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
					a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
					a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
					a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
				</view>
			</view>

			<view class="other-opr">其他信息领养</view>

			<view class="opr u-flex-b-c">
				<button>电话</button>
				<button>微信号</button>
				<button>微信二维码</button>
			</view>
		</view>

		<view class="footer">
			<view>1</view>
			<view>2</view>
			<view>3</view>
			<view>4</view>
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
		padding-bottom: 120px;
		background-color: #f9f9f9;
		.info {
			padding: 0 32px;
			.opr {
				> button {
					.flex-box-align-justify(center, start);
				}
			}

			.detail-inline {
				box-sizing: border-box;
				padding: 20px;
				border-radius: 10px;
				background-color: #ffffff;
				> view {
					display: flex;
					border-bottom: 2px solid #f6f6f6;
				}
				image {
					.base-square(40px)
				}
			}
		}

		.footer {
			width: 100vw;
			height: 120px;
			display: flex;
			position: fixed;

			bottom: 0;
			> view {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
