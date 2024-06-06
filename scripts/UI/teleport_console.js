import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const players = world.getPlayers();

export class TeleportConsole {
    teleportUIviewer(player){
        const form = new ActionFormData()
            .title("観戦コンソール")

        player.sendMessage("players.length: " + players.length)

        for(var player of players){
            player.sendMessage("TP")
        }

        form.show(player)
        .then(({selection, canceled}) => {
            if (canceled) return;
            player.sendMessage(players[selection].name)
        })
    }
}