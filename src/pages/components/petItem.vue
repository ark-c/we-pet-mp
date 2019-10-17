<template>
	<view class="component-pet-item u-fz-middle">
		<view class="item-header u-flex-b-c">
			<view class="u-flex-s-c">
				<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="avatar-small"></image>
				<view class="u-mg-l-20 u-fz-middle">
					<view>Merlin</view>
					<view>today</view>
				</view>
			</view>
			<text class="u-fz-large">today</text>
		</view>
		<view class="item-content">
			<view class="name u-mg-t-40 u-mg-b-20 u-fz-big">
				<text>name</text>
				<text>(3-5month)</text>
			</view>
			<view class="desc u-text-clamp-3">
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
			</view>

			<view class="pet-image u-flex-b-c u-mg-t-20 u-mg-b-20">
				<block v-for="item in 2" :key="index">
					<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
				</block>
				<text class="pet-image-desc">共2张照片</text>
			</view>
		</view>
		<view class="item-footer u-flex-b-c">
			<view class="u-flex-s-c">
				<image class="img-item" src="../../static/images/location.png"/>
				<text>BeiJing</text>
			</view>
			<view class="u-flex-b-c">
				<view class="u-flex-s-c">
					<image class="img-item" src="../../static/images/location.png"/>
					<text>23</text>
				</view>
				<view class="u-flex-s-c">
					<image class="img-item" src="../../static/images/location.png"/>
					<text>32</text>
				</view>
				<view class="u-flex-s-c">
					<image class="img-item" src="../../static/images/location.png"/>
					<text>32</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import { Prop } from 'vue-property-decorator';

	const petInfo = {
		name: '',
		avatar: ''
	};
	@Component
	export default class PetItem extends Vue {
		@Prop({ required: false, default: petInfo }) petInfo: any;
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.component-pet-item {
		width: 720px;
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 30px;
		padding: 32px;
		box-sizing: border-box;

		.item-content {
			.pet-image {
				position: relative;
				> image {
					.base-square(300px);
				}
				.pet-image-desc {
					position: absolute;
					bottom: 10px;
					right: 30px;
					text-align: right;
					color: #fff;
				}
			}
		}
		.item-footer {
			.img-item {
				.base-square(60px);
			}
		}
	}
</style>
