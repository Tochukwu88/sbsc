import jwt from "jsonwebtoken";
export class TokenUtil {
  static privateKey = "scdcdjssjsj";
  static async sign(payload: any, key: string, ttl: string): Promise<string> {
    return await jwt.sign(payload, key, { expiresIn: ttl });
  }

  static async generateToken(payload: any): Promise<string> {
    return this.sign(payload, this.privateKey!, "24h");
  }
  static generateOtpToken(length: number = 6): string {
    const allowedChars = "0123456789";
    let otp: string = "";
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * allowedChars.length);
      otp += allowedChars[random];
    }

    return otp;
  }
  static async decodeToken(token: string): Promise<Iverify> {
    return this.verify(token, this.privateKey!);
  }
  static async verify(token: string, key: string): Promise<Iverify> {
    try {
      let decoded = jwt.verify(token, key);
      if (!decoded) {
        return { success: false, err: null };
      }
      return { success: true, data: decoded };
    } catch (err: any) {
      return { success: false, err: err.message! };
    }
  }
}
interface Iverify {
  success: boolean;
  data?: any;
  err?: any;
}
