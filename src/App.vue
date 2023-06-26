<template>
    <div class="record">
        <div class="writing">
            <el-input
                    type="textarea"
                    :rows="10"
                    v-model="value"
                    :disabled="disable"
                    @input="handleInput"
                    @keydown="handleKeyDown($event)"
            ></el-input>
            <div class="button">
                <el-button type="primary" @click="confirmStartWriting" :disabled="disableStart">开始</el-button>
                <el-button type="danger" @click="confirmEndWriting" style="margin-left: 80px;">结束</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { Vue } from "vue-class-component";
import { DomEventRecord } from "@/record";
import  {ElMessageBox} from 'element-plus';

let recordData: any;

@Options({
})
export default class WritingRecord extends Vue {

    domRecord: any;
    value = '';

    disable = true;
    disableStart = false;
    writingData: any[] = [];

    /**
     * toStart  开始录制,调用startRecord方法,录制的每一条数据都在this.writingData中
     */
    toStart() {
        console.log("record开始")
        this.disable = false;
        this.disableStart = true;
        this.value = '';
        this.domRecord = new DomEventRecord();
        this.domRecord.startRecord((log: any) => {
          console.log(log)
            this.writingData.push(log);
        });
    }

    confirmStartWriting() {
        ElMessageBox.confirm("是否开始?", "提示", {
            confirmButtonText: "开始",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
                this.toStart();
            })
            .catch(() => {
                // 取消开始写作
            });
    }

    confirmEndWriting() {
        ElMessageBox.confirm("是否结束?", "提示", {
            confirmButtonText: "结束",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
                this.toStop();
            })
            .catch(() => {
                // 取消结束写作
            });
    }

    /**
     * toStop  结束录制,调用stopRecord方法
     */
    toStop() {
        console.log("点击提交，结束录制")
        this.disable = true;
        this.disableStart = false;
        recordData = this.domRecord.stopRecord((log: any) => {
            console.log(log);
        });
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



