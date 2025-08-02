declare module 'prismjs' {
  interface PrismGrammar {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  interface Prism {
    highlight: (code: string, grammar: PrismGrammar, language: string) => string;
    languages: Record<string, PrismGrammar>;
    highlightAll: () => void;
    highlightAllUnder: (container: Element) => void;
  }

  const Prism: Prism;
  export default Prism;
}
