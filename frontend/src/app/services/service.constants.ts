import {environment} from '../../environments/environment';

export class Constants {
  public readonly paths: any = {
    checkHealth: '/',
    home: "/home",
    login: "/login"
  };

  private readonly host: string = environment.api;

  constructor() {
  }

  public get(key: string, host?: string): string {
    host = host ? host : this.host;
    const path = host + this.paths[key];
    if (path === undefined) {
      throw new Error('Couldnt find ' + key + ' in paths');
    }
    return path;
  }
}
