export class UserCookies {
  users: any = {};
  create(phoneNumber: number, csrfToken: string) {
    this.users[phoneNumber] = {
      csrfToken: csrfToken,
      cookieStore: new CookieStore(),
    };
  }
  getCsrf(user: number) {
    return this.users[user].csrfToken;
  }
  add(user: number, cookies: string[] | undefined) {
    if (cookies !== undefined) {
      this.users[user].cookieStore.extend(cookies);
    }
  }
  generate(user: number) {
    return this.users[user].cookieStore.generate();
  }
}

class CookieStore {
  store: any = {};

  extend(cookies: string[]) {
    for (const cookie of cookies) {
      this.add(cookie);
    }
  }

  add(cookie: string) {
    const cookieValue = cookie.substring(0, cookie.indexOf(";") + 1);
    const [key, value] = cookieValue.split("=");
    this.store[key] = value;
  }

  generate() {
    let cookie = "";
    const keys = Object.keys(this.store);
    for (const key of keys) {
      cookie += `${key}=${this.store[key]} `;
    }
    return cookie;
  }
}