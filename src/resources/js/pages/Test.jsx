import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

function Test() {
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>テストページに遷移したお</div>
                        <div className='card-body'>遷移できた？</div>
                        <Button color="primary" variant="contained" href={`/example`}>Exampleに遷移</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;
