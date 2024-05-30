import { world, system, MinecraftDimensionTypes } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { Properties } from "./UI/Properties";
import { Game } from "./UI/gameConsole";

const dimension = world.getDimension('overworld');
const players = world.getPlayers();
const properties = new Properties();

world.afterEvents.itemUse.subscribe((ev) => {
    const { source: player, itemStack } = ev;

    // ゲーム実行用
    if (itemStack.typeId === "minecraft:enchanted_book") {
        new Game().game_console(player, properties)
    }

    // 占い
    if (itemStack.typeId === "minecraft:compass") {
        uranai(player)
    }
});


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

