<template>
    <div class="record">
        <div class="writing">
            <el-input
                    type="textarea"
                    :rows="10"
                    v-model="value"
                    @input="handleInput"
                    @keydown="handleKeyDown($event)"
            ></el-input>
            <div class="button">
                <el-button type="primary" @click="toStart" >开始</el-button>
                <el-button type="danger" @click="toStop" >结束</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { Vue } from "vue-class-component";
import { DomEventRecord } from "@/EventRecord";

let recordData: any;

@Options({
})
export default class WritingRecord extends Vue {

    domRecord: any;
    value = '';
    writingData: any[] = [];

    /**
     * toStart  开始录制 1.计时器计算时间  2.监听输入框的值 3.调用recordUserViewModel方法
     */
    toStart() {
        console.log("record开始")
        this.domRecord = new DomEventRecord();
        this.domRecord.startRecord((log: any) => {
           console.log(log);
            this.writingData.push(log);
        });
    }

    /**
     * toStop  结束录制 1.调用stopRecord方法 2.将数据存入recordData
     */
    toStop() {
        console.log("点击提交，结束录制")
        this.domRecord.stopRecord((log: any) => {
            console.log(log);
        });
      console.log(this.writingData)
    }

    /**
     * handleInput  监听输入框的值
     */
    handleInput() {
        // console.log()
    }

    /**
     * handleKeyDown  监听按键Tab
     */
    handleKeyDown(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault(); // 阻止默认的焦点切换行为
            const inputValue = this.value;
            const tabCharacter = '\t';
            this.value = inputValue + tabCharacter;
        }
    }

}
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0; /* 添加背景色 */
    padding: 10px 20px; /* 添加内边距 */
    font-family: Arial, sans-serif; /* 修改字体 */
    font-size: 16px; /* 修改字体大小 */
    color: #333; /* 修改字体颜色 */
    width: 800px;
}

.title{
    margin-bottom: 30px;
    font-size: 20px;
}

.button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    margin-top: 20px;
}

.record {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.writing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 800px;
}

</style>



