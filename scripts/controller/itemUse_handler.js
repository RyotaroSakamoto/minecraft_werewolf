import { world, system, ItemStack, ItemTypes } from "@minecraft/server";
import { GameConsole } from "../UI/game_console";
const gameConsole = new GameConsole();

import { PropertiesConsole } from "../UI/properties_console"
import { StartConsole } from "../UI//start_console";
import { WorldConsole } from "../UI/world_console";

const propertiesConsole = new PropertiesConsole();
const startConsole = new StartConsole();
const worldConsole = new WorldConsole();

export function itemUse_handler(){
    world.afterEvents.itemUse.subscribe((ev) => {
        const { source: player, itemStack } = ev;
    
        // ゲーム実行用
        if (itemStack.typeId === "minecraft:enchanted_book" && 'nameTag' in itemStack && itemStack.nameTag === "ゲームコンソール") {
            gameConsole.UIViewer(player,propertiesConsole.UIViewer, worldConsole.UIViewer, startConsole.UIViewer)
        }
    
        // 占い
        if (itemStack.typeId === "minecraft:book" && 'nameTag' in itemStack && itemStack.nameTag === "探偵の書") {
            player.sendMessage("たんていのしょ")
        }
    });
}