export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: string;
  publishedAt: string;
  content: any[];
  coverImage?: {
    _type: "image";
    asset: { _ref: string };
  };
};
