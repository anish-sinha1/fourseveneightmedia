import axios, { AxiosInstance } from "axios";

export default class Api {
  private _token?: string;
  private _contentType?: string;
  public instance: AxiosInstance;
  constructor(_token?: string, _contentType?: string) {
    this._token = _token;
    this._contentType = _contentType;
    this.instance = this.createAxiosInstance();
  }
  public get contentType(): string {
    return this._contentType || "application/json";
  }
  public get token(): string {
    return this._token || "";
  }
  private createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: "http://localhost:8000/api", //in development. switch to https://fourseveneightmedia.com/api in production
      headers: {
        "Content-Type": this._contentType || "application/json",
      },
    });
    instance.defaults.headers.common["Authorization"] = this._token || "";
    return instance;
  }
}
