import {CollectorVersionItem} from "./CollectorVersionItem";

export class TransformRuleVo {

    constructor(public transformRuleId: number,
                public ruleName: string,
                public ruleTypeId: number,
                public state: number,
                public collectorVersionIdList: CollectorVersionItem[]) {

        this.transformRuleId = transformRuleId;
        this.ruleName = ruleName;
        this.ruleTypeId = ruleTypeId;
        this.state = state;
        this.collectorVersionIdList = collectorVersionIdList;
    }
}