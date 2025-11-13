#!/bin/bash
# Quick TypeScript error fixes

# cli.ts - Fix error handling and process.env
sed -i '' 's/} catch (error) {/} catch (error: unknown) {/g' src/cli.ts
sed -i '' 's/error\.message/(error instanceof Error ? error.message : String(error))/g' src/cli.ts
sed -i '' 's/error\.stack/(error instanceof Error ? error.stack : "")/g' src/cli.ts
sed -i '' "s/process\.env\.AI_API_KEY/process.env['AI_API_KEY']/g" src/cli.ts
sed -i '' 's/(section, index)/(_section, index)/g' src/cli.ts
sed -i '' 's/const html =/const _html =/g' src/cli.ts
sed -i '' 's/onStart: () => spinner\.text =/onStart: () => { spinner.text =/g' src/cli.ts

# themes.ts - Fix THEME_DEFAULTS indexing
sed -i '' 's/THEME_DEFAULTS\[themeName\]/THEME_DEFAULTS[themeName as keyof typeof THEME_DEFAULTS]/g' src/lib/themes.ts
sed -i '' 's/THEME_DEFAULTS\[baseTheme\]/THEME_DEFAULTS[baseTheme as keyof typeof THEME_DEFAULTS]/g' src/lib/themes.ts
sed -i '' 's/const cursorEnabled =/const _cursorEnabled =/g' src/lib/themes.ts
sed -i '' 's/currentTheme: ThemeName/currentTheme!: ThemeName/g' src/lib/themes.ts
sed -i '' 's/import \* as fs from/\/\/ import \* as fs from/g' src/lib/themes.ts
sed -i '' 's/import \* as path from/\/\/ import \* as path from/g' src/lib/themes.ts
sed -i '' 's/error\.message/(error instanceof Error ? error.message : String(error))/g' src/lib/themes.ts

# utils.ts - Fix unused params and crypto
sed -i '' 's/(dirPath: string, preserveStructure/(dirPath: string, _preserveStructure/g' src/lib/utils.ts
sed -i '' 's/crypto\.randomBytes/crypto.webcrypto.getRandomValues(new Uint8Array(/g' src/lib/utils.ts

# validators.ts - Comment unused imports
sed -i '' 's/  ExportFormat,/  \/\/ ExportFormat,/g' src/lib/validators.ts
sed -i '' 's/  StreamMode,/  \/\/ StreamMode,/g' src/lib/validators.ts
sed -i '' 's/(apiKey: string, provider/(apiKey: string, _provider/g' src/lib/validators.ts

echo "✅ Automated fixes applied!"
