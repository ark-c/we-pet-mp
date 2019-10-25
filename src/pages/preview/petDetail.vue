<template>
	<view class="pet-detail-wrap">
		<view class="u-nav-no-size">
			<NavBar :config="navConfig"></NavBar>
		</view>
		<view class="header-swiper">
			<swiper class="swiper" :indicator-dots="swiperConfig.indicatorDots" :indicator-color="swiperConfig.indicatorColor" :indicator-active-color="swiperConfig.indicatorActiveColor" :autoplay="swiperConfig.autoplay" :interval="swiperConfig.interval" :duration="swiperConfig.duration">
				<swiper-item v-for="(item, index) in 2" :key="index">
					<image class="carousel-img" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
				</swiper-item>
			</swiper>
		</view>
		<!--pet info-->
		<view class="info">
			<view class="basic-info u-flex-b-c">
				<text>还没有名字的猫咪</text>
				<text>待领养</text>
			</view>
			<view class="detail-inline">
				<view class="detail-row">
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中华田</text>
					</view>
				</view>
				<view class="detail-row">
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中华</text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中园猫</text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中园猫</text>
					</view>
				</view>
				<view class="detail-row">
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中华田</text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中华田</text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中华田</text>
					</view>
				</view>
				<view class="detail-row">
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中华田</text>
					</view>
					<view class="u-flex-s-c">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="icon"></image>
						<text>品种：</text>
						<text>中华田</text>
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
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import PetItem from '@components/PetItem.vue'
	import { NavBarOptions } from '@/interfaces/navBar'

	@Component({
		components: {
			PetItem
		}
	})
	export default class PetDetail extends Vue {
		swiperConfig: any = {
			indicatorDots: true,
			indicatorColor: 'rgba(255,255,255,0.6)',
			indicatorActiveColor: '#fff',
			autoplay: false,
			interval: 2000,
			duration: 1000
		}
		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: 'transparent',
			title: '',
			back: true
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.pet-detail-wrap {
		padding-bottom: 120px;
		background-color: #f9f9f9;
		.header-swiper {
			.swiper {
				height: 672px;
			}
			.carousel-img {
				width: 100vw;
				height: 100%;
			}
		}
		.info {
			padding: 0 32px;
			.basic-info {
				padding: 35px 0 28px;
				font-size: 32px;
			}
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
				font-size: 24px;
				.detail-row {
					padding: 17px 0 14px;
					display: flex;
					border-bottom: 2px solid #f6f6f6;
					> view {
						width: 33.3%;
					}
				}
				.icon {
					.base-square(30px);
					margin-right: 10px;
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
