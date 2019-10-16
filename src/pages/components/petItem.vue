<template>
	<view class="component-pet-item">
		<view class="item-header u-flex-b-c">
			<view class="u-flex-s-c">
				<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132" class="avatar-small"></image>
				<view>
					<view>Merlin</view>
					<view>today</view>
				</view>
			</view>
			<text>被领养</text>
		</view>
		<view class="item-content">
			<view class="name">
				<text>name</text>
				<text>(3-5month)</text>
			</view>
			<view class="desc u-text-clamp-3">
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
				a straight line passing from side to side through the center of a body or figure, especially a circle or sphere.
			</view>

			<view class="pet-image u-flex-b-c">
				<block v-for="item in 2" :key="index">
					<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132"></image>
				</block>
				<text class="pet-image-desc"></text>
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
		width: 700px;
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;

		.item-content {
			.pet-image {
				> image {
					.base-square(300px);
				}
			}
		}
		.item-footer {
			.img-item {
				.base-square(40px);
			}
		}
	}
</style>
