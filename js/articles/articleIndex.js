import { createCards, createURLCards, createEndCards, createArticleCards } from '../cards.js';
import { articles } from './articleAll.js';

const endText = [
    "©️2025 星空晶体的个人网站",
    "本网站内容转载协议为CC BY-NC-SA4.0，转载请标注原作者"
];

const ac = [`目前有${articles.length}篇文章`];
createCards("文章", "一些想法、灵感等东西会在这了呈现", ac);
articles.forEach((article) =>{
    createArticleCards(article.title, article.introduction, '../../img/20250707.png', './p/20250707.html');
})
createEndCards(endText);