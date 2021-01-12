## 第 5 章：快速创建 TypeScript 项目

### 5.1 在 Node.js 中使用 TypeScript

> TypeScript 从一开始就拥有对 Node.js 的一流支持

1. 创建一个 Node.js 项目的 package.json 文件：`npm init -y`
2. 添加 TypeScript：`npm install typescript -D`
3. 添加 node.d.ts：`npm install @types/node -D`
4. 为 TypeScript 选项初始化一个 tsconfig.json 文件，并添加一些选项：`npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6, dom --module commonjs`

   - rootDir（src）：指定输入文件的根目录
   - outDir（lib）：指定输出目录
   - esModuleInterop（true）：Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.（通过为所有的导入创建命名空间，实现 CommonJS 和 ES 模块的互操作性，即意味着 "allowSyntheticDefaultImports"）
   - allowSyntheticDefaultImports：Allow default imports from modules with no default export. This does not affect code emit, just typechecking（允许从没有默认导出的模块中模块的导入，这只影响类型检查）
   - resolveJsonModule（true）：Include modules imported with '.json' extension（包含导入的 '.json' 后缀的模块）
   - lib：指定要包含在编译中的库文件
   - module：指定 ECMAScript 的目标版本
5. 添加 ts-node：`npm install ts-node -D`
6. 添加 nodemon：`npm install nodemon -D`

   ```js
   {
     "compilerOptions": {
       /* Visit https://aka.ms/tsconfig.json to read more about this file */
   
       /* Basic Options */
       // "incremental": true,                   /* Enable incremental compilation */
       "target": "es5",                          /* Specify ECMAScript target version(指定 ECMAScript 的目标版本): 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
       "module": "commonjs",                     /* Specify module code generation(指定使用的模块系统): 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
       "lib": ["es6","dom"],                     /* Specify library files to be included in the compilation(指定要包含在编译中的库文件). */
       // "allowJs": true,                       /* Allow javascript files to be compiled(允许编译 JavaScript 文件). */
       // "checkJs": true,                       /* Report errors in .js files(报告 JavaScript 文件中的错误). */
       // "jsx": "preserve",                     /* Specify JSX code generation(指定生成的 JSX 代码): 'preserve', 'react-native', or 'react'. */
       // "declaration": true,                   /* Generates corresponding '.d.ts' file(生成相应的 .d.ts 文件). */
       // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file(为每一个相应的 .d.ts 文件生成 sourcemap 文件). */
       // "sourceMap": true,                     /* Generates corresponding '.map' file(生成相应的 .map 文件). */
       // "outFile": "./",                       /* Concatenate and emit output to single file(将输出文件合并为一个文件). */
       "outDir": "lib",                          /* Redirect output structure to the directory(指定输出目录). */
       "rootDir": "src",                         /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
       // "composite": true,                     /* Enable project compilation */
       // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
       // "removeComments": true,                /* Do not emit comments to output. */
       // "noEmit": true,                        /* Do not emit outputs. */
       // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
       // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
       // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
   
       /* Strict Type-Checking Options */
       "strict": true,                           /* Enable all strict type-checking options. */
       // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
       // "strictNullChecks": true,              /* Enable strict null checks. */
       // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
       // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
       // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
       // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
       // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
   
       /* Additional Checks */
       // "noUnusedLocals": true,                /* Report errors on unused locals. */
       // "noUnusedParameters": true,            /* Report errors on unused parameters. */
       // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
       // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
       // "noUncheckedIndexedAccess": true,      /* Include 'undefined' in index signature results */
   
       /* Module Resolution Options */
       // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
       // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
       // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
       // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
       // "typeRoots": [],                       /* List of folders to include type definitions from. */
       // "types": [],                           /* Type declaration files to be included in compilation. */
       // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
       "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
       // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
       // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */
   
       /* Source Map Options */
       // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
       // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
       // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
       // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
   
       /* Experimental Options */
       // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
       // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
   
       /* Advanced Options */
       "resolveJsonModule": true,                /* Include modules imported with '.json' extension */
       "skipLibCheck": true,                     /* Skip type checking of declaration files. */
       "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
     }
   }
   
   ```

   