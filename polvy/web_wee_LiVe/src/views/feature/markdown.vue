<!--
一个简单的 markdown 编辑器。
-->

<script>
import { marked } from 'marked'
import { debounce } from 'lodash-es'

export default {
  data: () => ({
    input: '## 这是一个markdown格式的笔记记录中心'
  }),
  computed: {
    output() {
      return marked(this.input)
    }
  },
  methods: {
    update: debounce(function (e) {
      this.input = e.target.value
    }, 100)
  }
}
</script>

<template>
  <div class="editor" >
    <!-- <div class="head">笔记小工具</div> -->
    <textarea class="input" :value="input" @input="update"></textarea>
    <div class="output" v-html="output"></div>
  </div>
</template>

<style>
body {
  margin: 0;
}

.editor {
  height: 100vh;
  display: flex;
}


.input,
.output {
  overflow: auto;
  width: 50%;
  height: 100%;
  margin-top:80px;
  box-sizing: border-box;
  padding: 0 20px;
}

.input {
  margin-top:70px;
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>