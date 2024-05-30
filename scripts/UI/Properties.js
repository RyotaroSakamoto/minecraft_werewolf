import { ModalFormData } from "@minecraft/server-ui";

export class Properties {

    constructor() {
        this.roles = {
            murabito: 5,
            tantei: 0,
            ishi: 0,
            jinro: 2
        }
    }

    propertyUIviewer(player){
        return new Promise((resolve, reject) => {
            const form = new ModalFormData()
            .title("人狼")
            .slider("村人", 0, 10, 1, this.roles.murabito)
            .slider("探偵", 0, 2, 1, this.roles.tantei)
            .slider("医師", 0, 2, 1, this.roles.ishi)
            .slider("人狼", 0, 4, 1, this.roles.jinro)

        form.show(player).then(r => {
            if(r.canceled){
                resolve();
                return
            }
            this.roles.murabito = r.formValues[0];
            this.roles.tantei = r.formValues[1];
            this.roles.ishi = r.formValues[2];
            this.roles.jinro = r.formValues[3];
            player.sendMessage(`村人: ${this.roles.murabito}\n探偵: ${this.roles.tantei}\n医師: ${this.roles.ishi}\n人狼: ${this.roles.jinro}`);
            resolve();
        }).catch(error => {
            player.sendMessage("ERROR" + JSON.stringify(error));
            reject();
        });
    })
    }
}
