<template>
  <div>
    <el-dialog
      title="选择课程"
      :visible.sync="dialogVisible"
      width="70%"
      top="5vh"
      :modal-append-to-body="false"
      append-to-body
    >
      <el-container style="height: 71vh;margin-top: -30px;margin-bottom: -30px">
        <el-header>
          <div style="display: flex;justify-content: flex-end">
            <el-input v-model="form.title" placeholder="标题" clearable
                      style="width: 200px;margin-right: 10px" size="small"/>
            <el-button type="primary" @click="handleFilter" size="small">
              搜索
            </el-button>
          </div>
        </el-header>
        <el-container>
          <el-aside width="160px"
                    style="height: 45vh;background-color: #fbfbfb; border: 1px solid #eeeeee;padding: 0;overflow-y: auto">
            <el-menu :default-active="key" @select="onAsideSelect"
                     style="background-color: #fbfbfb; border: 0">
              <el-menu-item :index="item.index" v-for="item in menus"
                            :key="item.index">
                {{item.name}}
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-container>
            <el-main style="height: 45vh;overflow-y: auto;padding: 0">
              <el-table
                :key="tableKey"
                :data="list"
                v-loading="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%;"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"/>
                <el-table-column label="内容" min-width="150px">
                  <template slot-scope="{row}">
                    <div style="display: flex; ">
                      <img
                        :src="row.cover"
                        alt=""
                        style="width: 100px;height: 50px;margin-right: 10px;">
                      <div
                        style="display: flex;flex-direction: column;justify-content: space-between">
                        <span>{{row.title}}</span>
                        <span style="color: red">￥{{row.price}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <pagination :total="total"
                          :page.sync="form.page"
                          :limit.sync="form.limit"
                          @pagination="getData"
                          style="padding:0;padding-top: 10px;margin: 0"
                          layout="total,prev,pager,next"/>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  let M = {}

  function importAll(r) {
    r.keys().forEach(key => M[key] = r(key))
  }

  importAll(require.context('@/api/', true, /\.js$/))

  import Pagination from '@/components/Pagination'

  export default {
    name: "index",
    components: {
      Pagination
    },
    data() {
      return {
        dialogVisible: false,
        tableKey: 0,
        listLoading: true,
        multipleSelection: [],
        total: 0,
        list: [],
        form: {
          title: '',
          page: 1,
          limit: 10,
        },
        key: 'media',
        menus: [
          {
            name: '图文',
            index: "media"
          }, {
            name: '音频',
            index: "audio"
          }, {
            name: '视频',
            index: "video"
          }
        ],
        callback: null,
        limit: -1,
      }
    },
    methods: {
      getData() {
        this.listLoading = true
        let fetch = M[`./${this.key}.js`].fetchList
        fetch(this.form).then(res => {
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        })
      },

      confirm() {
        if (this.multipleSelection.length === 0) {
          return this.$message.error('至少需要选中1个')
        }
        if (this.limit !== -1 && this.multipleSelection.length > this.limit) {
          return this.$message.error(`最多只能选中${this.limit}个`)
        }

        this.callback(this.multipleSelection)
        this.dialogVisible = false
        // 清空选中
        this.$refs.multipleTable.clearSelection()
      },
      open(callback, limit = -1) {
        this.callback = callback
        this.limit = limit
        this.getData()
        this.dialogVisible = true
      },
      handleFilter() {
        this.form.page = 1
        this.getData()
      },
      onAsideSelect(e) {
        this.key = e
        this.form.page = 1
        this.getData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style scoped>

</style>
