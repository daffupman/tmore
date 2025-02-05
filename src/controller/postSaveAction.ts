import {Context} from "koa";
import {getManager} from "typeorm";
import {Post} from "../entity/Post";
import {getConnection} from "typeorm/index";

/**
 * Saves given post.
 */
export async function postSaveAction(context: Context) {

    // get a post repository to perform operations with post
    const postRepository = getConnection("tmore").getRepository(Post);

    // create a real post object from post json object sent over http
    const newPost = postRepository.create(context.request.body);

    // save received post
    await postRepository.save(newPost);

    // return saved post back
    context.body = newPost;
}