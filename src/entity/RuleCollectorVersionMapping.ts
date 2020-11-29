import {CreateDateColumn, Entity, Index, ManyToOne, PrimaryColumn} from "typeorm/index";
import {TransformRule} from "./TransformRule";
import {TransformRuleVo} from "./TransformRuleVo";

@Entity("t_rule_collector_version_mapping")
export class RuleCollectorVersionMapping {

    @PrimaryColumn({name: "transform_rule_id", unsigned: true, default: 0, comment: "t_transform_rule主键id"})
    @Index("idx_transform_rule_id")
    transformRuleId: number;

    @PrimaryColumn({name: "collector_version_id", unsigned: true, default: 0, comment: "t_collector_version表主键"})
    collectorVersionId: number;

    @CreateDateColumn({name: "create_time", type: "datetime", comment: "创建时间"})
    createTime: Date

    @ManyToOne(() => TransformRule, transformRule => transformRule.ruleCollectorVersionMappingList)
    transformRule: TransformRule;
}