import { ActionFormData } from "@minecraft/server-ui";
import { Commons } from "../commons"
import { Init } from "../Game/Init";

const commons = new Commons();
const init = new Init();

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
            //ゲーム開始
            init.start();
        })
    }
}