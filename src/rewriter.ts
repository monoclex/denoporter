import ts from "typescript";

/**
 * Rewrites import urls of typescript code by appending all imports with '.ts' if necessary.
 * @param code The code to rewrite imports for.
 */
export function rewrite(code: string): string {

  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  const sourceFile = ts.createSourceFile('rewrite.ts', code, ts.ScriptTarget.Latest);
  const printer = ts.createPrinter();

  let modified = "";

  sourceFile.forEachChild(node => {
    const result = rewriteNode(node);

    let appendingNode = node;

    if (result) {
      appendingNode = result;
    }

    modified += printer.printNode(ts.EmitHint.Unspecified, appendingNode, sourceFile);
    modified += '\r\n';
  })

  return modified;
}

function rewriteNode(node: ts.Node): ts.Node | void {
  // we only care about import/export nodes
  if (ts.isImportDeclaration(node)) {
    if (!ts.isStringLiteral(node.moduleSpecifier)) return; // "If this is not a StringLiteral it will be a grammar error."

    const module = node.moduleSpecifier.text;

    const rewrittenNode = ts.createImportDeclaration(
      node.decorators,
      node.modifiers,
      node.importClause,
      ts.createStringLiteral(rewriteModule(module))
    );

    return rewrittenNode;
  }

  if (ts.isExportDeclaration(node)) {
    if (!node.moduleSpecifier) return;
    if (!ts.isStringLiteral(node.moduleSpecifier)) return; // "If this is not a StringLiteral it will be a grammar error."

    const module = node.moduleSpecifier.text;

    const rewrittenNode = ts.createExportDeclaration(
      node.decorators,
      node.modifiers,
      node.exportClause,
      ts.createStringLiteral(rewriteModule(module)),
      node.isTypeOnly
    );

    return rewrittenNode;
  }
}

function rewriteModule(module: string) {
  return module + '.ts';
}