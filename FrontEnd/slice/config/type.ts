
export type TLang = "fa" | "en";
export type TTheme = "default"|"dark"| "theme2"| "theme3"| "theme4"

export interface IConfig {
  theme: TTheme;
  locale:TLang;
 
}
