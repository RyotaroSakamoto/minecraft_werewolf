import { ActionFormData } from "@minecraft/server-ui";
import { Commons } from "../commons"
import { Init } from "../Game/Init";
import { world } from "@minecraft/server";

const commons = new Commons();

export class StartConsole{
    UIViewer(player) {
        const form = new ActionFormData()
            .title("ゲームを開始してもよろしいですか？")
            .button("START")

        var bodyText = "";
        const roles = commons.getRoles();
        for(var index in roles){
            const role = roles[index]
            bodyText += `           ${role.name}: ${role.num}\n`
        }
        form.body(bodyText)

        form.show(player)
        .then(({canceled})=>{
            if(canceled){
                return
            }

            player.sendMessage("GAME START");
            //ゲーム開始
            const init = new Init();
            init.start();
        })
    }
}