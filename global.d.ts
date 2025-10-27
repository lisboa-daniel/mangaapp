// global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "uc-config": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      "ctx-name"?: string;
      pubkey?: string;
    };
    "uc-file-uploader-regular": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      "ctx-name"?: string;
      "multiple"?: boolean;
      "accepted-types"?: string;
      "images-only"?: boolean;
      "preview-step"?: boolean;
    };
  }
}
