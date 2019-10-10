
    let bannerObj       = ['./images/1.jpg','./images/2.jpg','./images/3.jpg','./images/4.jpg','./images/5.jpg'];
    let bannerObjLength = bannerObj.length;
    let bannerBoxUl     = document.querySelector('.banner-box_ul');
    let li              = null;
    let img             = null;
    let liNodes         = null;
    let timer           = null;
    let index           = 0;
    let judge           = false;
    let leftCircle      = document.querySelectorAll('.circle')[0];
    let rightCircle     = document.querySelectorAll('.circle')[1];
    let operateLeft     = document.querySelector('.operate-left');
    let operateRight    = document.querySelector('.operate-right');

    for (let i = 0; i < bannerObjLength; i++) {
          li = document.createElement('li');
         img = document.createElement('img');
        bannerBoxUl.appendChild(li).style.display = 'none';
        li.appendChild(img).src = bannerObj[i];
    };

    liNodes = bannerBoxUl.children;
    liNodes[index].style.display = 'block';
    timer = window.setInterval(animationRightWay, 2000);

function animationRightWay() {
    liNodes[index].style.display = 'none';
    if (index < bannerObjLength - 1) {
        liNodes[index + 1].style.display = 'block';
        index ++
    } else {
        index = 0;
        liNodes[index].style.display = 'block'
    }
};

function animationLeftWay() {
    liNodes[index].style.display = 'none';
    if (index > 0) {
        liNodes[index - 1].style.display = 'block';
        index --
    } else {
        index = bannerObjLength - 1;
        liNodes[index].style.display = 'block'
    }
};

operateLeft.addEventListener('click', ()=> {
    judge = true;
    clearInterval(timer);
    animationLeftWay()
});

operateRight.addEventListener('click', ()=> {
    judge = true;
    clearInterval(timer);
    animationRightWay()
});

// 重新启动定时器
function startInterval() {
    if (judge)
        timer = window.setInterval(animationRightWay, 2000);
    judge = false
}

// 显示操作按钮
function showOperate() {
    leftCircle.style.display = 'block';
    rightCircle.style.display = 'block'
}

// 隐藏操作按钮
function hideOperate() {
    leftCircle.style.display = 'none';
    rightCircle.style.display = 'none'
}


