<template>
	<view></view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { apiLogin } from '@/service/api';
	import { uRelaunch, uSwitchTab } from '@/utils/navigateAction';

	@Component
	export default class Transition extends Vue {
		async onLoad(options) {
			uni.showLoading();
			if (!this.$store.state.user.token) {
				const wxLogin = await uni.login();
				const res = wxLogin[1];
				if (res.code) {
					const apiResult = await apiLogin(res.code);
					const result = apiResult.data.data || {}
					console.log(result)
					// @ts-ignore
					this.$store.commit('user/UPDATE_USER', result);
					uni.setStorageSync('openId', result.openId);
					uni.setStorageSync('token', result.token);
					uni.setStorageSync('tokenTs', +new Date());
					// @ts-ignore
					uni.setStorageSync('userInfo', this.$store.state.user);
				}
			}

			const { type, uri } = options;
			this.navigateAction(type, uri);
		}

		/**
		 * 跳转
		 * @param type '0'：navigateTo, '1': switchTab
		 * @param uri
		 */
		navigateAction(type, uri) {
			switch (type) {
				case '0':
					uRelaunch(uri);
					break;
				case '1':
					uSwitchTab(uri);
					break;
				default:
					uSwitchTab('/pages/preview/index');
			}
		}
	}
</script>
