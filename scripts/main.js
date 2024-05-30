import { world, system } from "@minecraft/server";
-
// subscribing to a blockBreak event
// - fires when a player breaks a block
// world.afterEvents.playerBreakBlock.subscribe((event) => {
// 	const player = event.player; // Player that broke the block
// 	const block = event.block; // Block that's broken
// 	player.sendMessage(`You have broken ${block.typeId}`);
//     console.log(block); // send a message to player
// });

// チャットの送信前に起動する
world.beforeEvents.chatSend.subscribe(ev => {
    const player = ev.sender;
    if (ev.message === "!test") {
        player.runCommandAsync("say これはテストコマンドです");
        ev.cancel = true;

    } else if (ev.message === "!get_players") {
        const players = world.getAllPlayers();
        const playerNames = players.map(player => player.name).join(", ");
        player.runCommandAsync(`say プレイヤー: ${playerNames}`);
        player.runCommandAsync(`function run`)
        ev.cancel = true;
    }
});

