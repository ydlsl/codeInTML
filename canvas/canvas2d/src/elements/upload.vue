<template>
<div>
  <el-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
  <i class="el-icon-plus"></i>
  <el-upload action="#" list-type="picture-card" :auto-upload="false">
  <template #default>
    <i class="el-icon-plus"></i>
  </template>
  <template #file="{file}">
    <div>
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
  </template>
</el-upload>
<el-dialog v-model="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="" />
</el-dialog>
</div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
         options: [
          {
            value: 'HTML',
            label: 'HTML',
          },
          {
            value: 'CSS',
            label: 'CSS',
          },
          {
            value: 'JavaScript',
            label: 'JavaScript',
          },
        ],
        value: [],
      }
    },
    methods: {
      handleRemove(file) {
        console.log(file)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleDownload(file) {
        console.log(file)
      },
    },
  }
</script>