import { ActionFormData } from "@minecraft/server-ui";

export class GameConsole{
    UIViewer(player, propertiesUI=()=>{}, worldUI=()=>{}, startUI=()=>{}) {
        const form = new ActionFormData()
            .title("ゲームコンソール")
        const menu_list = ["役職人数変更","ワールド設定","ゲームスタート"]
        for (var menu of menu_list){
            form.button(menu)
        }

        form.show(player)
        .then(({selection, canceled}) => {
            if (canceled) return;
            if (menu_list[selection] === "役職人数変更"){
                propertiesUI(player)
            }else if (menu_list[selection] === "ワールド設定"){
                worldUI(player);
            }else if (menu_list[selection] === "ゲームスタート"){
                startUI(player)
            }
        })
    }
}