import { world } from "@minecraft/server"

import { Commons } from "../commons"
const commons = new Commons();

import { PlayerProperties } from "../constructors/PlayerProperties"
const playerProperties = new PlayerProperties();

export class Init{
    start(){
        //有効roleのリスト作成
        var roles = [];

        for(var index in commons.getRoles()){
            var role = commons.getRoles()[index]
            for(var i=0; i<role.num; i++){
                roles.push(role)
            }
        }
        roles = roles.sort(() => Math.random() - 0.5);

        var players = [];
        world.getPlayers().forEach((value, index)=>{
            players.push({
                name: value.name,
                role: roles[index]
            })
        });
        playerProperties.players = players;
        commons.allSendMessage(JSON.stringify(players))
    }
}