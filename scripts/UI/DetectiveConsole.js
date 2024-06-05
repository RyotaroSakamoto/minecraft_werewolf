import { ActionFormData } from "@minecraft/server-ui";
import { world, ItemStack } from "@minecraft/server";

export class DetectiveConsole{
    UIviewer(player) {
        const form = new ActionFormData()
            .title("探偵の書")
        const menu_list = ["役職人数変更","ゲームスタート"]
        for (var menu of menu_list){
            form.button(menu)
        }

        form.show(player)
        .then(({canceled}) => {
            if (canceled) return;
            result();
        })
    }
}