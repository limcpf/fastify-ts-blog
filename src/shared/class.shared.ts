export class defaultClass {
    printLog() {
        if(process.env.NODE_ENV === "production") return;
        const entries = Object.entries(this);
        for(const [key, value] of entries) {
            console.log(`${key}: ${value}`);
        }
    }
}