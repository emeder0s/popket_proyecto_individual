import React from 'react'
export const Rutas = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="*" element={<Error />} />
                <Route path="/" element={<Home />} /> */}
                <Route path="/loginn" element={<Login />} />
            </Routes>
        </div>
    )
}