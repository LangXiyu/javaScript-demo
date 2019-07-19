<template>
    <div class="home">
        <!-- @ondragover="allowDrop(event)"  ondragover 事件规定在何处放置被拖动的数据 -->
        <!-- @drop="drop" 当放置被拖数据时,会触发 drop 事件 -->
        <div class="div1"
             @drop="drop"
             @ondragover="allowDrop(event)"
             @dragover.prevent></div>

        <br>

        <div class="div1"
             @drop="drop"
             @ondragover="allowDrop(event)"
             @dragover.prevent></div>

        <br>

        <!-- draggable="true" 设置元素可拖动 -->
        <!-- @dragstart="drag" 元素可拖动时触发 'drag'函数 -->
        <img id="drag1"
             src="https://i.loli.net/2019/07/12/5d282d804c39377672.jpg"
             draggable="true"
             @dragstart="drag"
             width="336"
             height="69">

    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {}
        },
        methods: {
            allowDrop: function(ev) {
                // 阻止对元素的默认处理方式：默认是无法将数据/元素放置到其他元素中。如果允许,我们必须阻止对元素的默认处理方式
                ev.preventDefault();
            },

            drag: function(ev) {
                // dataTransfer.setData() 方法设置被拖数据的数据类型和值
                ev.dataTransfer.setData("Text", ev.target.id);
            },

            drop: function(ev) {
                ev.preventDefault(); // 避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
                let data = ev.dataTransfer.getData("Text"); // 返回在 setData() 方法中设置为相同类型的数据
                ev.target.appendChild(document.getElementById(data)); // 把被拖元素追加到放置元素（目标元素）中
            },
        }
    };
</script>

<style scoped type="text/css">
.home {
    margin-top: 200px;
}
.div1 {
    width:350px;
    height:70px;
    margin: auto;
    padding:10px;
    border:1px solid #aaaaaa
}
</style>
