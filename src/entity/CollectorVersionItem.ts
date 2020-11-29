export class CollectorVersionItem {

    constructor(private collectorVersionId: number, private versionInfo: string) {
        this.collectorVersionId = collectorVersionId;
        this.versionInfo = versionInfo;
    }

    public setCollectorVersionId(collectorVersionId: number): void {
        this.collectorVersionId = collectorVersionId;
    }

    public setVersionInfo(versionInfo: string): void {
        this.versionInfo = versionInfo;
    }
}