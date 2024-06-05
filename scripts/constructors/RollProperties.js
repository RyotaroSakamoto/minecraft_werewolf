export class RolesProperties {
    constructor() {
        // 村人、探偵、医師、料理人、忍者
        // 狂人、人狼、暗殺者
        // 従者、旅人
        this.roles = {
            villager:{
                name: "村人",
                Team: "white",
                num: 5
            },
            detective:{
                name: "探偵",
                Team: "white",
                num: 0
            },
            doctor:{

                name: "医師",
                Team: "white",
                num: 0
            },
            werewolf:{
                name: "人狼",
                Team: "black",
                num: 2
            },
            lunatic:{
                name: "狂人",
                Team: "black",
                num: 0
            },
            cook:{
                name: "料理人",
                Team: "white",
                num: 0
            },
            ninja:{
                name: "忍者",
                Team: "white",
                num: 0
            },
            assassin:{
                name: "暗殺者",
                Team: "black",
                num: 0
            },
            servant:{
                name: "従者",
                Team: "gray",
                num: 0
            },
            traveler:{
                name: "旅人",
                Team: "gray",
                num: 0
            }
        }
    }
}