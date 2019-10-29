<template>
	<view class="release-wrap">
		<nav-bar :config="navConfig">
			<text slot="left">取消</text>
		</nav-bar>

		<view class="content">
			<view class="header info">
				<view class="title">说说宠物情况以及领养要求</view>
				<textarea name="" id="" placeholder="输入宠物信息" class="pet-info" placeholder-class="placeholder-class	"></textarea>
				<!--<img-upload :limit="6" :multipleJudge="true"></img-upload>-->
			</view>
			<view class="contact-info info">
				<view class="title">联系信息</view>
				<view class="line">
					<label for="phone">手机号</label>
					<input id="phone" placeholder-class="placeholder" maxlength="11" placeholder="输入手机号" type="number">
				</view>
				<view class="line">
					<label for="weChat">微信号</label>
					<input id="weChat" placeholder-class="placeholder" maxlength="11" placeholder="输入微信号" type="text">
				</view>
				<view class="line no-border">
					<label for="weChatImg">微信号</label>
					<input id="weChatImg" type="text">
				</view>
			</view>
			<view class="more-info info">
				<view class="title">更多信息</view>
				<view class="line">
					<label>宠物昵称</label>
					<input placeholder-class="placeholder" maxlength="11" placeholder="输入宠物昵称" type="text">
				</view>
				<view class="line">
					<label>所在城市</label>
				</view>
				<view class="line">
					<label>品种</label>
				</view>
				<view class="line">
					<label>年龄</label>
				</view>
				<view class="line">
					<label>收养类型</label>
				</view>
				<view class="line">
					<label>性别</label>
					<radio-group @change="">
						<radio value="MM">MM</radio>
						<radio value="GG">GG</radio>
					</radio-group>
				</view>
				<view class="line">
					<label>绝育</label>
				</view>
				<view class="line">
					<label>驱虫</label>
				</view>
				<view class="line">
					<label>疫苗</label>
				</view>
				<view class="line">
					<label>领养费用</label>
				</view>
				<view class="line">
					<label>押金金额</label>
				</view>
			</view>
		</view>

		<button :disabled="canSubmit" class="submit btn">确认发布领养信息</button>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { NavBarOptions } from '@/interfaces/navBar';
	import ImgUpload from '@components/imgUpload.vue';

	@Component({
		components: { ImgUpload }
	})
	export default class Index extends Vue {
		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: '#EC6863',
			title: '发布领养信息',
			back: false
		};
		canSubmit: boolean = false; // 是否可提交
	}
</script>

<style lang="less" scoped>
	.release-wrap {
		font-size: 24px;
		background-color: #f6f6f6;
		color: #000;
		.content {
			padding: 0 32px 120px;
		}
		.info {
			> textarea {
				width: 100%;
				min-height: 70px;
			}
			.title {
				color: #000;
				font-weight: bold;
				font-size: 32px;
				margin: 40px 0;
			}
			.line {
				.flex-box-align-justify(space-between, center);
				font-size: 24px;
				border-bottom: 2px solid #878787;
				height: 70px;
				&.no-border {
					border: none
				}
				> label {
					color: #001;
				}
				> input {
					text-align: right;
				}
			}
		}

		.submit {
			width: 100%;
			height: 110px;
			line-height: 110px;
			position: fixed;
			bottom: 0;
			border: none!important;
			text-align: center;
			vertical-align: center;
			color: #ffffff;
			font-size: 32px;
			background-color: #EC5C56;
			clear: both;
		}
	}
</style>
