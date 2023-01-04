import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MainTable from "../components/MainTable";
import PostForm from "../components/PostForm";

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
    //フォームの入力値を管理するステートの定義
    const [formData, setFormData] = useState({ name: '', content: '' });

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
    //入力がされたら(都度入力がされたら)入力値を変更するためのfunction
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }
    //タスクの登録処理
    const createPost = async () => {
        //入力がない場合(空の場合)は弾く
        if (formData == '') {
            return;
        }
        //入力値を渡す
        await axios
            .post('/api/posts/create', {
                name: formData.name,
                content: formData.content
            })
            .then((res) => {
                //戻り値をToDosセット
                const tempPosts = posts
                tempPosts.push(res.data);
                setPosts(tempPosts)
                setFormData('');
            })
            .catch(error => {
                console.log('保存処理失敗');
            })
    }
    //タスクの削除(完了)処理
    const deletePost = async (post) => {
        await axios
            .post('/api/posts/delete', {
                id: post.id
            })
            .then((res) => {
                this.setState({
                    posts: res.posts
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    //空配列として定義する
    let rows = [];
    //postsの要素ごとにrowsで使える形式に変換する
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button
                color="secondary"
                variant="contained"
                key={post.id}
                href={`/post/edit/${post.id}`}>編集
            </Button>,
            deleteBtn: <Button
                color="primary"
                variant="contained"
                href="/"
                onClick={() => deletePost(post)}>完了
            </Button>,
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
                                <PostForm data={formData} btnFunc={createPost} inputChange={inputChange} />
                            </Card>
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
