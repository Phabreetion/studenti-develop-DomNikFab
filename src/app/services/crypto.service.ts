import {GlobalDataService} from './global-data.service';
import {Storage} from '@ionic/storage';
import * as CryptoJS from 'crypto-js';
import * as Encrypt from 'jsencrypt';
import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {ToastController} from '@ionic/angular';



@Injectable({
    providedIn: 'root'
})
export class CryptoService {

    passphrase_private_key: string = 'faustofasano2019_appunimol';
    urlScambioChiavi: string = 'http://127.0.0.1/sync/api/scambioChiavi.php';
    private_key: string;
    public_key: string;
    passphrase_key: string;

    constructor(
        public storage: Storage,
        public services: HttpService,
        public toastCtrl: ToastController)
    { }

        getChiavi() {

                        const body = {
                            chiave_pubblica: true
                        };

                        GlobalDataService.log(0, 'Chiamo ' + this.urlScambioChiavi, body);
                        this.services.getJSON(this.urlScambioChiavi, body).then(
                            (esitoScambio) => {
                                //console.log(esitoScambio);
                                const public_key = esitoScambio['public_key_client'];
                                const private_key = esitoScambio['private_key_client'];
                                const segreto = esitoScambio['encoded_secret'];


                                const pv_key = this.CryptoJSAesDecrypt(this.passphrase_private_key,private_key);
                                const crypt = new Encrypt.JSEncrypt();
                                crypt.setKey(pv_key);
                                const decoded = crypt.decrypt(segreto);


                                this.storage.set('public_key',public_key);
                                this.storage.set('private_key',pv_key);
                                this.storage.set('passphrase_key',decoded);

                                this.public_key = public_key;
                                this.private_key = private_key;
                                this.passphrase_key=decoded;

                                //const dec1 = this.CryptoJSAesDecrypt('decoded',segreto);


                                GlobalDataService.log(0, 'Esito scambio', esitoScambio);

                            }, (err) => {
                                this.toastCtrl.create({
                                    message: 'Impossibile procedere, Errore nello scambio delle chiavi!',
                                    duration: 5000
                                }).then(toast => {
                                        toast.present();
                                    },
                                    (err) => {
                                        GlobalDataService.log(2, 'Toast fallito!', err);
                                    });
                                GlobalDataService.log(2, 'Errore ' + this.urlScambioChiavi, err);
                            });
    }



        CryptoJSAesEncrypt(passphrase, plain_text){

            var salt = CryptoJS.lib.WordArray.random(256);
            var iv = CryptoJS.lib.WordArray.random(16);
            //for more random entropy can use : https://github.com/wwwtyro/cryptico/blob/master/random.js instead CryptoJS random() or another js PRNG

            var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });

            var encrypted = CryptoJS.AES.encrypt(plain_text, key, {iv: iv});

            var data = {
                ciphertext : CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
                salt : CryptoJS.enc.Hex.stringify(salt),
                iv : CryptoJS.enc.Hex.stringify(iv)
            }

            return JSON.stringify(data);
        }


        CryptoJSAesDecrypt(passphrase,encrypted_json_string){

            var obj_json = JSON.parse(encrypted_json_string);

            var encrypted = obj_json.ciphertext;
            var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
            var iv = CryptoJS.enc.Hex.parse(obj_json.iv);

            var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999});


            var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv});

            return decrypted.toString(CryptoJS.enc.Utf8);
        }


}
