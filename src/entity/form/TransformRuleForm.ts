import {TransformRule} from "../TransformRule";

export class TransformRuleForm {

    private ruleName: string;
    private ruleTypeId: number;
    private ruleDesc: string;

    convertToPo(): TransformRule {
        const transformRule = new TransformRule();
        transformRule.ruleName = this.ruleName;
        transformRule.ruleTypeId = this.ruleTypeId;
        transformRule.ruleDesc = this.ruleDesc;
        return transformRule;
    }
}