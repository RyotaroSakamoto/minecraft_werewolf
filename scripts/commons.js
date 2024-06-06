import { world } from "@minecraft/server";

import { RolesProperties } from "./constructors/RollProperties"
const rolesProperties = new RolesProperties()

export class Commons{
    teleport(x,y,z,player){
        var command = `/tp ${player.name} ${x} ${y} ${z}`
        world.getDimension("overworld").runCommand(command)
    }

    getRoles(){
        return rolesProperties.roles
    }
    setRoles(roles){
        rolesProperties.roles = roles
    }

    allSendMessage(message){
        for(var player of world.getPlayers()){
            player.sendMessage(message);
        }
    }
}