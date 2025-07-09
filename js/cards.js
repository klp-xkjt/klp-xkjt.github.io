export function createCards(title, subTitle, contentArray) {
    const body = document.body;
    
    const f_div = document.createElement('div');
    f_div.className = 'card';
    
    const f_h1 = document.createElement('h1');
    const f_h3 = document.createElement('h3');
    f_h1.textContent = title;
    f_h3.textContent = subTitle;
    f_div.appendChild(f_h1);
    f_div.appendChild(f_h3);
    
    // 遍历文本数组，为每段文字创建一个 p 元素
    contentArray.forEach((text) => {
        const f_p = document.createElement('p');
        f_p.textContent = text;
        f_div.appendChild(f_p);
    });
    
    body.appendChild(f_div);
}

export function createURLCards(title, subTitle, contentArray, linksArray) {
    const body = document.body;
    
    const f_div = document.createElement('div');
    f_div.className = 'card';
    
    const f_h1 = document.createElement('h1');
    const f_h3 = document.createElement('h3');
    f_h1.textContent = title;
    f_h3.textContent = subTitle;
    f_div.appendChild(f_h1);
    f_div.appendChild(f_h3);
    
    // 遍历文本数组，为每段文字创建一个 p 元素
    contentArray.forEach((text) => {
        const f_p = document.createElement('p');
        f_p.textContent = text;
        f_div.appendChild(f_p);
    });
    
    // 遍历链接数组，为每个链接创建一个 a 元素
    linksArray.forEach((link) => {
        const f_a = document.createElement('a');
        f_a.href = link.url;
        f_a.textContent = link.text;
        f_div.appendChild(f_a);
         // 可选：在链接之间添加一些分隔符
        if (link !== linksArray[linksArray.length - 1]) {
            const separator = document.createElement('span');
            separator.textContent = ' | ';
            f_div.appendChild(separator);
        }
    });
    
    body.appendChild(f_div);
}

export function createEndCards(contentArray) {
    const body = document.body;
    
    const f_div = document.createElement('div');
    f_div.className = 'card';
    
    // 遍历文本数组，为每段文字创建一个 p 元素
    contentArray.forEach((text) => {
        const f_p = document.createElement('p');
        f_p.textContent = text;
        f_p.className = 'end'
        f_div.appendChild(f_p);
    });
    
    body.appendChild(f_div);
}

export function createArticleCards(title, subTitle, imageUrl, linkUrl) {
    const body = document.body;
    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.addEventListener('click', function() {
        // 点击卡片时跳转到指定链接
        window.location.href = linkUrl;
    });
    
    // 创建图片元素
    const cardImage = document.createElement('img');
    cardImage.src = imageUrl;
    cardImage.className = 'card-image'; // 可以添加CSS类来样式化图片
    cardDiv.appendChild(cardImage);
    
    // 创建一个包含标题和短介绍的容器
    const infoDiv = document.createElement('div');
    infoDiv.className = 'card-info';
    
    const fH1 = document.createElement('h1');
    const fH3 = document.createElement('h3');
    fH1.textContent = title;
    fH3.textContent = subTitle;
    infoDiv.appendChild(fH1);
    infoDiv.appendChild(fH3);
    
    // 将包含标题和短介绍的容器添加到卡片中
    cardDiv.appendChild(infoDiv);
    
    body.appendChild(cardDiv);
}