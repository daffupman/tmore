import {postGetAllAction} from "./controller/PostGetAllAction";
import {postGetByIdAction} from "./controller/PostGetByIdAction";
import {postSaveAction} from "./controller/PostSaveAction";
import {TransformRuleController} from "./controller/TransformRuleController";

const transformRuleController = new TransformRuleController();
export const AppRoutes = [
    {
        path: "/transform-rUle",
        method: "post",
        action: transformRuleController.saveTransformRule
    },
    {
        path: "/transform-rUle",
        method: "get",
        action: transformRuleController.findTransformRule
    },
    {
        path: "/posts",
        method: "get",
        action: postGetAllAction
    },
    {
        path: "/posts/:id",
        method: "get",
        action: postGetByIdAction
    },
    {
        path: "/posts",
        method: "post",
        action: postSaveAction
    }
];