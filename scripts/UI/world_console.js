import { ModalFormData } from "@minecraft/server-ui";
import { world } from "@minecraft/server";

import { Commons } from "../commons"
const commons = new Commons();

const players = world.getPlayers();

export class WorldConsole {

    UIViewer(player){
        const time_list = ["昼", "夜"];
        const map_list = ["map1", "map2", "map3"]
        const form = new ModalFormData()
            .title("ワールド設定")
            .dropdown("時間選択", time_list)
            .dropdown("マップ選択", map_list)

        form.show(player).then(r => {
            if (r.canceled) {
                player.sendMessage("フォームがキャンセルされました。");
                return;
            }
            const selection = r.formValues[0];
            if(time_list[r.formValues[0]] === "昼"){
                world.getDimension("overworld").runCommand("/time set day")
            }else if(time_list[r.formValues[0]] === "夜"){
                world.getDimension("overworld").runCommand("/time set midnight")
            }

            player.sendMessage(`選択された設定: ${map_list[r.formValues[1]]}`);
        });
    }
}
