// bypass error on svg imports
declare module "*.svg" {
    const content: any;
    export default content;
}