<template>
	<view class="content">
		<view>
			<NavBar :config="navConfig"></NavBar>
		</view>
		<view class="picker-wrap u-flex-c-c">
			<pet-picker @changePicker="changePicker($event,'areaPickerConfig')" :option="areaPickerConfig" class="picker"></pet-picker>
			<pet-picker @changePicker="changePicker($event,'breedPickerConfig')" :option="breedPickerConfig" class="picker"></pet-picker>
		</view>
		<block v-for="(item, index) in 2" :key="index">
			<pet-item :petInfo="item" @detailClick="toDetail"></pet-item>
		</block>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator'
	import { Getter, Mutation } from 'vuex-class'
	import { User } from '@/store/types'
	import PetItem from '@components/PetItem.vue'
	import { uNavigateTo } from '@/utils/navigateAction'
	import { NavBarOptions } from '@/interfaces/navBar'
	import PetPicker from '@components/PetPicker.vue'
	import { pickerOptions } from '@/interfaces/petPicker'

	const namespace: string = 'user'

	@Component({
		components: {
			PetItem,
			PetPicker
		}
	})
	export default class Index extends Vue {
		@Getter('user', { namespace }) userInfo: User
		@Mutation('UPDATE_USER', { namespace }) updateUser: any
		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: '#EC6863',
			title: 'WePet领养',
			back: false
		}
		areaPickerConfig: pickerOptions = {
			pickerList: [
				{
					id: 0,
					name: '全国'
				},
				{
					id: 1,
					name: '省市区'
				}
			],
			rangeKey: 'name'
		}
		breedPickerConfig: pickerOptions = {
			pickerList: [
				{
					id: 0,
					name: '不限'
				},
				{
					id: 1,
					name: '猫咪'
				},
				{
					id: 2,
					name: '狗狗'
				},
				{
					id: 3,
					name: '其他宠物'
				}
			],
			rangeKey: 'name',
			staticText: '品种/'
		}

		/**
		 * 授权用户信息
		 * @param $event
		 */
		getUser ($event: any): void {
			if ($event.detail.errMsg !== 'getUserInfo:ok') return
			this.updateUser($event.detail.userInfo)
		}

		/**
		 * 详情跳转
		 */
		toDetail () {
			uNavigateTo('/pages/preview/petDetail').then()
		}

		/**
		 * 子组件传过来的当前选中的picker的索引
		 * @param val
		 * @param picker
		 */
		changePicker (val: number, picker: string) {
			console.log('当前picker索引', val)
			console.log('当前是哪个picker', picker)

			interface IParams { // 解决this[picker]报错的问题
				[key: string]: any
			}

			let id = (<IParams>this)[picker].pickerList[val].id
			console.log('id', id)
		}
	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #f9f9f9;
		width: 100vw;
		min-height: 100vh;
	}
	.picker-wrap {
		background: #fff;
		padding: 30px 0;
		margin-bottom: 20px;
		font-size: 26px;
		color: #434343;
		.picker {
			flex: 1;
			text-align: center;
		}
	}
</style>
