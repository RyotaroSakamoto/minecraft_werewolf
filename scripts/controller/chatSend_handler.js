import { world, system, ItemStack, ItemTypes } from "@minecraft/server";

export function chatSend_handler(){
    world.beforeEvents.chatSend.subscribe(ev => {
        const pref = "$";
        const sendPlayer = etv.sender;

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
}