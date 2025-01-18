class Debugger {
    constructor() {
        this.objectsInfo = [];
    }

    add(object) {
        this.objectsInfo.push(object.info());
    }

    getDebugInfo() {
        return this.objectsInfo;
    }
}