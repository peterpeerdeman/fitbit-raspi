declare module 'document' {
  export interface Element {
    text: string;
  }

  export interface Document {
    getElementById(id: string): Element | null;
    replaceSync(string: String);
    addEventListener(string: String, callback: Function);
  }

  const document: Document;

  export default document;
}
