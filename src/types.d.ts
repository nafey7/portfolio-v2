declare module "*.tsx" {
  const content: any;
  export default content;
}

declare module "*.ts" {
  const content: any;
  export default content;
}

declare module "@react-three/fiber" {
  export * from "@react-three/fiber/dist/declarations/src";
}

declare module "@react-three/drei" {
  export * from "@react-three/drei/dist/declarations/src";
}

declare module "*.png" {
  const content: string;
  export default content;
}
