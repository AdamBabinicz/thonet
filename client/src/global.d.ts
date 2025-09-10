declare namespace JSX {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}
