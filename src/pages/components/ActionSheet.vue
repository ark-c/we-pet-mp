<template>
	<view class="action-sheet-wrap">
		<block>
			<view class="mask animated" :class="animationMask" @click="closeActionSheet">
				<view class="action-sheet animated" :class="animationSheet">
					<slot></slot>
					<view v-if="option.needClose" class="list close" @click="closeActionSheet">{{option.closeText}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script lang="ts">
	import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

	const defaultOption = {
		needClose: true,
		closeText: '取消'
	}
	@Component
	export default class PetPicker extends Vue {
		@Prop({ default: defaultOption }) actualOption: any
		option: any = Object.assign(defaultOption, this.actualOption)

		animationMask = 'fade-in'
		animationSheet = 'fade-in-bottom'
		timer: any = null

		@Emit()
		close () {
			clearTimeout(this.timer)
		}

		/**
		 * 关闭上拉菜单
		 */
		closeActionSheet () {
			this.animationMask = 'fade-out'
			this.animationSheet = 'fade-out-bottom'
			this.timer = setTimeout(() => {
				this.close()
			}, 200)
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	@import "~@/theme/actionSheet.less";
	.action-sheet-wrap {
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 999;
		}
		.action-sheet {
			width: 100%;
			position: absolute;
			top: 100%;
			z-index: 1000;
			overflow: hidden;
			background: #fff;
			padding: 10px 0;
			.close {
				color: #353535;
				text-align: center;
				padding: 28px 0;
				font-size: 32px;
				border-bottom: none;
			}
		}
		.animated {
			animation-timing-function: ease-out;
			animation-duration: 0.2s;
			animation-fill-mode: both;
		}
		@keyframes fadeInBottom {
			from {
				transform: translate3d(0, 0, 0);
			}
			to {
				transform: translate3d(0, -100%, 0);
			}
		}
		.fade-in-bottom {
			animation-name: fadeInBottom;
		}

		@keyframes fadeOutBottom {
			from {
				transform: translate3d(0, -100%, 0);
			}
			to {
				transform: translate3d(0, 0, 0);
			}
		}
		.fade-out-bottom {
			animation-name: fadeOutBottom;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
		.fade-in {
			animation-name: fadeIn;
		}
		@keyframes fadeOut {
			from {
				opacity: 1;
			}
			to {
				opacity: 0;
			}
		}
		.fade-out {
			animation-name: fadeOut;
		}
	}
</style>
