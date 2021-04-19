module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true, // 启用扩展运算符
			vueFeatures: {
				filter: true,
				interpolationAsNonHTML: true
			}
		}
	},
	env: {
		browser: true
	},
	extends: [
		'standard',
		'plugin:vue/recommended'
	],
	/**
	 * 插件前缀都是 eslint-plugin-，可以省略
	 * eslint-plugin-html：用于检查 vue 文件
	 */
	plugins: [
		'vue'
	],
	rules: {
		// 可能的错误
		'no-await-in-loop': ['error'], // 禁止在循环中出现异步函数
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境下禁用 debugger 语句
		'no-prototype-builtins': 'off',
		// 最佳实践
		'eqeqeq': 'off', // 不检测 ===，主要是针对一期工程，二期小百科应当检测 ===
		'no-useless-return': ['error'], // 禁止多余的 return 语句
		'prefer-promise-reject-errors': 'off',
		// 变量
		'no-use-before-define': ['error'], // 禁止在变量定义前使用他们
		// 风格指南
		'array-bracket-newline': ['error', 'consistent'],
		'array-bracket-spacing': ['error'],
		'array-element-newline': ['error', 'consistent'],
		'block-spacing': ['error', 'always'],
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'camelcase': 'off',
		'computed-property-spacing': ['error'], // 对象的计算属性不允许有空格
		'indent': ['error', 'tab', { SwitchCase: 1 }], //  使用 tab 缩进，且 case 相对于 switch 缩进一个 tab
		'jsx-quotes': ['error'],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
		'no-tabs': 'off', // 允许使用 tab
		'object-curly-newline': ['error', {
			ObjectExpression: { multiline: true },
			ObjectPattern: { multiline: true },
			ImportDeclaration: { multiline: true },
			ExportDeclaration: { multiline: true }
		}],
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
		'one-var-declaration-per-line': ['error'],
		'operator-linebreak': ['error', 'before', { overrides: { '+=': 'none', '-=': 'none', '*=': 'none' } }],
		'semi': ['error', 'always'], // 必须以分号结尾
		'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
		'spaced-comment': ['error', 'always', { block: { balanced: true } }],
		'space-infix-ops': ['error'],
		// ES 6
		'arrow-spacing': ['error'],
		'generator-star-spacing': ['error', 'both'],
		'no-duplicate-imports': ['error', { includeExports: true }],
		'no-useless-computed-key': ['error'],
		'no-useless-rename': ['error'],
		'no-var': ['error'],
		'object-shorthand': ['error'],
		'rest-spread-spacing': ['error', 'never'],
		'template-curly-spacing': ['error', 'always'],

		// eslint-plugin-vue essential
		'vue/no-v-model-argument': ['error'],

		// eslint-plugin-vue strongly recommended
		'vue/attribute-hyphenation': ['error', 'always'],
		"vue/component-definition-name-casing": ["off", "PascalCase"],
		'vue/html-closing-bracket-newline': ['error', {
			singleline: 'never',
			multiline: 'never'
		}],
		'vue/html-closing-bracket-spacing': ['error'],
		'vue/html-indent': ['error', 'tab'],
		'vue/html-quotes': ['error', 'double'],
		'vue/html-self-closing': ['error', {
			html: {
				void: 'never', // H5 规范中，自闭合标签不需要加斜杠，但可以兼容加斜杠的方式；XHTML 中要求必须加斜杠
				normal: 'never',
				component: 'never'
			},
			svg: 'never',
			math: 'never'
		}],
		'vue/max-attributes-per-line': ['off'],
		'vue/multiline-html-element-content-newline': ['error', {
			ignoreWhenEmpty: true,
			allowEmptyLines: false
		}],
		'vue/mustache-interpolation-spacing': ['error', 'always'],
		'vue/no-multi-spaces': ['error'],
		'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
		'vue/no-template-shadow': ['error'],
		'vue/prop-name-casing': ['error', 'camelCase'],
		'vue/require-default-prop': ['off'],
		'vue/require-prop-types': ['error'],
		'vue/singleline-html-element-content-newline': ['off'],

		// eslint-plugin-vue recommended
		'vue/component-tags-order': ['error', { 'order': [ [ 'template', 'script' ], 'style' ] }],
		'vue/no-lone-template': ['error'],
		'vue/no-v-html': 'off',
		'vue/order-in-components': ['error', {
			'order': [
				// 副作用
				'el',
				// 全局感知
				'name',
				'parent',
				// 组件类型
				'functional',
				// 模板修改器
				'delimiters',
				'comments',
				// 模板依赖
				'components',
				'directives',
				'filters',
				// 组合混入
				'extends',
				'mixins',
				// 接口
				'provide',
				'inject',
				'inheritAttrs',
				'model',
				'props',
				'propsData',
				// 本地状态
				'data',
				'computed',
				// 事件
				'watch',
				// 路由守卫
				'ROUTER_GUARDS',
				// 生命周期
				'LIFECYCLE_HOOKS',
				// 非响应式属性
				'methods',
				// 渲染
				'template',
				'render',
				'renderError'
			]
		}],
		'vue/this-in-template': ['error', 'never'],

		// eslint-plugin-vue uncategorized
		'vue/block-tag-newline': ['error'],
		'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: false }],
		'vue/custom-event-name-casing': ['error'],
		'vue/html-comment-content-newline': ['error'],
		'vue/html-comment-content-spacing': ['error', 'always'],
		'vue/html-comment-indent': ['error', 'tab'],
		'vue/no-empty-component-block': ['error'],
		'vue/no-potential-component-option-typo': ['error', { 'presets': ['all'] }],
		'vue/no-reserved-component-names': ['error', {
			disallowVueBuiltInComponents: true,
			disallowVue3BuiltInComponents: true
		}],
		// 'vue/no-static-inline-styles': ['error', {
		// 	'allowBinding': true
		// }],
		'vue/no-template-target-blank': ['error', {
			allowReferrer: true,
			enforceDynamicLinks: 'always'
		}],
		'vue/no-useless-mustaches': ['error', {
			ignoreIncludesComment: true,
			ignoreStringEscape: true
		}],
		'vue/no-useless-v-bind': ['error', {
			ignoreIncludesComment: true,
			ignoreStringEscape: true
		}],
		'vue/padding-line-between-blocks': ['error'],
		'vue/require-direct-export': ['error'],
		'vue/script-indent': ['error', 'tab', {
			'baseIndent': 1,
			'switchCase': 1
		}],
		'vue/v-for-delimiter-style': ['error'],
		'vue/v-on-event-hyphenation': ['error', 'always', {
			autofix: false // vue 2 中不要启用自动修复，有 bug
		}],
		'vue/v-on-function-call': ['error', 'never'],

		// eslint-plugin-vue
		'vue/array-bracket-newline': ['error', 'consistent'],
		'vue/array-bracket-spacing': ['error'],
		'vue/arrow-spacing': ['error'],
		'vue/block-spacing': ['error', 'always'],
		'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'vue/camelcase': ['off'],
		'vue/comma-dangle': ['error', 'never'],
		'vue/comma-spacing': ['error'],
		'vue/comma-style': ['error', 'last'],
		'vue/dot-location': ['error', 'property'],
		'vue/func-call-spacing': ['error'],
		'vue/key-spacing': ['error'],
		'vue/keyword-spacing': ['error'],
		'vue/no-constant-condition': ['error', { checkLoops: false }],
		'vue/no-extra-parens': ['error'],
		"vue/no-irregular-whitespace": ["error", {
			skipStrings: true,
			skipComments: true,
			skipRegExps: true,
			skipTemplates: true,
			skipHTMLAttributeValues: true,
			skipHTMLTextContents: true
		}],
		'vue/no-sparse-arrays': ['error'],
		'vue/no-useless-concat': ['error'],
		'vue/object-curly-newline': ['error', {
			ObjectExpression: { multiline: true },
			ObjectPattern: { multiline: true },
			ImportDeclaration: { multiline: true },
			ExportDeclaration: { multiline: true }
		}],
		'vue/object-curly-spacing': ['error', 'always'],
		'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
		'vue/operator-linebreak': ['error', 'before', { overrides: { '+=': 'none', '-=': 'none', '*=': 'none' } }],
		'vue/space-infix-ops': ['error'],
		"vue/space-unary-ops": ['error', {
			words: true,
			nonwords: false
		}],
		'vue/template-curly-spacing': ['error', 'always']
	},
	overrides: [
		{
			files: ['*.vue'],
			rules: {
				indent: 'off'
			}
		}
	]
}

