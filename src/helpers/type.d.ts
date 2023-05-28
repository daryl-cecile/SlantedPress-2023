type DefaultProps<T = any> = {
  children: import("react").ReactNode;
} & T;

type SimpleArticle = {
  id: string;
  slug: string;
  title: string;
  body: string;
  imgSrc: string;
  timestamp: number;
};
