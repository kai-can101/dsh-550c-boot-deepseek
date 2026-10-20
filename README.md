# Deep Seek UAV Boot · DSH 社区插件

基于 yannicksong0106/dsh-550c-boot 0.4.0 的 20.5 秒定制开机动画，非 DeepSeek 官方产品。

内容：Deep seek 光环入场、原始47节点无人机终端演出、Deep seek READY 结尾、四种琥珀/绿/青/白配色、点击/Esc跳过、音效开关和音量。

公开版使用本地算法原创合成音效，不含抖音原声、商业曲目或版权人声。因此公开视频中的 Welcome to DeepSeek Harness 语音不会随公开版出现。

## 安装

GitHub 安装（发布后可用）：

    dsh plugin --profile desktop add github:kai-can101/dsh-550c-boot-deepseek

安装后退出并重新启动 Harness。Web 版把 desktop 换成 web。

npm 安装（待 npm 正式上架后可用）：

    dsh plugin --profile desktop add dsh-550c-boot-deepseek

此包当前只准备发布到 GitHub；npm Registry 尚未上架。

首次安装时请查看实际来源及权限；本项目的 lib/ 已经构建完成，无需安装时运行 prepare 脚本。

## 设置

设置 → 通用 → Deep Seek 开机动画；可控制完整动画、颜色、音效及音量。不要同时启用原版 550C 动画以免重复播放。

## 测试

本插件基于 DeepSeek Harness 0.2.x 预览版，尚需在别人的设备/版本上实机验收。测试可运行 node --check lib/client.js 和 npm pack --dry-run。配置采用 dsh.bundle.patch 规范。

## 版权与归属

软件：MIT，保留 LICENSE；dsh-550c-boot 原作者 Ziyang Song，550C 视觉 Voidpocket。相关字体按 SIL OFL 声明，详见 THIRD_PARTY_NOTICES.md。原创合成音效仅使用数学函数合成，允许随本包分发。本项目不代表 DeepSeek 官方。


## 私人版与公开版区别

公开版不含 Welcome to DeepSeek Harness 英文语音，因为原始抖音音频未取得公开再分发授权。公开版使用原创合成科技氛围音。
