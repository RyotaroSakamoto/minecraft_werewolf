import { world, system, ItemStack, ItemTypes } from "@minecraft/server";

export class Commons{
    teleport(x,y,z,player){
        var command = `/tp ${player.name} ${x} ${y} ${z}`
        world.getDimension("overworld").runCommand(command)
    }
}