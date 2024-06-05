import { ActionFormData } from "@minecraft/server-ui";
import { world } from "@minecraft/server";

export class GameStart{
    game_console(player) {
        const form = new ActionFormData()
            .title("ゲームを開始してもよろしいですか？")
            .body("プレイヤーを選択してください")
            .button("ゲームスタート")

        return form.show(player)
    }
}