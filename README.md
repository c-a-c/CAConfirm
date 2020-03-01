# CAconfirm
- C.A.C.用リポジトリ
  - [オリジナル](https://github.com/uewolf25/confirm_form)
- version: 2.0 (2020.01.21)

## 使用するもの
- Node.jsのインストールとnpmコマンド
- clasp
- TypeScript
- (任意の)ブラウザ
- Googleアンケートとそのスプレッドシート
- スプレッドシート(氏名一覧を載せた名簿)


## 用途
アンケートを答えたということを本人が忘れることがしばしばある。  
アンケート答える人が作成した人にわざわざ聞かれては面倒なことである。  
そのようなことを防止するためにも回答者が自分で確認できるシステムを作った。  
予めスプレッドシートに氏名を載せた名簿を用意しておき、答えたか否かを *色と記号を使い可視化すること* を目的としている。  
![img/pic1.png](img/pic1.png)  
上図のように灰色の四角(氏名は隠しています)に名前を載せ、アンケートの氏名等を判断材料とし、氏名と回答を結びつけてデザインするようにしています。  
なお、 **送信ボタンをトリガーにしているため、自動的に更新されます。** (誰かが送信した地点で更新がかかります。)

## 準備
### 環境変数
既にスクリプトがある場合は、`.clasp.json`ファイルが生成される必要がないため、scriptIDを控えておいてください。  
`.clasp-template.json`というテンプレートを用意しているので、そこにscriptIDを入力してrenameしてください。以下のコマンドを実行。もともとある場合は自身の`.clasp.json`を削除しても構いません。  
`mv .clasp-template.json .clasp.json`
### scriptIDの確認の仕方
GASのスクリプトページの、`「ファイル」 > 「プロジェクトのプロパティ」`のプロパティ欄にスクリプトIDが記載されていると思います。


## 開発環境
- Node version (node -v): 13.8.0
- npm version (npm -v): 6.14.1
- clasp version (clasp -v): 2.3.0
- OS (Mac/Linux/Windows): Mac


## 実行方法
```
npm build run
clasp push
clasp open
```

## 補足
GASのランタイムがV8に変わったことによって、使用しているツール([clasp](https://github.com/google/clasp))もアップデートされて今不安定で使用できまて〜ん！！！(2020.03.01)  
↑GASで使うjsでアロー関数とかが使えるようになった  
なので、今使用するのは[template.js](https://github.com/c-a-c/CAConfirm/blob/master/template.js)