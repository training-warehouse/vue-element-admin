<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="占位提示" v-if="formType === 'search'">
        <el-input v-model="search.placeholder" style="width:400px"
                  @input="handleChange('placeholder')"/>
      </el-form-item>

      <template v-else-if="formType === 'list'">
        <el-form-item label="类型">
          <el-radio-group v-model="list.listType"
                          @change="handleChange('listType')">
            <el-radio label="one">单栏</el-radio>
            <el-radio label="two">双栏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="list.title" style="width:400px"
                    @input="handleChange('title')"/>
        </el-form-item>
        <el-form-item label="更多">
          <el-radio-group v-model="list.showMore"
                          @change="handleChange('showMore')">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="更多链接">
          <el-button type="default" size="mini">{{list.more?list.more:'选择页面'}}
          </el-button>
        </el-form-item>
        <el-form-item label-width="0">
          <div class="choose-source-btn">
            <el-button type="text" icon="el-icon-circle-plus-outline"
                       @click="handleChooseCourse">
              关联课程
            </el-button>
            <span>最多关联10门</span>
          </div>
        </el-form-item>
        <drag-course :list="list.data" @del="deleteCourse"/>
      </template>

      <template v-else-if="formType === 'swiper'">
        <el-form-item label-width="0">
          <div class="choose-source-btn">
            <el-button type="text" icon="el-icon-circle-plus-outline"
                       @click="createSwiper">
              新增轮播图
            </el-button>
            <span>最多5张</span>
          </div>
        </el-form-item>
        <drag-swiper :list="swiper.data" @del="deleteSwiper"/>
      </template>
    </el-form>
    <choose-course ref="chooseCourse"/>
    <upload-image ref="uploadImage"/>
  </div>
</template>

<script>
  import dragCourse from './drag-course'
  import dragSwiper from './drag-swiper'
  import ChooseCourse from '@/components/chooseCourse/index'
  import uploadImage from './upload-image'

  export default {
    name: "component-form",
    components: {dragCourse, ChooseCourse, dragSwiper, uploadImage},
    props: {
      formType: {
        type: String,
        default: ''
      }
    },
    provide() {
      return {
        componentForm: this
      }
    },
    data() {
      return {
        search: {
          placeholder: ''
        },
        list: {
          listType: 'one',
          title: '',
          showMore: true,
          more: false,
          data: []
        },
        swiper: {
          data: []
        }
      }
    },
    methods: {
      createSwiper() {
        if (this.swiper.data.length === 5) {
          return this.$message({
            type: 'error',
            message: '最多只能创建5个'
          })
        }

        this.swiper.data.push({
          src: '',
          type: '',
          course_title: '',
          course_id: '',
          url: ''
        })
      },
      deleteSwiper(index) {
        this.$confirm('是否要删除轮播图', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
            this.swiper.data.splice(index, 1)
            this.$message({
              message: '删除轮播图成功',
              type: 'success'
            })
          }
        )
      },
      deleteCourse(item) {
        this.$confirm('是否要取消关联该课程', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
            let i = this[this.formType].data.findIndex(v => v.id === item.id)
            if (i !== -1) {
              this[this.formType].data.splice(i, 1)
              this.$message({
                message: '取消关联成功',
                type: 'success'
              })
            }
          }
        )
      },

      handleChooseCourse() {
        this.$refs.chooseCourse.open(val => {
          this[this.formType].data = [...this[this.formType].data, ...val]
          this.handleChange('data')
        }, 10)
      },

      initVal(val) {
        for (let k in val) {
          this[val.type][k] = val[k]
        }
      },
      handleChange(key) {
        this.$emit('change', {
          key,
          value: this[this.formType][key]
        })
      }
    }
  }
</script>

<style scoped>
  .choose-source-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dotted #13ce66;
  }

  .choose-source-btn span {
    color: #888888;
    font-size: 12px;
  }
</style>
