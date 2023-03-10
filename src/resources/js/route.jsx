import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Routes,
    // Switch,
} from 'react-router-dom';
import Example from './pages/Example';
import Home from './pages/Home';
import Test from './pages/Test';
import PostEdit from "./pages/PostEdit";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/example' exact element={<Example />} />
                <Route path='/' exact element={<Home />} />
                <Route path='/post/edit/:id' exact element={<PostEdit />} />
                <Route path='test' exact element={<Test />} />
            </Routes>
        </div>
    );
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'))
