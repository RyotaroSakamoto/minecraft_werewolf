import { ModalFormData } from "@minecraft/server-ui";
import { world } from "@minecraft/server";

import { Commons } from "../commons"
const commons = new Commons();

const players = world.getPlayers();

export class PropertiesConsole {

    UIViewer(player){
        const form = new ModalFormData()
        .title("役職設定")

        const roles = commons.getRoles();

        for(var index in roles){
            const role = roles[index]
            form.textField(role.name, "数字を入力してください", role.num.toString())
        }

        form.show(player).then(r => {
            if(r.canceled){
                return
            }
            for(var value of r.formValues){
                if (isNaN(value) || value.includes("-")){
                    player.sendMessage("§c数値以外が入力されたよ");
                    return
                }
            }

            var total = r.formValues.reduce((sum, element)=>{
                return sum + parseInt(element, 10)
            }, 0)

            console.log(total)
            if (players.length != total){
                player.sendMessage("§c人数が合ってないよ");
                return
            }

            var index = 0;
            for(var roleIndex in roles){
                roles[roleIndex].num = parseInt(r.formValues[index], 10);
                index++;
            }
            commons.setRoles(roles)
        });
    }
}
