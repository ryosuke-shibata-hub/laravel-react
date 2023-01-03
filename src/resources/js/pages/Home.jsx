// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Button, Card } from '@material-ui/core';

// function Home() {
//     return (
//         <div className="container">
//             <Card>
//                 <Button color="primary" variant="contained" href={`/example`}>Exampleに遷移</Button>
//             </Card>
//         </div>
//     );
// }

// export default Home;
import React from "react";
import { Button, Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
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
//リファクタリング後のrowsの中身
let rows = [
    {
        name: "モーリー",
        content: "肩トレ",
        editBtn: <Button color="secondary" variant="contained">編集</Button>,
        deleteBtn: <Button color="primary" variant="contained">完了</Button>,
    },
    {
        name: "ドンキーコングだお",
        content: "バナナ補給",
        editBtn: <Button color="secondary" variant="contained">編集</Button>,
        deleteBtn: <Button color="primary" variant="contained">完了</Button>,
    }
]
function Home() {
    //定義したスタイルを使用するための設定
    const classes = useStyles();

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
