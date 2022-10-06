import console from "console";
import CryptoJS from "crypto-js";
export class Hasher {
  static key = "kncdkmcdm";

  static encrypt(password: string): string {
    if (!this.key) {
      throw new Error("Can't encrypt password");
    }
    return CryptoJS.AES.encrypt(password, this.key!).toString();
  }

  static decrypt(ciphertext: string): string {
    console.log(ciphertext);
    if (!this.key) {
      throw new Error("Can't decrypt password");
    }
    let bytes = CryptoJS.AES.decrypt(ciphertext, this.key!);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  static compare(password: string, ciphertext: string): boolean {
    let match: boolean;
    const decryptedPassword = this.decrypt(ciphertext);
    match = decryptedPassword === password;

    return match;
  }
}
