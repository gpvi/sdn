<template>
  <div>
    <!-- 2.banner部分start -->
    <div class="banner">
      <!-- logo部分 -->
      <div class="logo">
        <img src="../../static/logo.png" width="36px" height="auto" />
      </div>
      <div>
        <p>
          随便填的队
          <br />
          基于ryu控制的校园网管理系统
        </p>
      </div>
      <div class="out">
        <router-link to="/">
          <img src="../../static/out.png" width="24px" height="auto" />
        </router-link>
      </div>
    </div>
    <div class="w">
      
      <!-- 左侧subnav模块 -->
      <div class="subnav">
        <ul>
          <li>
            <router-link to="daorumoren">导入默认拓扑 </router-link>
          </li>
          <li>
            <router-link to="addzhuji">增加主机 </router-link>
          </li>
          <li>
            <router-link to="addjiaohuanji"
              >增加交换机 </router-link>
          </li>
          <li>
            <router-link to="addlianlu"
              >添加链路 </router-link>
          </li>
          <li>
            <router-link to="delzhuji"
              >删除主机 </router-link>
          </li>
          <li >
            <router-link to="deljiaohuanji"
              >删除交换机 </router-link>
          </li>
          <li>
              <router-link to="dellianlu"
              >删除链路 </router-link>
          </li>
          <li id="a">
              <router-link to="shengcheng"
              >由拓扑文件生成拓扑图</router-link>
          </li>
          <li>
              <router-link to="jianli"
              >建立拓扑 </router-link>
          </li>
        </ul>
      </div>
      <!-- 主功能区 -->
      <div class="main">

        <div id="phtitle">导入默认拓扑</div>
        <div id="line"></div>
        <el-button round id="addtuopu" @click="created">导入默认拓扑</el-button>
        <div id="daoru" v-show="this.show===1">
            默认拓扑导入成功！拓扑参考图：
           <img src="../../static/morentuopu.png" id="morentuopu">
        </div>

      </div>
    </div>
  </div>
</template>
      
      <script>
      import axios from "axios";
  export default {
    data() {
      return {
        show:-1,
      };
    },
    methods:{
      changeshow(){
        this.show=1;
      },
      created() {
                const that=this;
                console.log("abbbbba");
                //axios.post('http://192.168.73.129:5001/default')
                axios.post('http://localhost:5001/default')
                .then(function(response) {
                  console.log(response.data);
                  console.log("aaaaaa");
                });
            },
    }
   
  }
</script>
      
<style>
* {
  margin: 0;
  padding: 0;
}
.banner {
  height: 40px;
  background-color: #90c2de;
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 0;
  left: 0px;
  top: 0px;
  width: 100%;
}
.banner p {
  float: left;
  color: rgb(61, 145, 213);
  font-size: 12px;
  margin-left: -150px;
  padding-top: 5px;
}
.logo {
  margin-top: 2px;
  margin-left: 10px;
  float: left;
  width: 198px;
  height: 42px;
}
.out {
  margin-top: 9px;
  margin-right: -18px;
  float: right;
  width: 50px;
  height: 100px;
}
.w {
  width: 1600px;
  margin: auto;
}

/*边栏*/
.subnav {
  margin-top: 30px;
  float: left;
  width: 165px;
  height: 100%;
  background-color: #090f57e4;
  position: fixed;
}
.subnav ul li {
  text-align: center;
  font-size: 24px;
  height: 42px;
  line-height: 60px;
  padding-left: 15px;
  padding-right: 10px;
}
.subnav ul li a {
  font-size: 14px;
  color: #fff;
}
.subnav ul li a:hover {
  color: #00a4ff;
}
body {
  background-color: #d3dae1;
  height: 800px;
  position: relative;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.header {
  height: 800px;
  margin: 30px auto;
}

/* sidebar 侧边栏区域 */
.sidebar {
  width: 450px;
  height: 175px;
  background-color: #fff;
  position: absolute;
  top: 50px;
  left: 300px;
}
.sidebar ul {
  padding: 25px;
}
.sidebar ul li {
  margin-bottom: 30px;
  font-size: 25px;
}
.sidebar ul li a:hover {
  background-color: aqua;
  color: #00a4ff;
}
.main {
  margin-top: 40px;
  margin-left: 165px;
  width: 100%;
  height: 100%;
  float: right;
  position: fixed;
}
#addtuopu{
  margin-top: 30px;
  margin-left: 25px;
}
#daoru{
  margin-left: 30px;
  margin-top: 20px;
  width: 1000px;
  height: 650px;
  font-size: 35px;
}
#morentuopu{
  margin-top: 10px;
  width: 800px;
}
#phtitle{
  margin-top: 40px;
  margin-left: 30px;
  width: 100%;
  height: 70px;
  font-size: 50px;
  line-height: 70px;
}
#line{
  width: 75%;
  margin-top: 5px;
  margin-left: 25px;
  height: 1px;
  background-color: #757575;
}
</style>