# GitHub Search App

## 概要

Githubのリポジトリ情報を検索するWebアプリケーションです。

<img src="resource/demo.gif" width="500">

## 使い方

[こちら](https://github-search-app-gamma.vercel.app/)のWebページからアクセスできます。

コンテナイメージをローカルマシンにpullして、セルフホストでも使用できます。

Dockerがインストールされている環境で以下のコマンドを入力してください。
```bash
docker run -it -p 3000:3000 ghcr.io/yamako-maxq/github-search-app:latest
```

このようなエラーが出る場合があります。
```
Error response from daemon: Head "https://ghcr.io/v2/yamako-maxq/github-search-app/manifests/latest": denied: denied
```

この場合は、お手数ですが以下のコマンドを入力してください（Dockerでghcrをログインしている場合、ログアウトされますのであらかじめご了承ください。）
[参考文献](https://qiita.com/aKuad/items/8885da126d829470f42b)
```bash
docker logout ghcr.io
```

こちらから確認してください。
http://localhost:3000/

## 機能
- GitHubのリポジトリ検索
  - リポジトリ一覧表示
  - ユーザアイコン
  - 詳細画面へのリンク
- リポジトリの詳細情報
  - ユーザ名
  - ユーザアイコン
  - 使用言語
  - Star数
  - Watcher数
  - Fork数
  - Issues数
- リンクからのページ表示
  - 例１：[searchと検索した結果の3ページ目](https://github-search-app-gamma.vercel.app/search/repositories?q=search&page=3)
  - 例２：[このリポジトリの詳細画面](https://github-search-app-gamma.vercel.app/repos/yamako-maxq/github-search-app)

## 技術スタック
- フレームワーク
  - Next.js `16.2.1`
- コンポーネントライブラリ
  - Mantine `8.3.18`
- URLパラメーター管理
  - nuqs `2.8.9`
- テスト
  - Jest `30.3.0`
  - testing-library/dom `10.4.1`
  - testing-library/jest-dom `6.9.1`
  - testing-library/react `16.3.2`
  - testing-library/user-event `14.6.1`

## AIの使用
以下のサービスを使用しました。
- GitHub Copilot
- Google Gemini

使用にあたって、アプリケーション全体の構築や０からのコード生成は行わずに、レビューやコード補完目的で使用しました。

### GitHub Copilot
#### 使用モデル
GitHubは無料プランで使用できる、GPT4-oを使用しました。

#### 使用用途
コード入力補完とレビューに使用しました。コンポーネントを一通り書き終えたら、チャット機能でエラーやコード品質のレビューを行ってもらいました。無料プランの枠内で使用していたため、４月４日に利用制限がかかってしまったので、これ以降はGeminiのチャット機能で質問をしました。
![alt text](resource/exceedLimit.png)

#### AIへの指示
copilot-instructions.mdというファイルを.githubフォルダに作成し、指示を記載しました

内容は以下の通りです。
```
# Copilot Instructions for GitHub Search App (Web)

## このドキュメントについて

- GitHub Copilotや各種 AI ツールが本リポジトリのコンテキストを理解しやすくするためのガイドです。
- 新しい機能を実装する際はここで示す技術選定・設計方針・モジュール構成を前提にしてください。
- 不確かな点がある場合は、リポジトリのファイルを探索し、ユーザーに「こういうことですか?」と確認をするようにしてください。

## 前提条件
- すべての回答には日本語で回答をお願いします。
- できるだけ具体的なコード例を提供してください。
- セキュリティやプライバシーに関する質問には、最新のベストプラクティスに基づいて回答してください。

## プルリクエストのルール
- あなたはプルリクエストのレビューを行うレビュアーです。
- 前提条件を守るとともに、以下のルールに従ってレビューを行ってください。
- コードの品質、スタイル、セキュリティ、パフォーマンス、アクセシビリティなどの観点からコードをレビューしてください。
- レビューする際には、以下のprefixを使用してください。
  - [コード品質] コードの品質に関するレビュー
  - [スタイル] コードのスタイルに関するレビュー
  - [セキュリティ] セキュリティに関するレビュー
  - [パフォーマンス] パフォーマンスに関するレビュー
  - [アクセシビリティ] アクセシビリティに関するレビュー
```
この指示をもとにコードレビューを行ってもらいました。
本来は、プルリクエストがopenの際にこの指示を元にレビューをしてもらう予定でしたが、利用制限のため断念しました。

![alt text](./resource/copilot-review.png)

### Gemini
### 使用モデル
無料版で使用できるGemini3.1、思考モード、高速モードを使用しました。

#### 使用用途
技術の選定の質問やビルドエラーの解決に使用しました。
