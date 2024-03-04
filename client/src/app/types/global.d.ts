declare module "*.scss";
declare module "*.css";

declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
