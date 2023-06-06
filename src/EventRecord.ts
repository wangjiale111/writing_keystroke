import EventRecord from './record';

export class DomEventRecord {

    record!: EventRecord;

    constructor() {
        (window as any).playbackInProgress = false;
        (window as any).recordInProgress = false;
    }

    /**
     *
     * @param progressCall 实时录制的回调函数，会把EventLog返回，
     */
    startRecord(progressCall:any) {
        this.record = new EventRecord(progressCall);

        this.record.start();
    }

    /**
     * 停止录制并返回录制数据
     * @returns 返回所有EventLog 数组
     */
    stopRecord(p: (log: any) => void) {
        return this.record.stop();
    }


}
