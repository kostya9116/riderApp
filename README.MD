## Getting Started

**1. Setup**

*Install yarn*

```js
npm install -g yarn
```

*Install dependencies*

```js
yarn install
```
Note* native-base may require additional setup, please follow installation messages

*Link libraries*

```js
react-native link
```

*:heavy_exclamation_mark: In case of error after running ```react-native start``` command with such content:* 
' bundling failed: Error: While resolving module `react-native-vector-icons/FontAwesome`, the Haste package `react-native-vector-icons` was found. However the module `FontAwesome` could not be found within the package. Indeed, none of these files exist:'  
*please remove the following file and try again - \node_modules\react-native\local-cli\core\__fixtures__\files\package.json* 