import {Context} from "koa";
import {getConnection, getManager, Repository} from "typeorm";
import {TransformRule} from "../entity/TransformRule";
import {Transaction, TransactionManager, TransactionRepository} from "typeorm/index";

export async function saveTransformRule(context: Context) {

    const bodyParams: any = context.request.body;
    const {ruleName, ruleTypeId, ruleDesc} = bodyParams;

    const transformRule = new TransformRule();
    transformRule.ruleName = ruleName;
    transformRule.ruleTypeId = ruleTypeId;
    transformRule.ruleDesc = ruleDesc;
    transformRule.createBy = '001';
    transformRule.updateBy = '001';
    transformRule.domainId = 'D1';
    console.log(transformRule);

    await getConnection("tmore")
        .createQueryBuilder()
        .insert()
        .into(TransformRule)
        .values([transformRule])
        .execute();

    context.throw(500, 'INTERNAL ERROR')

    context.body = {success: true, status: 200};
}