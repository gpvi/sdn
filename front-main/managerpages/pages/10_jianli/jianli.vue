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

        <div id="tops">
          <div class="top" @click="change(1)">查看当前拓扑图</div>
          <div class="top" @click="change(2)">查看拓扑中的交换机与流表</div>
          <div class="top" @click="change(3)">删除指定交换机的所有流表</div>
          <div class="top" @click="change(4)">以文件形式提交流表项</div>
          <div class="top" @click="change(5)">添加流表项</div>
        </div>

        <!-- page1 -->
        <div class="main2" v-show="this.page==1">
          <video src="../../static/car.mp4" autoplay="autoplay" loop="loop" id="tuoputu">当前浏览器不支持video标签</video>
        </div>

        <!-- page2 -->
        <div class="main2" v-show="this.page==2">
            <div class="dpid">dpid(点击dpid可查看交换机中的流表)</div>
            <div class="jhjs" v-for="(item,index) in jhjs" @click="choosejhj(index)">
                  {{jhjs[index].name}}
            </div>
            <div id="cntjhj">当前拓扑共有：{{jhjs.length}}台交换机
              <el-button round id="jhjrefresh" @click="jhjrefresh">刷新</el-button>
            </div>
            <div id="cntliubiao" v-show="chose!=0">
              dpid: {{jhjs[jhj].name}}中有{{jhjs[jhj].liubiao.length}}条流表
            </div>
            <div v-for="(item,index) in jhjs[jhj].liubiao" v-show="chose!=0">
              <div class="lb">
                第{{index+1}}条流表
            </div>
            <div class="lbs">
                {{jhjs[jhj].liubiao[index]}}
            </div>   
            </div>
        </div>
        <!-- page3 -->
        <div class="main2" v-show="this.page==3">
            <div class="dpid">dpid(点击交换机即可删除)</div>
            <div class="jhjs" v-for="(item,index) in jhjs" @click="opendel(index)">
                  {{jhjs[index].name}}
            </div>
            <div id="cntjhj">当前拓扑共有：{{jhjs.length}}台交换机</div>
        </div>
        <!-- page4 -->
        <div class="main2" v-show="this.page==4">
            <div class="addlb">请上传JSON文件</div>
            <div id="upload">
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传JSON文件，且不超过500kb</div>
              </el-upload>
              <el-button round id="wenjian" @click="openjson">提交</el-button>
            </div>
            
        </div>
        
        <!-- page5 -->
        <div class="main2" v-show="this.page==5">
            <div class="addlb">添加流表项</div>
            <el-input
                id="newlb"
                type="textarea"
                :rows="20"
                placeholder="请输入内容"
                v-model="newliubiao">
            </el-input>
            <el-button round id="addbt" @click="openadd">提交</el-button>
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
        newliubiao:"",
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        jhj:0,
        chose:0,
        page:0,
        jhjs:[
          {
            name:"h1",
            liubiao:[
              "1111111",
              "2222222",
              "3333333",
              "4444444",
              "5555555",
            ]
          },
          {
            name:"h2",
            liubiao:[
              "11852411",
              "2165165222",
              "684653333",
              "44498464",
              "54946516555",
              "66684684",
            ]
          },
          {
            name:"h3",
            liubiao:[
              "kyiyjdad411",
              "dawd5222",
              "grgdthg4653333",
            ]
          },
        ],
      };
    },
    methods:{
      jhjrefresh(){
        this.chose=0;
      },
      change(i){
        this.page=i;
      },
      choosejhj(i){
        this.jhj=i;
        this.chose=1;
      },
      delliubiao(i){
        this.jhjs[i].liubiao.splice(0,this.jhjs[i].liubiao.length);
      },
      opendel(i){
        this.$confirm('此操作将删除指定交换机的所有流表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delliubiao(i),
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      openadd() {
        this.$alert('流表已添加', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      },
      openjson() {
        this.$alert('流表已添加', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
  },
  
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
.subnav ul li a{
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
.top:hover{
  color: #23adf7;
}
.main {
  margin-top: 40px;
  margin-left: 165px;
  width: 100%;
  height: 100%;
  float: right;
  position: fixed;
}
#tableHeader{
  margin-top: 20px;
  width: 1200px;
  height: 50px;
}
#livetitle{
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
.tableLine{
  width: 1200px;
  margin-top: 5px;
  margin-left: 25px;
  height: 1px;
  background-color: #b5b5b5;
}
.TH{
  float: left;
  width: 400px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: 600;
}
.liveinfo{
  width: 400px;
  height: 50px;
  float: left;
  line-height: 50px;
  text-align: center;
  color: #494949;
}
.dellive
{
  width: 400px;
  height: 50px;
  float: left;
}
#newlive{
  margin-top: 70px;
  margin-left: 200px;
  width: 800px;
  height: 200px;
}
.explain{
  margin-bottom: 20px;
  float: left;
  width: 180px;
  height: 40px;
  font-size: 30px;
  line-height: 40px;
  font-weight: bold;
}
.new{
  margin-bottom: 20px;
  float: left;
  width: 620px;
  height: 50px;
}
#livebutton{
  width: 200px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
}
#tops{
  width: 100%;
  height: 50px;
  background-color: white;
}
.top{
  float: left;
  width: 17.5%;
  height: 50px;
  border-style:solid;
  border-width:1px;
  line-height: 50px;
  text-align: center;
  font-size: large;
}
.main2{
  width: 100%;
  height: 100%;
}
#tuoputu{
  margin-top: 100px;
  margin-left: 400px;
  background-color: black;
}
.jhjs{
  width: 800px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  margin-left: 300px;
  border-style:solid;
  border-width:1px;
  background-color: rgb(255, 255, 255);
  padding-left: 15px;
}
.dpid{
  width: 810px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  margin-top: 50px;
  margin-left: 300px;
  background-color: rgb(242, 252, 255);
  border-style:solid;
  border-width:1px;
  padding-left: 5px;
}
#cntjhj{
  width: 810px;
  height: 45px;
  font-size: 20px;
  line-height: 45px;
  margin-left: 300px;
  background-color: rgb(242, 252, 255);
  border-style:solid;
  border-width:1px;
  padding-left: 5px;
  margin-bottom: 10px;
}
#cntliubiao{
  width: 810px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  margin-left: 300px;
  background-color: rgb(255, 255, 255);
  border-style:solid;
  border-width:1px;
  padding-left: 5px;
}
#jhjrefresh{
  float: right;
  margin-top: 3px;
  margin-right: 10px;
}
.lbs{
  width: 800px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  margin-left: 300px;
  border-style:solid;
  border-width:1px;
  background-color: white;
  padding-left: 15px;
}
.lb{
  width: 810px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  margin-left: 300px;
  background-color: rgb(242, 252, 255);
  border-style:solid;
  border-width:1px;
  padding-left: 5px;
}
#newlb{
  width: 810px;
  margin-left: 300px;
  border: black solid 1px;
}
.addlb{
  width: 803px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  margin-top: 50px;
  margin-left: 300px;
  background-color: rgb(242, 252, 255);
  border-style:solid;
  border-width:1px;
  padding-left: 5px;
}
#addbt{
  margin-top: 10px;
  margin-left: 300px;
}
#upload{
  width: 810px;
  height: 500px;
  margin-left: 300px;
  margin-top: 15px;
}
#wenjian{
  margin-top: 50px;
}
</style>