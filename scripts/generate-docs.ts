import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const generateDocsForPackage = (name: string) => {
  const rootDir = path.resolve(__dirname, '..');
  const fullApi = [];

  const visitFile = ({ filePath, gitHubUrl }) => {
    const code = fs.readFileSync(filePath, 'utf8');
    const setParentNodes = true;
    const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.ES2015, setParentNodes);

    const api = {
      matcher: null,
      asymmetricMatcher: null,
    };

    const visitNode = (node) => {
      switch (node.kind) {
        case ts.SyntaxKind.InterfaceDeclaration:
          const isAsymmetricMatcher = node.name.text === 'Expect';
          const isMatcher = node.name.text === 'Matchers';
          if (isAsymmetricMatcher || isMatcher) {
            const methodSignature = node.members[0];
            const [jsDoc] = methodSignature.jsDoc || [{ comment: '', tags: [] }];
            const shortName = methodSignature.name.text;
            const name = isAsymmetricMatcher ? `expect.${shortName}` : shortName;
            const signature = isMatcher
              ? `expect(value: any).${methodSignature.getText()}`
              : `expect.${methodSignature.getText()}`;
            const description = jsDoc.comment;
            const examples = jsDoc.tags
              .filter(({ tagName }) => tagName.text === 'example')
              .map(({ comment }) => comment);
            api[isAsymmetricMatcher ? 'asymmetricMatcher' : 'matcher'] = {
              name,
              signature,
              description,
              examples,
              gitHubUrl,
            };
          }
          break;
      }
      ts.forEachChild(node, visitNode);
    };

    fullApi.push(api);
    visitNode(sourceFile);
  };

  const expectMorePath = path.resolve(rootDir, './packages/expect-more-jest/src');
  const files = fs
    .readdirSync(expectMorePath)
    .filter((filename) => filename.endsWith('.ts') && !filename.endsWith('index.ts'))
    .map((filename) => ({
      filePath: path.resolve(expectMorePath, filename),
      gitHubUrl: `https://github.com/JamieMason/expect-more/blob/master/packages/expect-more-jest/src/${filename}`,
    }));

  files.forEach(visitFile);

  console.log('#', name);

  fullApi.forEach(({ matcher }) => {
    console.log(`
<details><summary><code>${matcher.name}</code></summary>

\`\`\`ts
${matcher.examples.join('\n')}
\`\`\`

</details>
`);
  });
};

generateDocsForPackage('expect-more-jest');

generateDocsForPackage('expect-more-jasmine');
