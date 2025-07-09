import { createCards, createURLCards, createEndCards } from './cards.js';

const arrayText1 = [
    "来到此网站，来看看吧"
];

const arrayText2 = [
    "本人是一名学生，目前正在上初中。",
    "本人有玩Minecraft、编程、读科幻小说等爱好，游玩了近五年Minecraft。",
    "本人同时是一位Minecraft基岩版开发者，会开发附加包，同时稍微懂点基岩版技术内容。",
    "本人会点Python、C++、JavaScript、TypeScript，目前有些地方尚不成熟，等待进行完善。"
];

const arrayText3 = [
    "我的一些文章"
];
const arrayUrl3 = [{
    url: "articles/index.html",
    text: "点我进入文章主页"
}]

const arrayText4 = [
    "以下是相关链接"
];
const arrayUrl4 = [{
    url: "xkjt-123k1@outlook.com",
    text: "我的邮箱"
},
{
    url: "https://klpbbs.com/?1595448",
    text: "本人的苦力怕论坛用户空间"
},
{
    url: "https://b23.tv/Qa3h61R",
    text: "本人的Bilibili用户空间"
}];

const endText = [
    "©️2025 星空晶体的个人网站",
    "本网站内容转载协议为CC BY-NC-SA4.0，转载请标注原作者"
];

createCards("欢迎！Welcome", "欢迎来到星空晶体的个人网站", arrayText1);
createCards("关于我","一些我的介绍",arrayText2);
createURLCards("文章", "不可抗力因素不能搭建正经博客只能这样了（）", arrayText3, arrayUrl3);
createURLCards("我的联系方式", "向友好目的联系的人表示欢迎", arrayText4, arrayUrl4);
createEndCards(endText);