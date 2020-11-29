import {Repository, Transaction, TransactionRepository} from "typeorm/index";
import {Context} from "koa";
import {TransformRule} from "../entity/TransformRule";
import {PageInfo} from "../entity/PageInfo";
import {TransformRuleVo} from "../entity/TransformRuleVo";
import {RuleCollectorVersionMapping} from "../entity/RuleCollectorVersionMapping";
import {CollectorVersionItem} from "../entity/CollectorVersionItem";

export class TransformRuleController {

    @Transaction("tmore")
    async saveTransformRule(context: Context, @TransactionRepository(TransformRule) transformRuleRepository: Repository<TransformRule>) {

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

        await transformRuleRepository
            .createQueryBuilder()
            .insert()
            .into(TransformRule)
            .values([transformRule])
            .execute();

        context.throw(500, 'INTERNAL ERROR')

        context.body = {success: true, status: 200};
    }

    @Transaction("tmore")
    async findTransformRule(context: Context,
                            @TransactionRepository(TransformRule) transformRuleRepository: Repository<TransformRule>,
                            @TransactionRepository(RuleCollectorVersionMapping) ruleCollectorVersionMappingRepository: Repository<RuleCollectorVersionMapping>) {

        const transformRuleList: TransformRule[] = await transformRuleRepository
            .createQueryBuilder()
            .select("id")
            .addSelect("rule_name", "ruleName")
            .addSelect("rule_type_id", "ruleTypeId")
            .addSelect("state")
            .getRawMany();

        const transformRuleVoList: TransformRuleVo[] = new Array(transformRuleList.length);
        let tr: TransformRule;
        for (let i = 0; i < transformRuleList.length; i++) {
            tr = transformRuleList[i];
            const relatedCollectorVersionIdList: RuleCollectorVersionMapping[] = await ruleCollectorVersionMappingRepository
                .createQueryBuilder("rcvm")
                // .select("collector_version_id", "collectorVersionId")
                .where("rcvm.transform_rule_id = :transformRuleId", {transformRuleId: tr.id})
                .getMany();
            transformRuleVoList[i] = new TransformRuleVo(
                tr.id, tr.ruleName, tr.ruleTypeId, tr.state, relatedCollectorVersionIdList.map(each => new CollectorVersionItem(each.collectorVersionId, null))
            );
        }

        context.body = {success: true, status: 200, data: new PageInfo(transformRuleVoList)};
    }
}