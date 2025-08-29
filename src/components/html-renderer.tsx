'use client';

import parse, { domToReact, Element, Text } from 'html-react-parser';
import Latex from 'react-latex-next';
import type { DOMNode } from 'html-react-parser';

export function HtmlRenderer({ content }: { content: string }) {
  if (!content) return null;

  const options = {
    replace: (domNode: DOMNode) => {
      // Handle empty <p> tags as line breaks
      if (
        domNode instanceof Element &&
        domNode.name === 'p' &&
        domNode.children.length === 0
      ) {
        return <br />;
      }

      // Handle [tex]...[/tex] blocks for LaTeX rendering
      if (domNode instanceof Text) {
        const parts = domNode.data.split(/(\[tex\].*?\[\/tex\])/g);
        if (parts.length > 1) {
          return (
            <>
              {parts.map((part, index) => {
                if (part.startsWith('[tex]') && part.endsWith('[/tex]')) {
                  const latex = part.substring(5, part.length - 6);
                  return <Latex key={index}>{`$${latex}$`}</Latex>;
                }
                // Return the text part to be rendered normally
                return part;
              })}
            </>
          );
        }
      }
      // Let the parser handle all other elements by default
    },
  };

  return <>{parse(content, options)}</>;
}
