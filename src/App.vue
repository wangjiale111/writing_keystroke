<template>
    <div class="record">
        <div class="writing">
            <div class="title">
                <span>题目：xxxxxxxxxxxxxxxxx</span>
            </div>
            <div class="header">
                <div>时间:{{ timeFormat }}</div>
                <div style="margin-left: 80px">字数:{{ wordNum }}</div>
            </div>
            <el-input
                    type="textarea"
                    :rows="10"
                    v-model="value"
                    :disabled="disable"
                    @input="handleInput"
                    @keydown="handleKeyDown($event)"
            ></el-input>
            <div class="button">
                <el-button type="primary" @click="confirmStartWriting" :disabled="disable2">开始写作</el-button>
                <el-button type="danger" @click="confirmEndWriting" style="margin-left: 80px;">结束写作</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { Vue } from "vue-class-component";
import { DomEventRecord } from "@/record";
import  {ElMessageBox, Message } from 'element-plus';

let recordData: any;

@Options({
})
export default class WritingRecord extends Vue {

    domRecord: any;
    value = '';
    replayData: any[] = [];
    // 设置时间
    timeFormat =  '20分00秒';
    flag = false;
    wordNum = 0;
    disable = true;
    // 设置时间,与timeFormat同步
    time = 1200;
    disable2 = false;
    writingData: any[] = [];

    /**
     * toStart  开始录制 1.计时器计算时间  2.监听输入框的值 3.调用recordUserViewModel方法
     */
    toStart() {
        console.log("record开始")
        this.disable = false;
        this.disable2 = true;
        // 计时器计算时间
        this.flag = false;
        this.value = '';
        const timer = setInterval(() => {
            if (this.flag || this.time <= 0) {
                clearInterval(timer);
                if (this.time <= 0) {
                    this.time = 0;
                    ElMessageBox.alert("写作时间已到！", "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: () => {
                            this.toStop();
                        }
                    });
                }
            } else {
                this.time--;
                const min = Math.floor(this.time / 60);
                const sec = this.time % 60;
                this.timeFormat = `${min}分${sec}秒`;
            }
        }, 1000);

        this.domRecord = new DomEventRecord();
        this.domRecord.startRecord((log: any) => {
            this.writingData.push(log);
        });
    }

    confirmStartWriting() {
        ElMessageBox.confirm("是否开始写作?", "提示", {
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
        ElMessageBox.confirm("是否结束写作?", "提示", {
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
     * toStop  结束录制 1.调用stopRecord方法 2.将数据存入recordData
     */
    toStop() {
        console.log("点击提交，结束录制")
        this.disable = true;
        this.flag = true;
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



