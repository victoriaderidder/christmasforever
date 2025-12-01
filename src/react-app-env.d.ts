/// <reference types="react-scripts" />

declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";

declare module "*.svg" {
  const src: string;
  export default src;
}
