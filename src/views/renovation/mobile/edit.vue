<template>
  <div style="padding: 20px 30px;background-color: #eeeeee">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card style="height: 80vh">
          <div slot="header" class="clearfix">
            <div>组件列表</div>
            <small style="font-size: 10px;color: #bbbbbb">点击组件添加至页面</small>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in components" :key="index"
                    style="margin-bottom: 18px">
              <el-card shadow="hover"
                       :body-style="{padding: '15px 8px','cursor':'pointer'}"
                       @click.native="handleComponent(item)">
                <div
                  style="display: flex;align-items: center;justify-content: center">
                  <i :class="item.icon"
                     style="font-size: 25px;color: #13ce66;margin-right: 8px"/>
                  <span style="font-size: 13px">{{item.title}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="min-height: 80vh;overflow: inherit"
                 :body-style="{padding: '10px 8px'}">
          <img src="./status.png" alt=""
               style="width: 100%;margin-bottom: 10px">

          <div style="margin-left: -10px;margin-right: -10px;">
            <div class="checked-box"
                 v-for="(item,index) in templates" :key="item.id"
                 :class="item.checked ? 'checked-box-active':''"
                 @click="handleCheckedComponent(item)">
              <!--操作按钮-->
              <div class="checked-box-btn" v-if="item.checked">
                <i class="el-icon-top"
                   :class="index === 0? 'i-disabled': ''"
                   @click.stop="moveUp(index)"/>
                <i class="el-icon-bottom"
                   :class="index === templates.length - 1? 'i-disabled': ''"
                   @click.stop="moveDown(index)"/>
                <i class="el-icon-delete" @click.stop="deleteComponent(index)"/>
              </div>
              <!--组件-->
              <template v-if="item.type==='search'">
                <search-bar :placeholder="item.placeholder"></search-bar>
              </template>
              <template v-else-if="item.type === 'list'">
                <list :title="item.title" :show-more="item.showMore"
                      :list="item.data" :listType="item.listType"/>
              </template>
              <template v-else-if="item.type === 'swiper'">
                <swiper :list="item.data"/>
              </template>
              <template v-else-if="item.type === 'icons'">
                <icons :list="item.data"/>
              </template>
              <template v-else-if="item.type === 'coupon'">
                <coupon :list="item.data"/>
              </template>
              <template v-else-if="item.type === 'promotion'">
                <promotion :title="item.title"
                           :list="item.data" :listType="item.listType"/>
              </template>
              <template v-else-if="item.type === 'imageAd'">
                <image-ad :list="item.data"/>
              </template>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-show="currentComponent.type && currentComponent.type !== 'coupon'"
         style="position: fixed;right: 120px;top: 100px">
      <el-card class="box-card"
               style="width:600px;height: 80vh;position: relative">
        <div slot="header" class="clearfix">
          <span>组件编辑</span>
        </div>
        <div
          style="overflow-y: auto;position: absolute;left: 0;right: 0;bottom: 0;top: 60px">
          <component-form form-type="search" ref="componentForm"
                          :form-type="currentComponent.type"
                          @change="onCurrentComponentChange"/>
        </div>
      </el-card>
    </div>

    <el-button type="primary"
               style="position:fixed;right: 5px;top: 90px;z-index: 1000">保存
    </el-button>
  </div>
</template>

<script>
  import util from "@/utils/util";
  import SearchBar from './components/search-bar'
  import componentForm from './components/component-form'
  import List from './components/list'
  import Swiper from './components/swiper'
  import icons from './components/icons'
  import coupon from './components/coupon'
  import promotion from './components/promotion'
  import imageAd from './components/imageAd'

  export default {
    name: "edit",
    components: {
      SearchBar,
      componentForm,
      List,
      Swiper,
      icons,
      coupon,
      promotion,
      imageAd
    },
    computed: {
      currentComponent() {
        const i = this.templates.findIndex(v => v.checked)
        return this.templates[i] || {}
      }
    },
    data() {
      return {
        components: [
          {
            icon: 'el-icon-s-order',
            title: '课程列表',
            type: 'list',
            default: {
              listType: 'one',
              title: '最新列表',
              showMore: true,
              more: false,
              data: [{
                id: 1,
                title: '测试标题1',
                cover: '',
                price: 10,
                t_price: 20
              }, {
                id: 2,
                title: '测试标题2',
                cover: '',
                price: 10,
                t_price: 20
              }]
            }
          }, {
            icon: 'el-icon-search',
            title: '搜索框',
            type: 'search',
            default: {
              placeholder: '请输入关键字'
            }
          }, {
            icon: 'el-icon-s-help',
            title: '轮播图',
            type: 'swiper',
            default: {
              data: []
            }
          }, {
            icon: 'el-icon-menu',
            title: '图标分类',
            type: 'icons',
            default: {
              data: [
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类',
                  type: '',
                  url: '',
                  page_id: 0,
                  page_title: "",
                  course_title: "",
                  course_id: "",
                },
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类',
                  type: '',
                  url: '',
                  page_id: 0,
                  page_title: "",
                  course_title: "",
                  course_id: "",
                },
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类',
                  type: '',
                  url: '',
                  page_id: 0,
                  page_title: "",
                  course_title: "",
                  course_id: "",
                },
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类',
                  type: '',
                  url: '',
                  page_id: 0,
                  page_title: "",
                  course_title: "",
                  course_id: "",
                },
              ]
            }
          }, {
            icon: 'el-icon-s-finance',
            title: '优惠券',
            type: 'coupon',
            default: {
              data: [{
                price: 100,
                condition: '满200可用'
              }, {
                price: 100,
                condition: '满200可用'
              }, {
                price: 100,
                condition: '满200可用'
              }, {
                price: 100,
                condition: '满200可用'
              }]
            }
          }, {
            icon: 'el-icon-s-order',
            title: '限时拼团',
            type: 'promotion',
            default: {
              listType: 'group',
              title: '拼团',
              data: []
            }
          }, {
            icon: 'el-icon-picture-outline',
            title: '图片广告',
            type: 'imageAd',
            default: {
              data: []
            }
          },
        ],
        templates: []
      }
    },
    methods: {
      // 点击组件
      handleComponent(item) {
        let data = JSON.parse(JSON.stringify(item.default))
        data.checked = false
        data.type = item.type
        this.templates.push(data)
      },

      // 选中组件
      handleCheckedComponent(item) {
        this.templates.map(v => {
          v.checked = false
          return v
        })
        item.checked = true
        this.$refs.componentForm.initVal(item)
      },

      deleteComponent(index) {
        this.$confirm('是否要删除该组件', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.templates.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      },
      moveUp(index) {
        if (index === 0) return 0
        util.moveUp(this.templates, index)
      },
      moveDown(index) {
        if (index === this.templates.length - 1) return
        util.moveDown(this.templates, index)
      },
      onCurrentComponentChange(data) {
        const i = this.templates.findIndex(v => v.checked)
        if (i !== -1) {
          this.templates[i][data.key] = data.value
        }
      }
    }
  }
</script>

<style scoped>
  .checked-box {
    cursor: pointer;
    position: relative;
  }

  .checked-box-active {
    border: 2px dotted #2196f3;
    padding: 5px 0;
    margin-bottom: 10px;
  }

  .checked-box-btn {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border: 2px dotted #2196f3;
    right: -29px;
    top: -2px;
    z-index: 999;
    border-left-width: 0;
  }

  .checked-box-btn i {
    padding: 4px 6px;
    color: #2196f3;
    font-weight: bold;
  }

  .checked-box-btn i:hover {
    background-color: #eeeeee;
  }

  .checked-box-btn .i-disabled {
    background-color: #ffffff;
    cursor: no-drop;
    color: #bbbbbb;
  }
</style>
