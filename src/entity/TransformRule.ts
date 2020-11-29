import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Index, OneToMany} from "typeorm/index";
import {RuleCollectorVersionMapping} from "./RuleCollectorVersionMapping";

@Entity("t_transform_rule")
@Index("rule_name_unique", ["ruleName", "domainId"], {unique: true})
export class TransformRule {

    @PrimaryGeneratedColumn({type: "int", unsigned: true, comment: "主键id"})
    id: number;

    @Column({name: "rule_name", type: "varchar", length: 30, comment: "规则名称"})
    ruleName: string;

    @Column({name: "rule_type_id", unsigned: true, comment: "数据格式。t_transform_rule_type_define表主键Id"})
    ruleTypeId: number;

    @Column({type: "tinyint", default: 0,comment: "状态。0：禁用，1：启用"})
    state: number;

    @Column({name: "test_state", type: "tinyint", default: 0, comment: "测试状态。0：待测试，1：已测试"})
    testState: number;

    @Column({name: "rule_desc", type: "varchar", length: 200, nullable: true,comment: "规则描述"})
    ruleDesc: string;

    @Column({type: "varchar", length: 25, default: null, comment: "脚本语言"})
    language: string;

    @Column({name: "script_text", type: "longtext", nullable: true, comment: "脚本内容"})
    scriptText: string;

    @Column({name: "script_fun_name", type: "varchar", length: 32, default: '', comment: "脚本方法名称"})
    scriptFunName: string;

    @Column({name: "domain_id", type: "varchar", length: 52, comment: "创建人的域Id。domain表domain_id(idm库)"})
    domainId: string;

    @Column({name: "create_by", type: "varchar", length: 32, comment: "创建人。users_things表sso_id主键(idm库)"})
    createBy: string;

    @Column({name: "update_by", type: "varchar", length: 32, comment: "更新人。users_things表sso_id主键(idm库)"})
    updateBy: string;

    @CreateDateColumn({name: "create_time", type: "datetime", comment: "创建时间"})
    createTime: Date

    @UpdateDateColumn({name: "update_time", type: "datetime", onUpdate: "CURRENT_TIMESTAMP(6)", comment: "更新时间"})
    updateTime: Date

    @OneToMany(() => RuleCollectorVersionMapping, collectorVersionMapping => collectorVersionMapping.transformRule)
    ruleCollectorVersionMappingList: RuleCollectorVersionMapping[]
}