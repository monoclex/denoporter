/**
 * @author SirJosh3917
 * @copyright 2020 SirJosh3917
 * @license MIT
 * @description This is the core of the denoporter service, which rewrites typescript code.
 */

import ts from "typescript";

/**
 * Uses the typescript compiler to parse typescript code, and rewrite the imports.
 * @param code The typescript code to rewrite imports for.
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
  // naive check incase module extension is already defined
  if (module.endsWith('.ts') || module.endsWith('.js')) return module;

  // in the future, it may be better to check that the given attempted module paths actually exist
  return module + '.ts';
}