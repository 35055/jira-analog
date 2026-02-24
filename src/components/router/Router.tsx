import { Route, Routes, HashRouter } from "react-router-dom"
import { Category, Layout, Projects, Status } from "../page"


export const RouterComponent = () => {
    return <HashRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Projects />} />
                <Route path="/category" element={<Category />} />
                <Route path="/status" element={<Status />} />
            </Route>
        </Routes>
    </HashRouter>
}