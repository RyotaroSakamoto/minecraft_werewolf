import { world, system, ItemStack, ItemTypes } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";

import { PropertiesConsole } from "./UI/PropertiesConsole";
import { GameConsole } from "./UI/GameConsole";
import { PlayerProperties } from "./constructors/PlayerProperties"
import { TeleportConsole } from './UI/TeleportConsole';
import { Commons } from "./commons"

const dimension = world.getDimension('overworld');
const players = world.getPlayers();
const propertiesConsole = new PropertiesConsole();
const teleportConsole = new TeleportConsole()
const gameConsole = new GameConsole();

const commons = new Commons();

world.beforeEvents.chatSend.subscribe(ev => {
    const pref = "$";
    const sendPlayer = ev.sender;
    if(ev.message === `${pref}tp`){
        teleportConsole.teleportUIviewer(sendPlayer)
        ev.cancel = true
    }

    if(ev.message === `${pref}gameConsole`){
        system.runTimeout(() => {
            const itemStack = new ItemStack(ItemTypes.get("minecraft:enchanted_book"), 1);
            itemStack.nameTag = "ゲームコンソール"
            sendPlayer.getComponent("minecraft:inventory").container.addItem(itemStack);
        }, 1)
        ev.cancel = true
    }

    if(ev.message === `${pref}tptest`){
        system.runTimeout(() => {
            commons.teleport(10,10,10,sendPlayer);
        }, 1)
        ev.cancel = true
    }
});

world.afterEvents.itemUse.subscribe((ev) => {
    const { source: player, itemStack } = ev;

    // ゲーム実行用
    if (itemStack.typeId === "minecraft:enchanted_book" && 'nameTag' in itemStack && itemStack.nameTag === "ゲームコンソール") {
        gameConsole.UIviewer(player)
    }

    // 占い
    if (itemStack.typeId === "minecraft:book" && 'nameTag' in itemStack && itemStack.nameTag === "探偵の書") {
        player.sendMessage("たんていのしょ")
    }
});

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

