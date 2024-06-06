import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { chatSend_handler } from "./controller/chatSend_handler";
import { itemUse_handler } from "./controller/itemUse_handler"

const players = world.getPlayers();

chatSend_handler();
itemUse_handler();

world.afterEvents.entityDie.subscribe((ev) => {
})

function uranai(player){
    const form = new ActionFormData()
        .title("選択メニュー")
        .body("プレイヤーを選択してください")
    for (const player of players)
        form.button(player.name);
        form.show(player)
        .then(({ selection, canceled }) => {
        if (canceled) return;
        const target = players[selection];
        if (!target) return;
            if (player.hasTag("占い師")) fortuneTeller(player, target);
            if (player.hasTag("霊媒師")) medium(player, target);
    });
}

function fortuneTeller(player, target) { // 占い師の関数
    // 占った時の処理
    if (target.hasTag("人狼")) player.sendMessage(`${target.name} は人狼です`);
    if (target.hasTag("村人")) player.sendMessage(`${target.name} は人狼ではありません`);
    if (target.hasTag("妖狐")) player.sendMessage(`${target.name} は妖子です`);
}

function medium(player, target) { // 霊媒師の関数
    // 霊媒した時の関数
    if (target.hasTag("人狼")) player.sendMessage(`${target.name} は人狼です`);
    if (target.hasTag("村人")) player.sendMessage(`${target.name} は人狼ではありません`);
    if (target.hasTag("妖狐")) player.sendMessage(`${target.name} は妖狐です`);
}

