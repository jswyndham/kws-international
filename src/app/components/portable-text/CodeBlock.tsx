import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('html', html);

interface CodeBlockProps {
	code: string;
	language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
	return (
		<SyntaxHighlighter language={language} style={docco}>
			{code}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;
