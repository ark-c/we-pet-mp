<template>
	<view class="picker-wrap">
		<block v-if="option.mode === 'selector'">
			<picker @change="bindPickerChange" :value="curIndex" :range="option.pickerList" :range-key="option.rangeKey">
				<view class="uni-input">
					{{option.staticText || ''}}{{option.pickerList[curIndex][option.rangeKey]}}
					<text class="iconfont icon-arrow"></text>
				</view>
			</picker>
		</block>
		<block v-if="option.mode === 'region'">
			<picker @change="bindPickerChange" :value="areaRegion" mode="region">
				<view class="uni-input">
					<text v-if="areaRegion[0] === '全国'">全国</text>
					<view v-else class="u-text-ellipsis">{{areaRegion[0]}}{{areaRegion[1] ? '/' + areaRegion[1] : ''}}{{areaRegion[2] ? '/' + areaRegion[2] : ''}}</view>
					<text class="iconfont icon-arrow"></text>
				</view>
			</picker>
		</block>
	</view>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
	import { pickerOptions } from '@/interfaces/petPicker'

	const defaultPickerOption: pickerOptions = {
		mode: 'selector',
		pickerList: [],
		rangeKey: '',
		staticText: '',
		region: []
	}

	@Component
	export default class PetPicker extends Vue {
		@Prop({ default: defaultPickerOption }) option: pickerOptions
		curIndex: number = 0
		areaRegion: any = this.option.region

		@Emit()
		changePicker (curIndex: any) {}

		/**
		 * picker选择器
		 * @param e
		 */
		bindPickerChange (e: any) {
			if (this.option.mode === 'selector') {
				this.curIndex = Number(e.target.value)
				this.changePicker(this.curIndex)
			}
			if (this.option.mode === 'region') {
				this.areaRegion = e.target.value
				this.changePicker(this.areaRegion)
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.picker-wrap {
		.icon-arrow {
			font-size: 28px;
			color: #070204;
			margin: 2px 0 0 4px;
		}
		.uni-input {
			display: flex;
			justify-content: center;
			.u-text-ellipsis {
				max-width: 300px;
			}
		}
	}
</style>
