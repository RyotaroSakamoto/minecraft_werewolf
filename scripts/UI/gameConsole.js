import { ActionFormData } from "@minecraft/server-ui";
import { world, ItemStack } from "@minecraft/server";

import { PropertiesConsole } from "./PropertiesConsole"

const propertiesConsole = new PropertiesConsole();

export class GameConsole{
    UIviewer(player) {
        const form = new ActionFormData()
            .title("ゲームコンソール")
        const menu_list = ["役職人数変更","ゲームスタート"]
        for (var menu of menu_list){
            form.button(menu)
        }

        form.show(player)
        .then(({selection, canceled}) => {
            if (canceled) return;
            if (selection === 0){
                propertiesConsole.propertyUIviewer(player)
                .then(()=>{
                    this.UIviewer(player, propertiesConsole)
                })
            }else if (selection === 1){

                // ゲーム開始時処理
                const players = world.getPlayers();
                player.sendMessage(JSON.stringify(propertiesConsole.roles))
                for (var p of players){
                    player.sendMessage(JSON.stringify(p.name))
                }
            }
        })
    }
}