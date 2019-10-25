<template>
	<view class="component-pet-item u-fz-middle">
		<view class="item-header u-flex-b-c">
			<view class="u-flex-s-c">
				<image :src="petInfo.avatar" class="avatar-small"></image>
				<view class="u-mg-l-20 u-fz-middle">
					<view class="u-fz-w">{{petInfo.createUser}}</view>
					<view>{{petInfo.createTime}}</view>
				</view>
			</view>
			<text class="u-fz-middle u-fz-w">待领养</text>
		</view>
		<view class="item-content" @click="emitDetail">
			<view class="name u-mg-t-40 u-mg-b-20 u-fz-big">
				<text class="u-fz-w">{{petInfo.petNikeName}}</text>
				<text>({{petInfo.petAge}}，{{petInfo.petAssortment}})</text>
			</view>
			<view class="desc u-text-clamp-3">
				{{petInfo.petIntroduction}}
			</view>
			<view class="pet-image u-flex-b-c u-mg-t-20 u-mg-b-20">
				<block v-for="(item,index) in petInfo.petImages" :key="index" v-if="index < 2">
					<image :src="item"></image>
				</block>
				<text class="pet-image-desc">共{{petInfo.petImages && petInfo.petImages.length}}张照片</text>
			</view>
		</view>
		<view class="item-footer u-flex-b-c">
			<view class="u-flex-s-c">
				<text class="iconfont icon-location"></text>
				<view class="area u-text-ellipsis">{{petInfo.petProvince}}{{petInfo.petCity ? '/' + petInfo.petCity : ''}}{{petInfo.petDistrict ? '/' + petInfo.petDistrict : ''}}</view>
			</view>
			<view class="u-flex-b-c sum-wrap">
				<view class="u-flex-s-c">
					<text class="iconfont icon-eye"></text>
					<text>{{petInfo.readSum}}</text>
				</view>
				<view class="u-flex-s-c">
					<text class="iconfont icon-collect"></text>
					<text>{{petInfo.starSum}}</text>
				</view>
				<view class="u-flex-s-c">
					<text class="iconfont icon-share"></text>
					<text>{{petInfo.shareSum}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import { Prop } from 'vue-property-decorator'

	const petInfo = {
		avatar: 'https://upload-images.jianshu.io/upload_images/4741933-158d7fbd28d08341.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/128/format/webp',
		createTime: 'today',
		createUser: 'Merlin',
		petAge: 0,
		petAssortment: '猫',
		petCity: '北京',
		petDistrict: '海淀',
		petId: 0,
		petImages: ['https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132',
			'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132'],
		petIntroduction: '宠物介绍',
		petNikeName: '宠物昵称',
		petProvince: '北京',
		petSex: 6,
		readSum: 10,
		shareSum: 10,
		starSum: 10
	}
	@Component
	export default class PetItem extends Vue {
		petInfo = petInfo //TODO

		// @Prop({ required: false, default: petInfo }) petInfo: any

		/**
		 * 单项点击
		 */
		emitDetail () {
			this.$emit('detailClick')
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.component-pet-item {
		width: 720px;
		margin: 0 auto 13px;
		background-color: #ffffff;
		border-radius: 30px;
		padding: 32px;
		box-sizing: border-box;
		.item-content {
			.pet-image {
				position: relative;
				> image {
					.base-square(320px);
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
		.icon-location {
			color: #EF8582;
			margin-right: 10px;
			font-size: 34px;
		}
		.area {
			max-width: 300px;
		}
		.sum-wrap {
			color: #E7E7E7;
			font-size: 24px;
			.iconfont {
				font-size: 30px;
				color: #E1E1E1;
				margin: 0 6px 0 34px;
			}
		}
	}
</style>
