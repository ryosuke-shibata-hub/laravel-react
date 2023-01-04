import React from "react";
import { Card, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import PostForm from "../components/PostForm";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
//const params = params.match.paramsの代用
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

function PostEdit(props) {
    // console.log(props.match);
    const classes = useStyles();
    //const params = params.match.paramsの代用
    const params = useParams();
    const [editData, setEditData] = useState({ name: '', content: '' });

    useEffect(() => {
        getEditData();
    }, [])

    function getEditData() {
        axios
            .post('/api/posts/edit', {
                id: params.id
            })
            .then(res => {
                setEditData(res.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    function updatePost() {
        //入力値が空だったら弾く
        if (editData == '') {
            return;
        }
        //入力値を投げる
        axios
            .post('/api/posts/update', {
                id: params.id,
                name: editData.name,
                content: editData.content
            })
            .then((res) => {
                setEditData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function inputChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        editData[key] = value;
        let data = Object.assign({}, editData);
        setEditData(data);
    }

    return (
        <div className="p-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <h1 className="text-center pt-5">タスク編集</h1>
                            <Card className={classes.card}>
                                <PostForm data={editData} inputChange={inputChange} btnFunc={updatePost} />
                            </Card>
                            <Button color="secondary" variant="contained" href="/" >戻る</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostEdit;
