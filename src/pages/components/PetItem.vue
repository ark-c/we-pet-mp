<template>
	<view class="component-pet-item u-fz-middle">
		<view class="item-header u-flex-b-c">
			<view class="u-flex-s-c">
				<image :src="petInfo.createAvatarUrl" class="avatar-small"></image>
				<view class="u-mg-l-20 u-fz-middle">
					<view class="u-fz-w">{{petInfo.createUser}}</view>
					<view class="time">{{petInfo.createTimeFormat}}</view>
				</view>
			</view>
			<text class="u-fz-middle u-fz-w" :class="petInfo.adoptionStatus === 0 ? 'green' : 'gray-e4'">{{petStatus[petInfo.adoptionStatus]}}</text>
		</view>
		<view class="item-content" @click="detailClick(petInfo.petId)">
			<view class="name u-fz-big">
				<text class="u-fz-w">{{petInfo.petAssortmentName}}</text>
				<text>({{petInfo.petAge}}，{{petSex[petInfo.petSex]}})</text>
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
					<text class="iconfont icon-collect" :class="{'yellow': petInfo.userIsStar}"></text>
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
	import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
	import { petStatus, petSex } from '@/utils/const'
	import { PetItemInfo } from '@/interfaces/api'

	@Component
	export default class PetItem extends Vue {
		@Prop() petInfo: PetItemInfo

		petStatus = petStatus
		petSex = petSex

		@Emit()
		toDetail (id: number) {}

		/**
		 * 单项点击
		 */
		detailClick (id: number) {
			this.toDetail(id)
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
		.item-header {
			.time {
				font-size: 18px;
				color: #434343;
			}
		}
		.item-content {
			.name {
				margin: 26px 0 16px;
			}
			.desc {
				font-size: 24px;
				color: #353535;
			}
			.pet-image {
				position: relative;
				> image {
					display: block !important;
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
