# ver1.0作成
学習サポートアプリを作成しました。  
主機能と課題、次回のバージョンについてを簡略に以下にまとめます。  

主機能
- ユーザーが設定した問題に対する解答結果が✕の場合かつ現在日時の差が1週間以上たっている場合に、一覧画面で対象の列が点滅する。

課題
- 更新内容に関して、コンポーネントからの受け渡しが理解不足のため要修正
- カレンダーのv-modelの処理
- 更新時に解答結果を登録しないように修正した場合の修正が上手くいっていない(バグ)
- sqlのupdate部分

次回のバージョンについて
- 上記の課題点の修正
- 新機能として、選択削除機能を追加
- 新機能として、csvファイルの読み込み機能を追加  

# 参考
以下、参考となります。

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
