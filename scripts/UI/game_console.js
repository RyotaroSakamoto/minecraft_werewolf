import { ActionFormData } from "@minecraft/server-ui";

export class GameConsole{
    UIViewer(player, propertiesUI=()=>{}, startUI=()=>{}) {
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
                propertiesUI(player)
            }else if (selection === 1){
                startUI(player)
            }
        })
    }
}