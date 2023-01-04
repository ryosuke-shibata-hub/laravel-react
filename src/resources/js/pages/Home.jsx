import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MainTable from "../components/MainTable";

///スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}));

//ヘッダーコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

function Home() {
    //定義したスタイルを使用するための設定
    const classes = useStyles();

    //postsの状態を管理する
    const [posts, setPosts] = useState([]);

    //画面に到着したらgetPostsDataを呼ぶ
    useEffect(() => {
        getPostsData();
    }, [])

    //一覧情報を取得しステートpostsにセットする
    const getPostsData = () => {
        axios
            .get('/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }
    //空配列として定義する
    let rows = [];
    //postsの要素ごとにrowsで使える形式に変換する
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button color="secondary" variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    );


    return (
        <div className="p-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <h1 className="text-center pt-5">タスク管理</h1>
                            <Card className={classes.card}>
                                {/* テーブル部分の定義 */}
                                <MainTable headerList={headerList} rows={rows} />
                            </Card>
                            <Button color="primary" variant="contained" href={`/example`}>
                                Exampleに戻る
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
