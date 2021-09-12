<template>
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
          <el-button type="text" icon="el-icon-circle-plus-outline">关联课程
          </el-button>
          <span>最多关联10门</span>
        </div>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
  export default {
    name: "component-form",
    props: {
      formType: {
        type: String,
        default: ''
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
        }
      }
    },
    methods: {
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
