import { Outlet } from "react-router-dom"

function AppLayout(){
return (

    <div style={{
        display: 'flex'
        }}>
        
        <Outlet />
        
    </div>
    
    )
}

export default AppLayout