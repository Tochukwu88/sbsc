import * as fs from "node:fs/promises";

import { IUser } from "../interfaces/user.interface";

import { join } from "path";

export class UserRepo {
  filePath = join(process.cwd(), "src/repository/user.json");
  async save(payload: IUser): Promise<void> {
    try {
      let current = await this.getAll();
      if (current) {
        current = JSON.parse(current);
        current = current.users;
      } else {
        current = [];
      }

      const newUser = {
        users: [...current, payload],
      };

      await fs.writeFile(this.filePath, JSON.stringify(newUser, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
  async getOne(email: string): Promise<any | null> {
    const data = await fs.readFile(this.filePath, "utf-8");

    let all;
    if (!data) {
      console.log({ data });
      return null;
    }
    const users = JSON.parse(data);
    const user = users.users.filter((user: IUser) => {
      if (user.email == email) {
        return user;
      }
    });
    return user;
  }

  async getAll(): Promise<any | null> {
    const data = await fs.readFile(this.filePath, "utf-8");

    return data;
  }

  update() {}
  delete() {}
}
