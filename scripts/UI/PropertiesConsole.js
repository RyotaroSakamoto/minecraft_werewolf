import { ModalFormData } from "@minecraft/server-ui";
import { world } from "@minecraft/server";

import { RolesProperties } from "../constructors/RollProperties"

const players = world.getPlayers();

const rolesProperties = new RolesProperties()
export class PropertiesConsole {

    propertyUIviewer(player){
        return new Promise((resolve, reject) => {
            const form = new ModalFormData()
                .title("人狼")

            for(var index in rolesProperties.roles){
                const role = rolesProperties.roles[index]
                form.textField(role.name, "数字を入力してください", role.num.toString())
            }

            form.show(player).then(r => {
                if(r.canceled){
                    resolve();
                    return
                }
                for(var value of r.formValues){
                    if (isNaN(value)){
                        player.sendMessage("§c数値以外が入力されたよ");
                        reject();
                        return
                    }
                }

                var total = r.formValues.reduce((sum, element)=>{
                    return sum + parseInt(element, 10)
                }, 0)

                console.log(total)
                if (players.length != total){
                    player.sendMessage("§c人数が合ってないよ");
                    reject();
                    return
                }

                var index = 0;
                for(var roleIndex in rolesProperties.roles){
                    rolesProperties.roles[roleIndex].num = parseInt(r.formValues[index], 10);
                    index++;
                }

                resolve();
            }).catch(error => {
                player.sendMessage("ERROR" + JSON.stringify(error));
                reject();
            });
        })
    }
}
