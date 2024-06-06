import { world } from "@minecraft/server"

import { Commons } from "../commons"
const commons = new Commons();

export class Init{
    start(){
        commons.allSendMessage("hage");

        //有効roleのリスト作成
        var roles = [];
        //順番入れ替え
        roles = roles.sort(() => Math.random() - 0.5);

        var players = [];
        world.getPlayers().forEach((value, index)=>{
            players.push({
                name: value.name,
                role: roles[index]
            })
        });
        commons.setPlayers(players)
    }
}