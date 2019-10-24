<template>
	<view>
		<picker @change="bindPickerChange($event)" :value="curIndex" :range="option.pickerList" :range-key="option.rangeKey">
			<view class="uni-input">
				{{option.staticText || ''}}{{option.pickerList[curIndex][option.rangeKey]}}
				<text class="iconfont icon-arrow"></text>
			</view>
		</picker>
	</view>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
	import { pickerOptions } from '@/interfaces/petPicker'

	@Component
	export default class PetPicker extends Vue {
		@Prop() option: pickerOptions
		curIndex: number = 0

		@Emit()
		changePicker(curIndex: number){}

		/**
		 * picker选择器
		 * @param e
		 */
		bindPickerChange (e: any) {
			this.curIndex = Number(e.target.value)
			this.changePicker(this.curIndex)
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.icon-arrow {
		font-size: 28px;
		color: #070204;
		margin: 2px 0 0 4px;
	}
</style>
