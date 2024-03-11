
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contact from '../pages/Contact'

export default function RoutesApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    )
}