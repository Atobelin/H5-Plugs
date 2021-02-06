function Miwow() {
   this.instanceMap = [];
   this.box = null;
}

/**
 * 初始化
 */
Miwow.prototype.init = function () {
   this.box = document.querySelector('.miwow-box');
   var instances = document.querySelectorAll('.miwow');
   this.buildMap(instances);
   this.registerListener();
};

/** 
 * 滚动事件
 */
Miwow.prototype.onScroll = function () {
   var box = this.box;
   var scrollTop = box.scrollTop;
   var instanceMap = this.instanceMap;
   var i;
   for (i = 0; i < instanceMap.length; i++) {
      var instance = instanceMap[i];
      if (instance.y < (scrollTop + 500)) {
         instance.node.style.display = 'block';
      }
   }
   i = null;
};

/** 
 * 注册监听器
 */
Miwow.prototype.registerListener = function () {
   var box = this.box;
   box.addEventListener('scroll', this.onScroll.bind(this));
};

/**
 * 构建map
 */
Miwow.prototype.buildMap = function (instances) {
   for (var i = 0; i < instances.length; i++) {
      var node = instances[i];
      var offset = { y: 0 };
      this.computeOffsetWithParent(offset, node);
      var data = node.dataset;
      data.miwowDuration && (node.style.animationDuration = data.miwowDuration);
      data.miwowDelay && (node.style.animationDelay = data.miwowDelay);
      node.classList.add("animated");
      if (offset.y > (data.miwowOffset ? (500 + data.miwowOffset) : 500)) {
         node.style.display = 'none';
      }
      this.instanceMap.push({ y: offset.y, node: node });
   }
};

/**
 * 向上遍历获取坐标
 */
Miwow.prototype.computeOffsetWithParent = function (offset, node) {
   var top = node.offsetTop;
   top && (offset.y += top);
   node.offsetParent && this.computeOffsetWithParent(offset, node.offsetParent);
};

/**
 * 释放处理
 */
Miwow.prototype.dispose = function () {
   this.instanceMap = null;
   var box = this.box;
   box.removeEventListener('scroll', this.onScroll);
};